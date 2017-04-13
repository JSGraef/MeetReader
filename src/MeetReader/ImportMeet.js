import React, { Component } from 'react';

import './MeetReader.css';
import U from './utils';
import {Redirect} from 'react-router-dom';

import { Layout, Breadcrumb, Alert } from 'antd';
const { Content } = Layout;

import DropzoneComponent from 'react-dropzone-component';
import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/min/dropzone.min.css';

class ImportMeet extends Component {
    constructor() {
        super();

        this.state = {
            message: false,
            type: '',
            text: ''
        }

        this.readFile = this.readFile.bind(this);
        this.parseFileContents = this.parseFileContents.bind(this);
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


    // For each line in the file, do something with the record
    // This is the heart of the app and controls everything on file read
    parseFileContents(lines) {
        let events = new Set();
        let bRelay = false;
        let teams = [];

        // Read file line by line and do something with it
        for(let line of lines) {
            let header = line.substring(0,2);

            switch(header){
                case 'A0': // File Description
                    U.parseA0(line); 
                    break;
                case 'B1': { // Meet Record
                    U.parseB1(line); 
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
                    if(swimmers[event.ussNum] === undefined)
                        swimmers[event.ussNum] = {swims:[]};
                    
                    swimmers[event.ussNum].swims.push(event);
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
        this.props.onImportMeet(eventlist, teams); // Send back to app.js as a store

        this.setState({message: true, type: 'success', text: 'File was read successfully'});
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
                        bContinue = true;
                        break;
                    }
                    }

                    if(bContinue) continue;

                    for(let s in team.swimmers) {
                        if( team.swimmers.hasOwnProperty(s)){
                            let swimmer = team.swimmers[s];

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

    render() {
        var componentConfig = {
          iconFiletypes: ['.cl2', '.sd3'],
          showFiletypeIcon: true,
          postUrl: 'no-url'
        };
        var djsConfig = { autoProcessQueue: false }
        var eventHandlers = { addedfile: (file) => this.onDragDrop(file)}

        if(this.state.message === true && this.state.type === 'success')
            return <Redirect to="/meet" />
        
        return (
            <Layout style={{ padding: '0 24px 24px', height: '100%' }}>

                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Import</Breadcrumb.Item>
                </Breadcrumb>

                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280, height: '100%' }}>
                    <h1>Read Any Meet Result</h1>
                    <h3>Import any .sd3 or .cl2 meet file to see a list of swimmers and their times, splits, improvements, and points scored.</h3>
                    <br />
                    <DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} djsConfig={djsConfig} />

                    { this.state.message ? <Alert message={this.state.text} type={this.state.type} /> : ''}
                </Content>

            </Layout>
        );
    }
}

export default ImportMeet;
