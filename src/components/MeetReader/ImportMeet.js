import React, { Component } from 'react';

import U from './utils';

import { notification, Button, Steps } from 'antd';

import WrappedImportNotesForm from './Forms/ImportNotesForm';

import DropzoneComponent from 'react-dropzone-component';
import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/min/dropzone.min.css';

// Firebase 
import {db} from '../../config/constants';
import Rebase  from 're-base';
var base = Rebase.createClass(db, 'TeamCaptain');



class ImportMeet extends Component {
    constructor() {
        super();

        this.state = {
            message: false,
            type: '',
            text: '',
            meet: {},
            notes: {},
            currentStep: 0
        }

        this.readFile = this.readFile.bind(this);
        this.parseFileContents = this.parseFileContents.bind(this);
        this.addMeetToDB = this.addMeetToDB.bind(this);
        this.saveNotes = this.saveNotes.bind(this);
    }


    // When 'submit' is pressed, clear state and read the file
    onDragDrop(file) {
        if(file === 'undefined') 
        return;

       // this.initialize();

        const fileName = file.name;
        var ext = fileName.substr(fileName.lastIndexOf('.') + 1);

        // First line of defense against reading files we don't want
        if(ext === 'sd3' || ext === 'cl2')
            this.readFile(file);
        else
            this.setState({message: true, type: 'error', text: 'File extension needs to be .CL2 or .SD3'});
    }

    // Reads the file in individual lines and saves the state
    readFile(file) {
        const fr = new FileReader();
        fr.onloadend = (e)=> {
            let contents = e.target.result;
            let lines = contents.split(/\r\n|\r|\n/);

            // Another line of defense against corrupt files
            if(lines.length < 2)
                return;

            this.parseFileContents(lines);
        };

        fr.readAsText(file);
    }

    addMeetToDB() {
        if(this.state.meet === undefined) 
            return;

        // TODO get team code/unique ID

        const meetID = btoa(this.state.meet.info.meetName);
        let bAlreadyUploaded = false;

        const openNotification = (id, message) => {
            const key = `open${Date.now()}`;
            const btnClick = function (id) {
                // to hide notification box
                notification.close(key);
                // TODO redirect to meet id --
                // maybe set the state here of the meet ID and then use the redicrect in render
                // router.transitionTo(`meet/${id}`);
            };
            const btn = (
                <Button type="primary" size="small" onClick={btnClick(id)}>
                    See meet results!
                </Button>
            );
            notification['success']({
                message: 'Success!',
                description: message,
                btn,
                key,
                //onClose: close,
            });
        };

        // Get all the meets to check for duplicate
        //let list = {};
        base.fetch('MRVAC/meets/meetlist', {
            context: this,
            then(data) {
                let list = data;
                const keys = Object.keys(list);
                for(let meet of keys) {
                    if(meet === meetID) {
                        console.log("match!", meetID);
                        bAlreadyUploaded = true;
                        break;
                    }
                }

                if(!bAlreadyUploaded) {
                    // Since we don't have a duplicate, create a new entry
                    list[meetID] = this.state.meet.info;

                    // Add new meet id to the list of meets we have
                    // So when we search the DB, we just pull the meet and info instead of everything
                    base.post('MRVAC/meets/meetlist', {
                        data: list,
                        then(err) {
                            if(!err) {
                               // console.log("added to meet list");
                            }
                            else
                                console.log(err);
                    }});    

                    const path = `MRVAC/meets/${meetID}`;
                    // Add meet to the database
                    base.post(path, {
                        data: this.state.meet,
                        then(err) {
                            if(!err)
                                openNotification(meetID, 'Meet was saved successfully!'); // why does this happen so LATE???
                        }
                    });
                }
            }
        });
    }

