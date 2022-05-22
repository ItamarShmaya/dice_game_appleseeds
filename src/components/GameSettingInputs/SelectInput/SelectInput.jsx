import React from "react";
import "./SelectInput.css";

export default class SelectInput extends React.Component {
  renderOptions = (optionsValues) => {
    return optionsValues.map((option, i) => {
      return (
        <option key={`option${i}`} value={option.toLowerCase()}>
          {option}
        </option>
      );
    });
  };

  render() {
    return (
      <div className="input-group">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <select
          className="select"
          id={this.props.id}
          value={this.props.numOfPlayers}
          onChange={this.props.onInputChange}
        >
          {this.renderOptions(this.props.optionsValues)}
        </select>
      </div>
    );
  }
}
