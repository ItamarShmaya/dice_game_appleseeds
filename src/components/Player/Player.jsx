import React from "react";
import "./Player.css";

export default class Player extends React.Component {
  isPlaying = () => {
    return this.props.currentPlayer === this.props.id;
  };

  render() {
    return (
      <div
        id={this.props.id}
        className={`player ${this.isPlaying() ? "current-player" : ""}`}
      >
        <h2 className="player-name">{this.props.name}</h2>
        <div className="total-score">Total Score: {this.props.totalScore}</div>
        <div className="wins">Wins: {this.props.wins}</div>
        {this.props.didLose && <div className="lost">Lost</div>}
      </div>
    );
  }
}
