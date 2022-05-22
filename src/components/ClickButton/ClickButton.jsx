import React from "react";
import "./ClickButton.css";

export default class ClickButton extends React.Component {
  render() {
    return (
      <button
        id={this.props.id}
        className={`btn ${this.props.className}`}
        onClick={this.props.onClick}
        ref={this.props.buttonRef}
      >
        {this.props.name}
      </button>
    );
  }
}

ClickButton.defaultProps = {
  className: "",
};