    // For each line in the file, do something with the record
    // This is the heart of the app and controls everything on file read
    parseFileContents(lines) {
        let events = new Set();
        let bRelay = false;
        let teams = [];
        let info = {};

        // Read file line by line and do something with it
        for(let line of lines) {
            let header = line.substring(0,2);

            switch(header){
                case 'A0': // File Description
                    U.parseA0(line); 
                    break;
                case 'B1': { // Meet Record
                    info = U.parseB1(line); 
                    info['meetNameOriginal'] = info.meetName;
                    break;
                }
                case 'B2': // Meet Host Record
                    U.parseB2(line); 
                    break;
                case 'C1': { // Team Record
                    const teamRecord = U.parseC1(line); 
                    teams.push(teamRecord);
                    break;
                }
                case 'C2':  // Team Entry Record
                    U.parseC2(line); 
                    break;
                case 'D0': { // Individual Event Record
                    bRelay = false;
                    const event = U.parseD0(line);
                    let swimmers = teams[teams.length -1].swimmers;

                    // If we don't have a record for that swimmer yet, add one with an empty swims set
                    const ussNum =  (event.ussNum !== "") ? event.ussNum : "invalid";
                    if(swimmers[ussNum] === undefined)
                        swimmers[ussNum] = {swims:[]};
                    
                    swimmers[ussNum].swims.push(event);
                    events.add(event.eventNum);

                    teams[teams.length -1].swimmers = swimmers;
                    break;
                }
                case 'D1': // Individual Administrative Record
                    U.parseD1(line); 
                    break;
                case 'D2': // Individual Contact Record
                    U.parseD2(line); 
                    break;
                case 'D3': { // Individual Information record
                    bRelay = false;
                    const swimmer = U.parseD3(line);
                    let swimmers = teams[teams.length -1].swimmers;
                    let modUssNum = swimmer.ussNum.substring(12,0);
                    if( modUssNum === "")
                        modUssNum = "invalid";

                    let currentSwims = swimmers[modUssNum].swims;

                    // Combine new with old
                    swimmers[modUssNum] = swimmer;
                    swimmers[modUssNum].swims = currentSwims;

                    // Update team with swimmer
                    teams[teams.length -1].swimmers = swimmers;
                    
                    break;
                }
                case 'E0': { // Relay Event Record
                    bRelay = true;
                    const relayTeam = U.parseE0(line);
                    let relays = teams[teams.length -1].relays;
                    
                    relays.push(relayTeam);
                    events.add(relayTeam.eventNum);
                    
                    teams[teams.length -1].relays = relays;
                    break;
                }
                case 'F0': { // Relay Swimmer Name Record
                    bRelay = true;
                    const relaySwimmer = U.parseF0(line);
                    let relays = teams[teams.length -1].relays;

                    // Add swimmer to relay
                    relays[relays.length-1].swimmers.push(relaySwimmer);

                    // Add relay to team
                    teams[teams.length -1].relays = relays;
                
                    break;
                }
                case 'G0': { // Splits Record
                    const splitRec = U.parseG0(line); 
                    let swimmer = teams[teams.length -1].swimmers[splitRec.ussNum];

                    // Swimmer was never entered in, just skip it for now
                    // TODO - need to handle this, but shouldn't ever happen
                    if(swimmer === undefined) 
                        break;
                    
                    // If it's a relay, need to make sure to add the split record to the relay
                    // instead of the swimmer
                    if(bRelay) {
                        let relays = teams[teams.length -1].relays;
                        const numswimmers = relays[relays.length-1].swimmers.length;
                        relays[relays.length-1].swimmers[numswimmers-1].split.push(splitRec);
                        teams[teams.length -1].relays = relays;      
                        break;
                    }
                    
                    // Because all a swimmer's G0 records directly follows their D3, we
                    // can properly assume that the last entered swimmer is the correct one
                    swimmer.swims[ swimmer.swims.length -1 ].splits.push(splitRec);

                    // Update team with newly built swimmer
                    teams[teams.length -1].swimmers[splitRec.ussNum] = swimmer;
                    
                    break;
                }
                case 'J0': // Meet Qual Times
                    U.parseJ0(line); 
                    break;
                case 'J1': // National Age Group Times
                    U.parseJ1(line); 
                    break;
                case 'J2': // USS Motivational Times
                    U.parseJ2(line); 
                    break;
                case 'Z0': // USS Motivational Times
                    U.parseJ0(line); 
                    break;
                default: 
                    this.setState({message: true, type: 'error', text: 'File could not be read. Might be corrupt!'});
                    break;
            }
        }

        const eventlist = this.getEvents(Array.from(events), teams);

        // TODO No longer necessary
        this.props.onImportMeet(eventlist, teams); // Send back to app.js as a store

        info['tags'] = '';
        info['notes'] = ''; 

        const meet = {info: info, events: eventlist, teams: teams};
        this.setState({meet: meet});

        this.nextStep();
        //this.setState({message: true, type: 'success', text: 'File was read successfully'});
    }

    // Puts swimmers in every event they swam
    getEvents(eventNums, teams) {
            let events = [[]];

            // for each event, go through teams -> swimmers and pull out who swam what.
            // A number of ways to make this faster:
            // -- Check event age and compare to swimmer age

            for(let eventNum of eventNums) {
                events[eventNum] = [];
                let bContinue = false;
                for(let team of teams) {

                    // Try relays first since it's short and we can skip the rest if not needed
                    for( let r of team.relays ) {
                        if(r.eventNum === eventNum) {
                            events[eventNum].push(r);
                            bContinue = true; // Found it, so don't look through anything else
                            break;
                        }
                    }

                    if(bContinue) continue;

                    // Check all swimmers of the team
                    for(let s in team.swimmers) {
                        if( team.swimmers.hasOwnProperty(s)){
                            let swimmer = team.swimmers[s];

                            // Check to see if the swimmer swam that event
                            for(let swim of swimmer.swims) {
                                if(swim.eventNum === eventNum) 
                                    events[eventNum].push(swim);
                            }
                        }
                    }
                }

                if(teams.length === 0 )
                    return [];
            }

            return events;
    }

