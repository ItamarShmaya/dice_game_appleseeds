import React from "react";
import ClickButton from "../ClickButton/ClickButton";
import Dice from "../Dice/Dice";
import "./Menu.css";

export default class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
        <Dice
          diceTheme={this.props.diceTheme}
          onClick={this.props.onRollButtonClick}
          isGameOver={this.props.isGameOver}
          currentPlayer={this.props.currentPlayer}
          is66={this.props.is66}
          rollButtonRef={this.props.rollButtonRef}
        />
        <div className="not-dice">
          <div className="currentValue">
            Current Value: {this.props.currentValue}
          </div>
          <ClickButton
            id="hold-button"
            onClick={this.props.onHoldButtonClick}
            name="Hold"
            buttonRef={this.props.holdButtonRef}
          />
          <div className="scoreGoal">Score Goal: {this.props.scoreGoal}</div>

          <ClickButton
            id="new-game"
            onClick={this.props.onNewGameButtonClick}
            name="New Game"
          />
        </div>
      </div>
    );
  }
}
