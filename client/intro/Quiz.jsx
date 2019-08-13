import React from "react";

import { Centered, AlertToaster } from "meteor/empirica:core";

export default class Quiz extends React.Component {
  state = { value1: "", value2: "", value3: "" };

  handleChange = event => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value.trim().toLowerCase() });
  };

  handleSubmit = event => {
    const correctValue1=["eyes","eye"];
    event.preventDefault();

    if (
        !correctValue1.includes(this.state.value1)||
        this.state.value2 !== "4" ||
        this.state.value3 !== "white"
    ) {
      AlertToaster.show({
        message:
            "Sorry, you made a mistake! Please go back to the instructions and make sure you understand the task"
      });
    } else {
      this.props.onNext();
    }
  };

  render() {
    const { hasPrev, hasNext, onNext, onPrev } = this.props;
    const { value1, value2, value3 } = this.state;
    return (
        <Centered>
          <div className="quiz">
            <h1> Quiz </h1>
            <form onSubmit={this.handleSubmit}>
              <div className="bp3-form-group">
                <label className="bp3-label" htmlFor="example-form-group-input-a">
                  Which part of the face you are going to be shown?
                </label>
                <div className="bp3-form-content">
                  <input
                      id="example-form-group-input-a"
                      className="bp3-input"
                      placeholder="e.g. ears"
                      type="text"
                      dir="auto"
                      name="value1"
                      value={value1}
                      onChange={this.handleChange}
                      required
                  />
                </div>
              </div>
              <div className="bp3-form-group">
                <label className="bp3-label" htmlFor="example-form-group-input-a">
                  What is 2+2?
                </label>
                <div className="bp3-form-content">
                  <input
                      id="example-form-group-input-a"
                      className="bp3-input"
                      placeholder="e.g. 3"
                      type="text"
                      dir="auto"
                      name="value2"
                      value={value2}
                      onChange={this.handleChange}
                      required
                  />
                </div>
              </div>
              <div className="bp3-form-group">
                <label className="bp3-label" htmlFor="example-form-group-input-a">
                  What color was Napoleon's white horse?
                </label>
                <div className="bp3-form-content">
                  <input
                      id="example-form-group-input-a"
                      className="bp3-input"
                      placeholder="e.g. brown"
                      type="text"
                      dir="auto"
                      name="value3"
                      value={value3}
                      onChange={this.handleChange}
                      required
                  />
                </div>
              </div>

              <button
                  type="button"
                  className="bp3-button bp3-intent-nope bp3-icon-double-chevron-left"
                  onClick={onPrev}
                  disabled={!hasPrev}
              >
                Back to instructions
              </button>
              <button type="submit" className="bp3-button bp3-intent-primary">
                Submit
                <span className="bp3-icon-standard bp3-icon-key-enter bp3-align-right" />
              </button>
            </form>
          </div>
        </Centered>
    );
  }
}