import React from "react";
import GameBoard from "../GameBoard/GameBoard";
import GameSettingInputs from "../GameSettingInputs/GameSettingInputs";
import "./Game.css";

export default class Game extends React.Component {
  state = {
    numOfPlayers: 2,
    diceTheme: "plain",
    scoreGoal: "",
    names: [],
    gameStared: false,
    isAI: true,
  };

  onInputChange = ({ target }) => {
    if (target.id === "numOfPlayers" && +target.value === 1) {
      this.setState({ numOfPlayers: 2, isAI: true });
    } else {
      this.setState({ [target.id]: target.value, isAI: false });
    }
  };

  onNamesInputChange = ({ target }) => {
    const namesIndex = +target.id.slice(-1) - 1;
    this.setState((prev) => {
      const names = prev.names;
      names[namesIndex] = target.value;
      return { names: names };
    });
  };

  onStartGameButtonClick = () => {
    this.setState({ gameStared: true });
    console.log(this.state);
  };

  render() {
    return (
      <>
        {!this.state.gameStared && (
          <>
            <GameSettingInputs
              onInputChange={this.onInputChange}
              onNamesInputChange={this.onNamesInputChange}
              onStartGameButtonClick={this.onStartGameButtonClick}
              numOfPlayers={this.state.numOfPlayers}
              diceTheme={this.state.diceTheme}
              scoreGoal={this.state.scoreGoal}
              names={this.state.names}
              isAI={this.state.isAI}
            />
            <div className="rules-container">
              <h2>Rules</h2>
              <div className="rules">
                <ul>
                  <li>
                    In each turn, a player rolls 2 dices as many times as he
                    wishes. (at least once) - Each result will get added to his
                    temporary score.
                  </li>
                  <li>
                    If the player rolls a double six all his temporary score
                    gets lost. And the turn goes to the next player
                  </li>
                  <li>
                    A player can choose to ‘Hold’, which means that his
                    temporary score gets added to his global score, and turn
                    goes to the next player.
                  </li>
                  <li>
                    Winner of the game:
                    <ul>
                      <li>
                        The first player to reach 100 points. (100 exactly not
                        101 and not 99)
                      </li>
                      <li>
                        The opposing player passed 100 points in his total
                        score.
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
        {this.state.gameStared && (
          <GameBoard
            numOfPlayers={this.state.numOfPlayers || 2}
            diceTheme={this.state.diceTheme}
            scoreGoal={this.state.scoreGoal || 100}
            names={this.state.names}
            isAI={this.state.isAI}
          />
        )}
      </>
    );
  }
}
