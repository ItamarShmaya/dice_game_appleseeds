import React from "react";
import ClickButton from "../ClickButton/ClickButton";
import SelectInput from "./SelectInput/SelectInput";
import "./GameSettingInputs.css";

export default class GameSettingInputs extends React.Component {
  renderNameInputs = (n) => {
    if (this.props.isAI) n = 1;
    const nameInputs = [];
    for (let i = 1; i <= n; i++) {
      nameInputs.push(
        <div key={`name${i}`} className="input-group">
          <label htmlFor={`playerName${i}`}>{`player${i}`} Name</label>
          <input
            id={`playerName${i}`}
            type="text"
            value={this.props.names[i - 1]}
            onChange={this.props.onNamesInputChange}
          />
        </div>
      );
    }
    return nameInputs;
  };
  render() {
    return (
      <div className="game-settings">
        <SelectInput
          id="numOfPlayers"
          label="How many players"
          value={this.props.numOfPlayers}
          onInputChange={this.props.onInputChange}
          optionsValues={["1", "2", "3", "4", "5"]}
        />
        {this.renderNameInputs(this.props.numOfPlayers)}
        <div className="input-group">
          <label htmlFor="scoreGoal">Score goal</label>
          <input
            id="scoreGoal"
            type="number"
            value={this.props.scoreGoal}
            onChange={this.props.onInputChange}
          />
        </div>
        <SelectInput
          id="diceTheme"
          label="Dice theme"
          value={this.props.diceTheme}
          onInputChange={this.props.onInputChange}
          optionsValues={["plain", "wood"]}
        />
        <ClickButton
          id="start-game"
          onClick={this.props.onStartGameButtonClick}
          name="Start Game"
        />
      </div>
    );
  }
}
