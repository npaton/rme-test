import React from "react";

import { Centered } from "meteor/empirica:core";

const Radio = ({ selected, name, value, label, onChange }) => (
    <label className="bp3-control bp3-radio bp3-inline">
      <input
          type="radio"
          name={name}
          value={value}
          checked={selected === value}
          onChange={onChange}
      />
      <span className="bp3-control-indicator" />
      {label}
    </label>
);

export default class ExitSurvey extends React.Component {
  static stepName = "ExitSurvey";
  state = { age: "", gender: "", fair: "", feedback: "", education: "" };

  handleChange = event => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  exitMessage = (player, game) => {
    return (
        <div>
          {" "}
          <h1> Exit Survey </h1>
          <br />
          <h3>
            Please submit the following code to receive your bonus:{" "}
            <em>{player._id}</em>.
          </h3>
          <p>
            You final{" "}
            <strong>
              bonus for the part of Reading the Mind from the Eye tests{" "}
              <em>is ${player.get("bonus") || 0}</em> in addition to your base pay of  <em>${game.treatment.basePay}</em>.
              <p>Note that both base pay and bonus will be paid as bonuses upon the approval of the HIT.</p>
            </strong>{" "}
          </p>
        </div>
    );
  };

  exitForm = () => {
    const { age, gender, fair, feedback, education } = this.state;

    return (
        <div>
          {" "}
          <p>
            Please answer the following short survey. You do not have to provide
            any information you feel uncomfortable with.
          </p>
          <form onSubmit={this.handleSubmit}>
            <div className="form-line">
              <div className="bp3-form-group">
                <label className="bp3-label" htmlFor="age">
                  Age
                </label>
                <div className="bp3-form-content">
                  <input
                      id="age"
                      className="bp3-input"
                      type="number"
                      min="0"
                      max="150"
                      step="1"
                      dir="auto"
                      name="age"
                      value={age}
                      onChange={this.handleChange}
                      // required
                  />
                </div>
              </div>
              <div className="bp3-form-group">
                <label className="bp3-label" htmlFor="gender">
                  Gender
                </label>
                <div className="bp3-form-content">
                  <input
                      id="gender"
                      className="bp3-input"
                      type="text"
                      dir="auto"
                      name="gender"
                      value={gender}
                      onChange={this.handleChange}
                      // required
                  />
                </div>
              </div>
            </div>

            <div className="bp3-form-group">
              <label className="bp3-label">Highest Education Qualification</label>
              <div className="bp3-form-content">
                <Radio
                    selected={education}
                    name="education"
                    value="high-school"
                    label="High School"
                    onChange={this.handleChange}
                />
                <Radio
                    selected={education}
                    name="education"
                    value="bachelor"
                    label="US Bachelor's Degree"
                    onChange={this.handleChange}
                />
                <Radio
                    selected={education}
                    name="education"
                    value="master"
                    label="Master's or higher"
                    onChange={this.handleChange}
                />
                <Radio
                    selected={education}
                    name="education"
                    value="other"
                    label="Other"
                    onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-line thirds">
              <div className="bp3-form-group">
                <label className="bp3-label" htmlFor="age">
                  Do you feel the pay was fair?
                </label>
                <div className="bp3-form-content">
                <textarea
                    className="bp3-input bp3-fill"
                    dir="auto"
                    name="fair"
                    value={fair}
                    onChange={this.handleChange}
                />
                </div>
              </div>
              <div className="bp3-form-group">
                <label className="bp3-label" htmlFor="age">
                  Feedback, including problems you encountered.
                </label>
                <div className="bp3-form-content">
                <textarea
                    className="bp3-input bp3-fill"
                    dir="auto"
                    name="feedback"
                    value={feedback}
                    onChange={this.handleChange}
                />
                </div>
              </div>
            </div>

            <button type="submit" className="bp3-button bp3-intent-primary">
              Submit
              <span className="bp3-icon-standard bp3-icon-key-enter bp3-align-right" />
            </button>
          </form>{" "}
        </div>
    );
  };

  componentWillMount() {}

  render() {
    const { player, game } = this.props;
    return (
        <Centered>
          <div className="exit-survey">
            {this.exitMessage(player, game)}
            <hr />
            {this.exitForm()}
          </div>
        </Centered>
    );
  }
}
