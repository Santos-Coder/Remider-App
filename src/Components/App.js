import React , {Component} from 'react';
import {add_reminder, remove_reminder, clear_reminders} from '../actions/actions';
import {connect} from 'react-redux';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import logo from './logo-2.png'

class App extends Component {
    state = {
        text: '',
        date: new Date()
    }

    renderReminders = () => {
        const {reminders} = this.props;
        return (
            <ul className="list-group">
                {
                    reminders.map(reminder => {
                        return (
                            <li key={reminder.id} className="list-group-item">
                                <div>{reminder.text}</div>
                                <div>{moment(new Date(reminder.date)).fromNow()}</div>
                                <div className="closeIcon" onClick = {() => this.props.remove_reminder(reminder.id)}>X</div>
                            </li>
                        )
                    })
                }
            </ul>
            )
    }
    render() {
        return (
            <div className="App">

                <img src= {logo} />

                <div className="reminder-title">
                    <h1>What Should  U Do ?</h1>
                </div>

                <input className="form-control" type="text"
                value={this.state.text}
                placeholder="What Do U want To Do ... ?"
                onChange = {(e) => this.setState({text: e.target.value})} />

                <DatePicker
                className="form-control"
                placeholderText="When Do U want To Do ... ?"
                value={this.state.date}
                selected={this.state.date}
                onChange={(date) => {this.setState({date: date})}}
                showTimeSelect
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                />

                <button className="btn btn-primary btn-block"
                onClick={() => {
                this.props.add_reminder(this.state.text, this.state.date)
                this.setState({text: '', date: ''})
                }}>Add Reminder</button>

                {this.renderReminders()}

                <button className="btn btn-danger btn-block"
                onClick={() => this.props.clear_reminders()}>Clear Reminder</button>
                
            </div>
        )
    }
}

export default connect(state => {
    return {
        reminders: state
    }
}, {add_reminder, remove_reminder, clear_reminders})(App);