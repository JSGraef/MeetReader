import React from 'react';
import Swim from './Swim';
import U from './utils';
import {Link} from 'react-router-dom';
import {Table} from 'antd';
import Splits from './Splits';

// Shows info about swimmer and all their swims
const Swimmer = (props) => {
    if(props.swimmer === undefined)
        return <h4>Couldn't find swimmer</h4>

    const swim = props.swimmer.swims[0];

    const columns = [
        {
            title: 'Event',
            dataIndex: 'eventNum',
            key: 'eventNum',
            render: (text, record) =>
                <Link to={`/meet/events/${record.eventNum}`}>{`${record.eventDist} ${U.getStrokeFromCode(record.strokeCode)}`}</Link>
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
            title: 'Place',
            dataIndex: 'finalsPlace',
            key: 'place'
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
                <h4>{swim.swimmerName}</h4>
            </div>

            <Table
                rowKey={record => record.eventNum}
                columns={columns}
                dataSource={props.swimmer.swims}
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

export default Swimmer;