    nextStep() {
        const current = this.state.currentStep + 1;
        this.setState({currentStep: current});
    }

    prevStep() {
        const current = this.state.currentStep - 1;
        this.setState({currentStep: current});
    }

    renderMeetImport() {
        var componentConfig = {
          iconFiletypes: ['.cl2', '.sd3'],
          showFiletypeIcon: true,
          postUrl: 'no-url'
        };
        var djsConfig = { autoProcessQueue: false }
        var eventHandlers = { addedfile: (file) => this.onDragDrop(file)}
        
        return (
            <div>
                <h1>Read Any Meet Result</h1>
                <h3>Import any .sd3 or .cl2 meet file to see a list of swimmers and their times, splits, improvements, and points scored.</h3>
                <br />
                <DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} djsConfig={djsConfig} />
            </div>
    )}

    renderReviewMeetInfo() {
        return (
            <div>
                <h1>Review Meet</h1>
                <h2>{this.state.meet.info.meetName}</h2>
                <p>Date: {this.state.meet.info.meetStart} - {this.state.meet.info.meetEnd}</p>
                <p>Notes: {this.state.meet.info.notes}</p>
                <p>Tags: {this.state.meet.info.tags}</p>
                <p>Events: {this.state.meet.events.length}</p>
            </div>
        )
    }

    // Save the info/notes from ImportNotesForm
    saveNotes(notes) {
        let meet = this.state.meet;
        let info = meet.info;
        info.meetName = notes.meetName || info.meetName;
        info.tags = notes.meetTags;
        info.notes = notes.meetNotes;
        info.meetStart = notes.meetStart;
        info.meetEnd = notes.meetEnd;

        meet.info = info;
        this.setState({meet});
    }

    render() {
        // if(this.state.message === true && this.state.type === 'success')
        //     return <Redirect to="/meet" />
        
        return (
            <div>
                <Steps current={this.state.currentStep}>
                    <Steps.Step title="Import" description="Import a meet results." />
                    <Steps.Step title="Meet Details" description="Enter in meet details." />
                    <Steps.Step title="Review / Finish" description="Always double-check!" />
                </Steps>

                {
                    this.state.currentStep === 0 &&
                    <div>
                        {this.renderMeetImport()}
                    </div>
                }
                {
                    this.state.currentStep === 1 &&
                    <div>
                        <WrappedImportNotesForm saveNotes={this.saveNotes} meetinfo={this.state.meet.info} /><br />
                        <Button type="primary" onClick={() => this.nextStep()}>Review</Button> <Button onClick={() => this.prevStep()}>Import Different Meet</Button>
                    </div>
                }
                {
                    this.state.currentStep === 2 &&
                    <div>
                        {this.renderReviewMeetInfo()}<br />
                        <Button type="primary" onClick={()=>this.addMeetToDB()}>Save Meet!</Button> <Button onClick={() => this.prevStep()}>Fix Meet Info</Button>
                    </div>
                }

            </div>
        );
    }
}

export default ImportMeet;



// TODO antd upload stuff
// Need to figure out how to not use action param and just read the file

// const fileName = file.name;
// var ext = fileName.substr(fileName.lastIndexOf('.') + 1);

// // First line of defense against reading files we don't want
// if(ext === 'sd3' || ext === 'cl2')
//     this.readFile(file);
// else
//     this.setState({message: true, type: 'error', text: 'File extension needs to be .CL2 or .SD3'});




// const props = {
//     name: 'file',
//     multiple: true,
//     showUploadList: true,
//     action: '/',
//     customRequest(file) {
//         this.onDragDrop(file);
//     },
//     beforeUpload(file) {
//         const ext = file.name.substr(file.name.lastIndexOf('.')+1);
//         if(ext === 'sd3' || ext === 'cl2') 
//             return true;

//         message.error(`${file.name} upload failed. Must have CL2 or SD3 file extension.`);
//         return false;
//     },
//     onChange(info) {
//         const status = info.file.status;
//         if (status !== 'uploading') {
//             console.log(info.file, info.fileList);
//         }
//         if (status === 'done') {
//             message.success(`${info.file.name} file uploaded successfully.`);
//             this.readFile(info.file.name);

//         } else if (status === 'error') {
//             message.error(`${info.file.name} file upload failed.`);
//         }
//     },
// };

// <Upload.Dragger {...props}>
//     <p className="ant-upload-drag-icon">
//         <Icon type="inbox" />
//     </p>
//     <p className="ant-upload-text">Click or drag file to this area to upload</p>
//     <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
// </Upload.Dragger>


                