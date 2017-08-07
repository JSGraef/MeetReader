import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './MeetReader.css';
import moment from 'moment';

import {Button, Table, Popconfirm, message} from 'antd';

// Firebase 
import {db} from '../../config/constants';
import Rebase  from 're-base';
var base = Rebase.createClass(db, 'TeamCaptain');

class MeetList extends Component {

  constructor() {
    super();
    this.state = {meets: {}}
  }

  componentDidMount() {
    var path = 'MRVAC/meets/meetlist';

    base.listenTo(path, {
        context : this,
        then(data) {
            this.setState({meets: data});
    }});
  }

  onDelete(meetid) {
    if(meetid === undefined)
        return;

    base.remove(`MRVAC/meets/${meetid}`, function(err){
        if(err){
            message.error('Meet unable to be deleted.')
        } else {
            base.remove(`MRVAC/meets/meetlist/${meetid}`);
            message.success('Meet deleted successfully.');
        }
    });

    
  }
  
  render() {
    const meetkeys = Object.keys(this.state.meets);

    const columns = [{
            title: 'Meet Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <Link to={`./meet/${record.key}`}><h4>{text}</h4></Link>,
        }, {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        }, 
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
        }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Popconfirm title="Delete this meet forever?" okText="Yes" onConfirm={() => this.onDelete(record.key)}>
                    <Button type="danger">Delete</Button>
                </Popconfirm>
            ),
    }];

    let data = [];
    
    // Populate the data for the table
    // For each meet, get an object of the data we want that corresponds to the table columns
    if(meetkeys.length > 0) {
        meetkeys.map( key => {
            const meet = this.state.meets[key];
            if(meet === undefined) 
                return null;

            const meetData = {
                key: key,
                date: moment(meet.meetStart, 'MMDDYYYY').format('DD-MMM-YYYY'),
                name: meet.meetName,
                tags: meet.tags,
                address: `${meet.meetAddressL1} ${meet.meetCity}, ${meet.meetState} ${meet.postalCode}`
            }

            data.push(meetData);
            return null;
        } )
    }

    return (
        <Table columns={columns} dataSource={data} /> 
    )
  }
}

export default MeetList;
