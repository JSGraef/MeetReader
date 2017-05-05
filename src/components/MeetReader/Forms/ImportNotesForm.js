import React, {Component} from 'react';
import { Form, Input, DatePicker } from 'antd';
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
import moment from 'moment';

class ImportNotesForm extends Component {

    constructor(props) {
        super(props);

        const info = props.meetinfo;
        this.state = {
            meetName:   info.meetName,
            meetStart:  info.meetStart,
            meetEnd:    info.meetEnd,
            meetNotes:  info.notes,
            meetTags:   info.tags
        }

        this.onDateChange = this.onDateChange.bind(this);
        this.onNotesChange = this.onNotesChange.bind(this);
        this.onTagsChange = this.onTagsChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
    }

    onDateChange(date, dateString) {
        const meetStart = moment(dateString[0]).format('MMDDYYYY');
        const meetEnd = moment(dateString[1]).format('MMDDYYYY');
        this.setState({meetStart, meetEnd});
    }

    onNotesChange(e) {
        this.setState({meetNotes: e.target.value});
    }

    onTagsChange(e) {
        this.setState({meetTags: e.target.value});
    }

    onNameChange(e) {
        this.setState({meetName: e.target.value});
    }

    componentWillUnmount() {
        this.props.saveNotes(this.state);
    }

    render() {
        let meetStart = this.state.meetStart;
        let meetEnd = this.state.meetEnd;

        if(meetStart !== undefined && meetEnd !== undefined) {
            meetStart = ( moment(meetStart, 'MMDDYYYY').isValid() ) ? meetStart : moment(meetStart).format('MMDDYYYY');
            meetEnd = ( moment(meetEnd, 'MMDDYYYY').isValid() ) ? meetEnd : moment(meetEnd).format('MMDDYYYY');
        } else  {
            meetStart = meetEnd = moment();  
        }      

        return (
            <div>
                <br/>
                <h1>Enter meet info</h1>
                <Form>
                    <FormItem label="Meet Name">
                        <Input placeholder="Meet Name" onChange={this.onNameChange} value={this.state.meetName}/>
                    </FormItem>
                    
                    <FormItem label="Date">
                        <RangePicker onChange={this.onDateChange} value={[moment(meetStart, 'MMDDYYYY'), moment(meetEnd, 'MMDDYYYY')]}/>
                    </FormItem>

                    <FormItem label="Notes">
                        <Input type="textarea" placeholder="Meet Notes" autosize={{ minRows: 4, maxRows: 10 }} onChange={this.onNotesChange} value={this.state.meetNotes} />
                    </FormItem>

                    <FormItem label="Tags (Comma Separated)">
                        <Input placeholder="Tags" onChange={this.onTagsChange} value={this.state.meetTags} />
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const WrappedImportNotesForm = Form.create()(ImportNotesForm);

export default WrappedImportNotesForm;