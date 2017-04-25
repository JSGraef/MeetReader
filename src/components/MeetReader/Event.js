import React, {Component} from 'react';
import U from './utils';
import {Table, Button, Icon, Row} from 'antd';
import {Link} from 'react-router-dom';
import Splits from './Splits';
import SplitsRelay from './SplitsRelay';

class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expandedRowKeys: []
        }
    }

    render() {
        if(this.props.event === undefined)
            return <h4>Couldn't find event</h4>

        const event = this.props.event;

        // Order swimmers by place
        let swimmersInOrder = event.sort( (a,b) => {

            let diff = U.timeDiff(b.finalsTime, a.finalsTime);

            // TO COMPARE TIMES:
            // If a finals time exists, use that.
            // if one finals and one prelim, finals comes first.
            // if two prelim, compare prelims

            // Something's up with the times. One probably does not exist.
            if(diff === '') {

                // If DQ at all, send them to the end
                if(a.finalsTime.includes('DQ') || a.prelimTime.includes('DQ') )
                    return 1;
                if(b.finalsTime.includes('DQ') || b.prelimTime.includes('DQ') )
                    return -1;

                //  I consider a finals time of NS (no swim) to be on top of the prelims times (it should anyway)
                const hasFinalTimeB = a.finalsTime.includes('NS');
                const hasFinalTimeA = a.finalsTime.includes('NS');
                if(hasFinalTimeA && !hasFinalTimeB)
                    return 1;
                if(hasFinalTimeB && !hasFinalTimeA)
                    return -1;

                // Since we don't have finals times, must try to compare prelim times
                const prelimA = (a.finalsTime === '' || a.finalsTime === 'Y' || a.finalsTime.includes('NS'));
                const prelimB = (b.finalsTime === '' || b.finalsTime === 'Y' || b.finalsTime.includes('NS'));

                // If both are prelim times, compare them
                if(prelimA && prelimB) {
                    
                    diff = U.timeDiff(b.prelimTime, a.prelimTime);

                    if(a.prelimTime === '' || a.prelimTime === 'Y' || a.prelimTime.includes('NS') ) 
                        diff = 1;
                    if(b.prelimTime === '' || b.prelimTime === 'Y' || b.prelimTime.includes('NS'))
                        diff = -1;

                    // One of the prelim times is messed up - no information. So 
                    if(diff === '')
                        return 1;
                }
                else
                    return prelimA ? 1 : -1;
            }
                
            return diff;
        });

        // TODO put into state
        // Holds all the row keys for the table so we can expand them all
        let allRowKeys = [];

        // If we have a relay (which follows a different format)
        if(swimmersInOrder[0].swimmers !== undefined) {
            const relaycolumns = [
            {
                title: 'Place',
                dataIndex: 'finalsPlace',
                key: 'place'
            },
            {
                title: 'Team',
                dataIndex: 'teamCode',
                key: 'name',
                render: (text, record) => <Link to={`/meet/team/${record.teamCode}`}>{text} {record.relTeamName}</Link>
            },
            {
                title: 'Seed Time',
                dataIndex: 'seedTime',
                key: 'seed'
            },
            {
                title: 'Prelim Time',
                dataIndex: 'prelimTime',
                key: 'prelim'
            },
            {
                title: 'Finals Time',
                dataIndex: 'finalsTime',
                key: 'final'
            },
            {
                title: 'Improvement',
                dataIndex: 'improvement',
                key: 'improvement',
                render: (text, record) => {
                    const time = (record.finalsTime === '') ? record.prelimTime : record.finalsTime;
                    let timeDiff = U.timeDiff(record.seedTime, time);
                    let timeDiffClass = 'swim-diffNeg';
                    if(timeDiff > 0) {
                        timeDiff = '+'+timeDiff;
                        timeDiffClass = 'swim-diffPos';
                    }

                    return <span className={timeDiffClass}>{timeDiff}</span>;
                }
            },
            {
                title: 'Points Scored',
                dataIndex: 'pointsScored',
                key: 'points'
            }
        ];

            return (
                <div className="swimmer">
                    <div className="swimmer-header">
                        <h4>{U.parseEventTitle(event[0])}</h4>
                    </div>

                    <Table
                        rowKey={record => { 
                            let key = record.teamCode + record.relTeamName + record.finalsPlace;
                            allRowKeys.push(key);
                            return key;
                        }}
                        columns={relaycolumns}
                        dataSource={swimmersInOrder}
                        pagination={false}
                        expandedRowRender={record => <SplitsRelay swimmers={record.swimmers} />}
                        size="small"
                    />
                </div>
            );
        }

        const columns = [
            {
                title: 'Place',
                dataIndex: 'finalsPlace',
                key: 'place'
            },
            {
                title: 'Name',
                dataIndex: 'swimmerName',
                key: 'name',
                render: (text, record) => <Link to={`/meet/swimmer/${record.ussNum}`}>{text}</Link>
            },
            {
                title: 'Seed Time',
                dataIndex: 'seedTime',
                key: 'seed'
            },
            {
                title: 'Prelim Time',
                dataIndex: 'prelimTime',
                key: 'prelim'
            },
            {
                title: 'Finals Time',
                dataIndex: 'finalsTime',
                key: 'final',
                render: (text) => {return text.substring(0, text.length-1)}
            },
            {
                title: 'Improvement',
                dataIndex: 'improvement',
                key: 'improvement',
                render: (text, record) => {
                    const time = (record.finalsTime === '') ? record.prelimTime : record.finalsTime;
                    let timeDiff = U.timeDiff(record.seedTime, time);
                    let timeDiffClass = 'swim-diffNeg';
                    if(timeDiff > 0) {
                        timeDiff = '+'+timeDiff;
                        timeDiffClass = 'swim-diffPos';
                    }

                    return <span className={timeDiffClass}>{timeDiff}</span>;
                }
            },
            {
                title: 'Points Scored',
                dataIndex: 'pointsScored',
                key: 'points'
            }
        ];

        // to add expanded rows:
        //expandedRowKeys={this.state.expandedRowKeys}


        const eventid = parseInt(this.props.eventid, 10);
        return (
            <div className="swimmer">
                <Row type="flex" justify="end">
                <Button.Group size='small'>
                        <Button>
                            <Link to={`/meet/events/${eventid-1}`}><Icon type="left" />Previous Event</Link>
                        </Button>
                        <Button>
                            <Link to={`/meet/events/${eventid+1}`}>Next Event<Icon type="right" /></Link>
                        </Button>
                    </Button.Group>
                </Row>

            
                <div className="swimmer-header">
                    <h4>{U.parseEventTitle(event[0])}</h4>
                    {/*<Button onClick={ () => {
                        let expandedRows = 
                            (this.state.expandedRowKeys.length) ?
                            [] :
                            allRowKeys;

                        this.setState({expandedRowKeys: expandedRows});
                            
                        }}>Expand / Contract Rows</Button>*/}
                </div>
                
                <Table
                    rowKey={record => 
                        {
                            let key = record.ussNum;
                            allRowKeys.push(key);
                            return key;
                        }}
                    columns={columns}
                    dataSource={swimmersInOrder}
                    pagination={false}
                    expandedRowRender={record => {
                        return (
                            record.splits.map(s => {
                                return <Splits splits={s} key={U.guid()} />
                        }))
                        
                        }}
                    size="small"
                />
            </div>
        );
    }
}

export default Event;