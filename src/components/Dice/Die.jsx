import React from "react";

export default class Die extends React.Component {
  render() {
    return (
      <div className={`die ${this.props.className}`}>
        <img alt="number :)" src={this.props.src} />
      </div>
    );
  }
}
