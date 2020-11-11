import React, { Component } from "react";
import { connect } from "react-redux";
import { addReminder, deleteReminder, clearReminder } from "./actions";
import moment from "moment";

class App extends Component {
  state= {
    content:''
  }
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      dueDate: "",
    };
  }
  addReminder() {
    this.props.addReminder(this.state.text, this.state.dueDate);
    this.setState({
      content:''
    })
  }
  deleteReminder(id) {
    // console.log("delete", id);
    this.props.deleteReminder(id);
  }

  renderReminder() {
    const { reminders } = this.props;
    return  (
      <ul className="list-group list-group--custom col-sm-4 ">
        {reminders.map((reminders) => {
          return (
            <li key={reminders.id} className="list-group-item d-flex">
              <div className="list-item">
                <div
                  style={{
                    color: "#ec7532",
                    fontSize: "22px",
                    fontWeight: "bold",
                  }}
                  className="list-item--custom"
                >
                  {reminders.text}
                </div>
                <div
                  style={{
                    color: "#ec7532",
                    fontSize: "22px",
                    fontWeight: "bold",
                  }}
                >
                  <em>{moment(new Date(reminders.dueDate)).fromNow()}</em>
                </div>
              </div>
              <div
                className="list-item btn btn-warning custom-btn"
                onClick={() => {
                  this.deleteReminder(reminders.id);
                }}
              >
                DELETE
              </div>
            </li>
          );
        })}
      </ul>
    )  
  }
  render() {
    return (
      <div className="App">
        <h1>ReminderPro</h1>
        <div className="form-inline">
          <div className="form-group form-group--custom">
            <input
              className="form-control"
              placeholder="Add Reminder..."
              onChange={(e) => {
                this.setState({
                  text: e.target.value,
                });
              }}
              value={this.state.content}
            />
            <input
              className="form-control "
              type="datetime-local"
              style={{ color: "#ec7532", fontWeight: "bold" }}
              onChange={(e) =>
                this.setState({
                  dueDate: e.target.value,
                })
              }
              value={this.state.content}
            />
          </div>

          <button
            className="btn btn-success"
            type="button"
            onClick={() => this.addReminder()}
          >
            Add Reminder
          </button>
          {this.renderReminder()}
          <div
            className="btn btn-danger clear-btn"
            onClick={() => this.props.clearReminder()}
          >
            Clear Reminders
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { reminders: state };
}
export default connect(mapStateToProps, {
  addReminder,
  deleteReminder,
  clearReminder,
})(App);
