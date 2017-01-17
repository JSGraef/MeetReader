import React, { Component } from 'react';
import './App.css';
import Team from './Team';
import TeamList from './TeamList';

class App extends Component {
  constructor() {
    super();
    injectTapEventPlugin();

    this.state = {
      lines: [],
      meet: {},
      meetInfo: {},
      teams: []
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.readFile = this.readFile.bind(this);
    this.parseFileContents = this.parseFileContents.bind(this);
    this.initialize = this.initialize.bind(this);

    this.parseA0 = this.parseA0.bind(this);
    this.parseB1 = this.parseB1.bind(this);
    this.parseB2 = this.parseB2.bind(this);
    this.parseC1 = this.parseC1.bind(this);
    this.parseC2 = this.parseC2.bind(this);
    this.parseD0 = this.parseD0.bind(this);
    this.parseD1 = this.parseD1.bind(this);
    this.parseD2 = this.parseD2.bind(this);
    this.parseD3 = this.parseD3.bind(this);
    this.parseE0 = this.parseE0.bind(this);
    this.parseF0 = this.parseF0.bind(this);
    this.parseG0 = this.parseG0.bind(this);
    this.parseJ0 = this.parseJ0.bind(this);
    this.parseJ1 = this.parseJ1.bind(this);
    this.parseJ2 = this.parseJ2.bind(this);
    this.parseZ0 = this.parseZ0.bind(this);
  }

 // If a new file is read, get rid of 100% of the old stuff
  initialize() {
    this.setState({
      lines: [],
      meet: {},
      meetInfo: {},
      teams: []
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    const file = this.refs.file.files[0];
    if(file === 'undefined') 
      return;
    
    this.initialize();

    this.readFile(file);
    this.setState({filename: file.name});
  }

  readFile(file) {
    const fr = new FileReader();
    fr.onloadend = (e)=> {
      let contents = e.target.result;
      this.setState({filetext: contents});
      let lines = contents.split(/\r\n|\r|\n/);
      this.setState({lines: lines});
    };
    fr.readAsText(file);
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.lines !== prevState.lines)
      this.parseFileContents();
  }

  parseFileContents() {
    const lines = this.state.lines;

    // Read file line by line and do something with it
    for(let line of lines) {
      let header = line.substring(0,2);

      switch(header){
        case 'A0': 
          this.parseA0(line); 
          break;
        case 'B1': 
          this.parseB1(line); 
          break;
        case 'B2': 
          this.parseB2(line); 
          break;
        case 'C1': 
          this.parseC1(line); 
          break;
        case 'C2': 
          this.parseC2(line); 
          break;
        case 'D0': 
          this.parseD0(line); 
          break;
        case 'D1': 
          this.parseD1(line); 
          break;
        case 'D2': 
          this.parseD2(line); 
          break;
        case 'D3': 
          this.parseD3(line); 
          break;
        case 'E0': 
          this.parseE0(line); 
          break;
        case 'F0': 
          this.parseF0(line); 
          break;
        case 'G0': 
          this.parseG0(line); 
          break;
        case 'J0': 
          this.parseJ0(line); 
          break;
        case 'J1': 
          this.parseJ1(line); 
          break;
        case 'J2': 
          this.parseJ2(line); 
          break;
        case 'Z0': 
          this.parseJ0(line); 
          break;
        default: break;
      }
    }
  }

  //-------------------------------------------

  // A0 -- file description record (type of data)
  parseA0(line) {
    // // const header        = line.substring(0,2);
    // // const orgCode       = line.substring(2,3);
    // const sdifVers      = line.substring(3,11);
    // const fileCode      = line.substring(11,13);
    // const software      = line.substring(43,63);
    // const softVers      = line.substring(63,73);
    // const contactName   = line.substring(73,93);
    // const contactPhone  = line.substring(93,105);
    // const fileCreation  = line.substring(105,113);
    // const submittedBy   = line.substring(155,157);

    // const meetInfo = {
    //   sdifVers,
    //   fileCode,
    //   software,
    //   softVers,
    //   contactName,
    //   contactPhone,
    //   fileCreation,
    //   submittedBy
    // }

    // this.setState({meetInfo: meetInfo});
  }

  // B1 -- Meet record (meet name/address)
  parseB1(line) {
    // const header        = line.substring(0,2).trim();
    // const orgCode       = line.substring(2,3).trim();
    const meetName      = line.substring(11,41).trim();
    const meetAddressL1 = line.substring(41,63).trim();
    const meetAddressL2 = line.substring(63,85).trim();
    const meetCity      = line.substring(85,105).trim();
    const meetState     = line.substring(105,107).trim();
    const postalCode    = line.substring(107,117).trim();
    const countryCode   = line.substring(117,120).trim();
    const meetCode      = line.substring(120, 121).trim();
    const meetStart     = line.substring(121,129).trim();
    const meetEnd       = line.substring(129,137).trim();
    const altitude      = line.substring(137,141).trim();
    const courseCode    = line.substring(149,150).trim();

    const meetInfo = {
      meetName, meetAddressL1, meetAddressL2, meetCity, meetState, postalCode, countryCode, meetCode, meetStart, meetEnd, altitude, courseCode,
    }

    this.setState({meetInfo: meetInfo});
  }

  // B2 -- Meet host record (ID Meet hosts)
  parseB2(line) {
    // const header        = line.substring(0,2).trim();
    // const orgCode       = line.substring(2,3).trim();
    // const meetHostName  = line.substring(11,41).trim();
    // const meetAddressL1 = line.substring(41,63).trim();
    // const meetAddressL2 = line.substring(63,85).trim();
    // const meetCity      = line.substring(85,105).trim();
    // const meetState     = line.substring(105,107).trim();
    // const postalCode    = line.substring(107,117).trim();
    // const countryCode   = line.substring(117,120).trim();
    // const hostPhone     = line.substring(120, 132).trim();
  }

  // C1 -- Team ID record (ID team and address)
  parseC1(line) {
    // const header        = line.substring(0,2).trim();
    // const orgCode       = line.substring(2,3).trim();
    const teamCode      = line.substring(11,17).trim();
    const teamName      = line.substring(17,47).trim();
    const abbrTeamName  = line.substring(47,63).trim();
    const teamAddressL1 = line.substring(63,85).trim();
    const teamAddressL2 = line.substring(85,107).trim();
    const teamCity      = line.substring(107,127).trim();
    const teamState     = line.substring(127,129).trim();
    const teamZip       = line.substring(129,139).trim();
    const countryCode   = line.substring(139,142).trim();
    const regionCode    = line.substring(142,143).trim();
    const optTeamCode   = line.substring(149,150).trim();

    const teamRecord = {
      teamCode, teamName, abbrTeamName, teamAddressL1, teamAddressL2, teamCity, teamState, teamZip, countryCode, regionCode, optTeamCode,
      swimmers: {}
    }

    let teams = this.state.teams;
    teams.push(teamRecord);
    this.setState({teams: teams});
  }

  // C2 -- Team Entry Record (coach and # of entries)
  parseC2(line) {
    // const header        = line.substring(0,2).trim();
    // const orgCode       = line.substring(2,3).trim();
    // const teamCode      = line.substring(11,17).trim();
    // const coachName     = line.substring(17,47).trim();
    // const coachPhone    = line.substring(47,59).trim();
    // const numEntriesInd = line.substring(59,65).trim();
    // const numAthletes   = line.substring(65,71).trim();
    // const numEntriesRelE0 = line.substring(71,76).trim();
    // const numEntriesRelF0 = line.substring(76,82).trim();
    // const numSplitRecs  = line.substring(82,88).trim();
    // const teamNameShort = line.substring(88,104).trim();
    // const optTeamCode   = line.substring(149,150).trim();

    // const teamEntryRecord = {
    //   teamCode, coachName, coachPhone, numEntriesInd, numAthletes, numEntriesRelE0, numEntriesRelF0, numSplitRecs, teamNameShort, optTeamCode
    // }

  }

  // D0 -- Individual event record (ID athlete by name, #, etc)
  parseD0(line) {
    // const header        = line.substring(0,2).trim();
    // const orgCode       = line.substring(2,3).trim();
    const swimmerName   = line.substring(11,39).trim();
    const ussNum        = line.substring(39,51).trim();
    const attachCode    = line.substring(51,52).trim();
    const citizenCode   = line.substring(52,55).trim();
    const birthDate     = line.substring(55,63).trim();
    const swimmerAge    = line.substring(63,65).trim();
    const sexCode       = line.substring(65,66).trim();
    const eventSex      = line.substring(66,67).trim();
    const eventDist     = line.substring(67,71).trim();
    const strokeCode    = line.substring(71,73).trim();
    const eventNum      = line.substring(73,76).trim();
    const eventAgeCode  = line.substring(76,80).trim();
    const dateOfSwim    = line.substring(80,88).trim();
    const seedTime      = line.substring(88,96).trim();
    const courseCode    = line.substring(86,97).trim();
    const prelimTime    = line.substring(97,105).trim();
    const courseCode2   = line.substring(105,106).trim();
    const swimoffTime   = line.substring(106,114).trim();
    const courseCode3   = line.substring(114,115).trim();
    const finalsTime    = line.substring(115,124).trim();
    const prelimHeatNum = line.substring(124,126).trim();
    const prelimLaneNum = line.substring(126,128).trim();
    const finalsHeatNum = line.substring(128,130).trim();
    const finalsLaneNum = line.substring(130,132).trim();
    const prelimPlace   = line.substring(132,135).trim();
    const finalsPlace   = line.substring(135,138).trim();
    const pointsScored  = line.substring(138,142).trim();
    const eventTimeClass = line.substring(142,144).trim();
    const flightStatus   = line.substring(144,145).trim();

    const event = {
      swimmerName, ussNum, attachCode, citizenCode, birthDate, swimmerAge, sexCode,eventSex, eventDist, 
      strokeCode, eventNum, eventAgeCode, dateOfSwim, seedTime, courseCode, prelimTime, courseCode2, swimoffTime, 
      courseCode3, finalsTime, prelimHeatNum, prelimLaneNum, finalsHeatNum, finalsLaneNum, prelimPlace, finalsPlace, pointsScored, 
      eventTimeClass, flightStatus, 
      splits: []   
    }

    let teams = this.state.teams;
    let swimmers = teams[teams.length -1].swimmers;

    if(swimmers[ussNum] === undefined)
      swimmers[ussNum] = {swims:[]};
      
    swimmers[ussNum].swims.push(event);

    teams[teams.length -1].swimmers = swimmers;
    this.setState({teams: teams});
  }

  // D1 -- Individual administrative record (ID athlete by name, reg#, birthdate & Gender)
  parseD1(line) {
    // const header        = line.substring(0,2).trim();
    // const orgCode       = line.substring(2,3).trim();
    // const teamCode      = line.substring(11,17).trim();
    // const optTeamCode   = line.substring(17,18).trim();
    // const swimmerName   = line.substring(18,46).trim();
    // const ussNum        = line.substring(47,59).trim();
    // const attachCode    = line.substring(59,60).trim();
    // const citizenCode   = line.substring(60,63).trim();
    // const birthDate     = line.substring(63,71).trim();
    // const swimmerAge    = line.substring(71,73).trim();
    // const sexCode       = line.substring(73,74).trim();
    // const adminInfo1    = line.substring(74,104).trim();
    // const adminInfo4    = line.substring(104,124).trim();
    // const phoneNum1     = line.substring(124,136).trim();
    // const phoneNum2     = line.substring(136,148).trim();
    // const ussRegDate    = line.substring(148,156).trim();
    // const memberCode    = line.substring(156,157).trim();

    // const indAdminRecord = {
    //   teamCode, optTeamCode, swimmerName, ussNum, attachCode, citizenCode, birthDate, swimmerAge,sexCode, 
    //   adminInfo1, adminInfo4, phoneNum1, phoneNum2, ussRegDate, memberCode
    // }
  }

  // D2 -- Individual contact record
  parseD2(line) {
    // const header        = line.substring(0,2).trim();
    // const orgCode       = line.substring(2,3).trim();
    // const teamCode      = line.substring(11,17).trim();
    // const optTeamCode   = line.substring(17,18).trim();
    // const swimmerName   = line.substring(18,46).trim();
    // const altMailingName = line.substring(46,76).trim();
    // const mailAddr      = line.substring(76,106).trim();
    // const mailCity      = line.substring(106,126).trim();
    // const mailState     = line.substring(126,128).trim();
    // const mailCountry   = line.substring(128,140).trim();
    // const zipCode       = line.substring(140,150).trim();
    // const countryCode   = line.substring(150,153).trim();
    // const regionCode    = line.substring(153,154).trim();
    // const answerCode    = line.substring(154,155).trim(); // swimmer also member of another FINA federation?
    // const seasonCode    = line.substring(155,156).trim();

    // const indContactRecord = {
    //   teamCode, optTeamCode, swimmerName, altMailingName, mailAddr, mailCity,  mailState, mailCountry, zipCode, countryCode, regionCode, answerCode, seasonCode
    // }
  }

  // D3 -- Individual Information Record (additional info not included in pre v3 SDI formats)
  parseD3(line) {
    //const header        = line.substring(0,2).trim();
    const ussNum        = line.substring(2,16).trim();
    const firstName     = line.substring(16,31).trim();
    const ethnicity     = line.substring(31,33).trim();
    const isJuniorHigh  = line.substring(33,34).trim();
    const isSeniorHigh  = line.substring(34,35).trim();
    const isYMCA        = line.substring(35,36).trim();
    const isCollege     = line.substring(36,37).trim();
    const isSummerSwimLeague = line.substring(37,38).trim();
    const isMasters     = line.substring(38,39).trim();
    const isDisabledSportsOrg = line.substring(39,40).trim();
    const isWaterPolo   = line.substring(40,41).trim();
    const isNone        = line.substring(41,42).trim();
    const answerCode    = line.substring(154,155).trim(); // swimmer also member of another FINA federation?
    const seasonCode    = line.substring(155,156).trim();

    const swimmer = {
      ussNum, firstName, ethnicity, isJuniorHigh, isSeniorHigh, isYMCA, isCollege, isSummerSwimLeague, 
      isMasters, isDisabledSportsOrg, isWaterPolo, isNone, answerCode, seasonCode,
      swims: [] // all the swims this swimmer has
    }

    let teams = this.state.teams;
    let swimmers = teams[teams.length -1].swimmers;
    let modUssNum = ussNum.substring(12,0);
    let currentSwims = swimmers[modUssNum].swims;

    // Combine new with old
    swimmers[modUssNum] = swimmer;
    swimmers[modUssNum].swims = currentSwims;

    // Update team with swimmer
    teams[teams.length -1].swimmers = swimmers;
    this.setState({teams: teams});
  }

  // E0 -- Relay Evet Record (ID relay team by name, code, gender)
  parseE0(line) {
    // const header        = line.substring(0,2).trim();
    // const orgCode       = line.substring(2,3).trim();
    // const relTeamName   = line.substring(11,12).trim();
    // const teamCode      = line.substring(12,18).trim();
    // const numF0Records  = line.substring(18,20).trim();
    // const eventSexCode  = line.substring(20,21).trim();
    // const relayDistance = line.substring(21,25).trim();
    // const strokeCode    = line.substring(25,26).trim();
    // const eventNumber   = line.substring(26,30).trim();
    // const eventAgeCode  = line.substring(31,34).trim();
    // const totalAge      = line.substring(34,37).trim();
    // const swimDate      = line.substring(37,45).trim();
    // const seedTime      = line.substring(45,53).trim();
    // const courseCode1   = line.substring(53,54).trim();
    // const prelimTime    = line.substring(54,62).trim();
    // const courseCode2   = line.substring(62,63).trim();
    // const swimoffTime   = line.substring(63,71).trim();
    // const courseCode3   = line.substring(71,72).trim();
    // const finalsTime    = line.substring(72,80).trim();
    // const courseCode4   = line.substring(80,81).trim();
    // const prelimHeatNum = line.substring(81,83).trim();
    // const prelimLaneNum = line.substring(83,85).trim();
    // const finalsHeatNum = line.substring(85,87).trim();
    // const finalsLaneNum = line.substring(87,89).trim();
    // const prelimPlace   = line.substring(89,92).trim();
    // const finalsPlace   = line.substring(92,95).trim();
    // const pointsScored  = line.substring(95,99).trim();
    // const eventTimeClass = line.substring(99,102).trim();
  }

  // F0 -- Relay Name Record (ID athletes on team)
  parseF0(line) {
    // const header        = line.substring(0,2).trim();
    // const orgCode       = line.substring(2,3).trim();
    // const teamCode      = line.substring(15,21).trim();
    // const teamName      = line.substring(21,22).trim();
    // const swimmerName   = line.substring(22,50).trim();
    // const ussNum        = line.substring(50,62).trim();
    // const citizenCode   = line.substring(62,65).trim();
    // const birthdate     = line.substring(65,73).trim();
    // const swimmerAge    = line.substring(73,75).trim();
    // const sexCode       = line.substring(75,76).trim();
    // const prelimOrderCode = line.substring(76,77).trim();
    // const swimoffOderCode = line.substring(77,78).trim();
    // const finalsOrderCode = line.substring(78,79).trim();
    // const legTime       = line.substring(79,87).trim();
    // const courseCode    = line.substring(87,88).trim();
    // const takeoffTime   = line.substring(88,92).trim();
    // const ussNumNew     = line.substring(92,106).trim();
    // const prefFirstName = line.substring(106,121).trim();
  }

  // G0 -- Splits Record
  parseG0(line) {
    // const header        = line.substring(0,2).trim();
    // const orgCode       = line.substring(2,3).trim();
    const swimmerName   = line.substring(15,43).trim();
    const ussNum        = line.substring(43,55).trim();
    const sequenceNum   = line.substring(55,56).trim();
    const totalSplits   = line.substring(56,58).trim();
    const splitDistance = line.substring(58,62).trim();
    const splitCode     = line.substring(62,63).trim();
    const splitTime1    = line.substring(63,71).trim();
    const splitTime2    = line.substring(71,79).trim();
    const splitTime3    = line.substring(79,87).trim();
    const splitTime4    = line.substring(87,95).trim();
    const splitTime5    = line.substring(95,103).trim();
    const splitTime6    = line.substring(103,111).trim();
    const splitTime7    = line.substring(111,119).trim();
    const splitTime8    = line.substring(119,127).trim();
    const splitTime9    = line.substring(127,135).trim();
    const splitTime10   = line.substring(135,143).trim();
    const prelimFinalCode = line.substring(143,144).trim();

    const splitRec = {
      swimmerName, ussNum, sequenceNum, totalSplits, splitDistance, splitCode , splitTime1, splitTime2, splitTime3, 
      splitTime4, splitTime5, splitTime6, splitTime7, splitTime8, splitTime9, splitTime10, prelimFinalCode
    }

    let teams = this.state.teams;
    let swimmer = teams[teams.length -1].swimmers[ussNum];

    // Swimmer was never entered in, just skip it for now
    // TODO - need to handle this
    if(swimmer === undefined) {
      return;
    }
    swimmer.swims[ swimmer.swims.length -1 ].splits.push(splitRec);

    // Update team with swimmer
    teams[teams.length -1].swimmers[ussNum] = swimmer;
    this.setState({teams: teams});
  }

  // J0 -- Meet Qual times (ID qualifying times for a meet)
  parseJ0(line) {
    // const header        = line.substring(0,2).trim();
    // const effectiveDate = line.substring(2,10).trim();
    // const meetCode      = line.substring(10,11).trim();
    // const eventSex      = line.substring(16,17).trim();
    // const eventDist     = line.substring(17,21).trim();
    // const strokeCode    = line.substring(21,22).trim();
    // const timeSCY       = line.substring(22,30).trim();
    // const timeSCM       = line.substring(30,38).trim();
    // const timeLCM       = line.substring(38,46).trim();
    // const eventAge      = line.substring(46,50).trim();
    // const zoneCode      = line.substring(50,51).trim();
    // const regionCode    = line.substring(51,53).trim();
    // const lscCode       = line.substring(53,55).trim();
  }

  // J1 -- National Age Group Times(ID qualifying times for a meet)
  parseJ1(line) {
    // const header        = line.substring(0,2).trim();
    // const effectiveDate = line.substring(2,10).trim();
    // const eventSex      = line.substring(10,11).trim();
    // const eventDist     = line.substring(11,15).trim();
    // const strokeCode    = line.substring(15,16).trim();
    // const eventAge      = line.substring(16,20).trim();
    // const courseCode    = line.substring(20,21).trim();
    // const timeB         = line.substring(21,29).trim();
    // const timeBB        = line.substring(29,37).trim();
    // const timeA         = line.substring(37,45).trim();
    // const timeAA        = line.substring(45,53).trim();
    // const timeAAA       = line.substring(53,61).trim();
    // const timeAAAA      = line.substring(61,69).trim();
  }

   // J2 -- USS Motivational Times
  parseJ2(line) {
    // const header        = line.substring(0,2).trim();
    // const eventSex      = line.substring(2,3).trim();
    // const eventDist     = line.substring(3,7).trim();
    // const strokeCode    = line.substring(7,8).trim();
    // const colorCode     = line.substring(8,12).trim();
    // const scyL1         = line.substring(12,20).trim();
    // const scyL2         = line.substring(20,28).trim();
    // const scyL3         = line.substring(28,36).trim();
    // const lcmL1         = line.substring(36,44).trim();
    // const lcmL2         = line.substring(44,52).trim();
    // const lcmL3         = line.substring(52,60).trim();
    // const effectiveDate = line.substring(60,69).trim();
  }

   // Z0 -- USS Motivational Times
  parseZ0(line) {
    // const header        = line.substring(0,2).trim();
    // const orgCode       = line.substring(2,3).trim();
    // const fileCode      = line.substring(11,13).trim();
    // const notes         = line.substring(13,43).trim();
    // const numofBRecs    = line.substring(43,46).trim();
    // const numofDifMeets = line.substring(46,49).trim();
    // const numofCRecs    = line.substring(49,53).trim();
    // const numofDRecs    = line.substring(53,57).trim();
    // const numofDifSwimmers = line.substring(57,63).trim();
    // const numofERecs    = line.substring(63,69).trim();
    // const numofFRecs    = line.substring(74,80).trim();
    // const numofGRecs    = line.substring(80,86).trim();
    // const batchNumber   = line.substring(86,91).trim();
    // const numofNewMembers = line.substring(91,94).trim();
    // const numofRenewMembers = line.substring(94,97).trim();
    // const numofMemberChanges = line.substring(97,100).trim();
    // const numofMemberDelegates = line.substring(100,103).trim();
  }

  //-------------------------------------------

  render() {
    
    return (
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col">
              <form onSubmit={this.onFormSubmit}>
                <input type="file" ref="file" name="file" id="file"/>
                <button type="submit">Submit</button>
              </form>
              <hr/>
          </div>
          <div className="mdl-cell mdl-cell--2-col">
            <div className="sidenav">
              <h6>TEAMS</h6>
              { this.state.teams.map(team => 
                  {return <TeamList key={team.teamCode} team={team} />}
              )}
              <hr />
            </div>
          </div>
          <div className="mdl-cell mdl-cell--10-col">
            <h1>{this.state.meetInfo.meetName}</h1>
              { this.state.teams.map(team => 
                {return <Team key={team.teamCode} team={team} />}
              )}
          </div>
        </div>
    );
  }
}

export default App;
