import React from "react";
import "./GifMessage.css";

export default class GifMessage extends React.Component {
  state = {
    audio: new Audio(this.props.audio),
  };

  render() {
    this.state.audio.play();
    return (
      <div className="sixsix">
        <img alt="gif" src={this.props.gif} />
        <div className="message">{this.props.message}</div>
      </div>
    );
  }
}
