import React from 'react';
import {Link} from 'react-router-dom';
import U from './MeetReader/utils';
import {Menu, Icon} from 'antd';
const {SubMenu} = Menu;
import {Route} from 'react-router-dom';

const TeamsMenu = (props) => {
    if(props.teams === undefined)
        return null;

    return (
        <Menu mode="inline" style={{ height: '100%' }}>
            <SubMenu key="teams" title={<span><Icon type="usergroup-add" />Teams</span>}>
                { props.teams.map( team => { return <Menu.Item key={team.teamCode}><Link to={`/meet/${props.meetid}/team/${team.teamCode}`}>{team.teamCode}</Link></Menu.Item> } ) }
            </SubMenu>
        </Menu>
    );
}

const EventsMenu = (props) => {
    if(props.events === undefined)
        return null;

    return (
        <Menu mode="inline" style={{ height: '100%' }}>
            <SubMenu key="events" title={<span><Icon type="solution" />Events</span>}>
                <Menu.Item key="showall"><Link to={`/meet/${props.meetid}/events`}>Show All</Link></Menu.Item>
                    { Object.keys(props.events).map( e => { 
                        const event = props.events[e];
                        if(event.length === 0)
                            return null;
                        return <Menu.Item key={event[0].eventNum}><Link to={`/meet/${props.meetid}/events/${event[0].eventNum}`}>{U.parseEventTitle(event[0])}</Link></Menu.Item> 
                    })}
            </SubMenu>
        </Menu>
    );
}

// Lists the individual event
const Sidebar = (props) => {

    if(props.events.length <= 0 || props.teams.length <= 0)
        return null;

    return (             
        <div>
            <Route path="/meet/:meetid" render={ (p) => <TeamsMenu teams={props.teams} meetid={p.match.params.meetid} {...p} /> } />
            <Route path="/meet/:meetid" render={ (p) => <EventsMenu events={props.events} meetid={p.match.params.meetid} {...p} /> } />
        </div>
    );
}

export default Sidebar;