import React from "react";
import Menu from "../Menu/Menu";
import Player from "../Player/Player";
import GifMessage from "../GifMessage/GifMessage";
import aye from "./audio/aye.mp4";
import ayeWin from "./audio/aye-win.mp3";

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: null,
      currentPlayer: "player1",
      playersRemaining: +this.props.numOfPlayers,
      isGameOver: false,
      winner: "",
      is66: false,
      rollButtonRef: React.createRef(),
      holdButtonRef: React.createRef(),
    };
    for (let i = 1; i <= +this.props.numOfPlayers; i++) {
      this.state[`player${i}`] = {};
      this.state[`player${i}`]["totalScore"] = null;
      this.state[`player${i}`]["didLose"] = false;
      this.state[`player${i}`]["wins"] = null;
    }
  }

  updateCurrentValue = (diceRoll) => {
    if (!(diceRoll[0] === 6 && diceRoll[1] === 6)) {
      this.setState((prev) => {
        return {
          currentValue: prev.currentValue + diceRoll.reduce((a, b) => a + b),
        };
      });
    } else {
      this.setState({ currentValue: null, is66: true });
      this.updateCurrentPlayer();
      setTimeout(() => {
        this.setState({ is66: false });
      }, 3000);
    }
  };

  AIplay = () => {
    if (this.props.isAI && this.state.currentPlayer === "player2") {
      setTimeout(() => {
        this.state.rollButtonRef.current.click();
      }, 500);

      setTimeout(() => {
        if (Math.random() < 0.3) {
          this.state.holdButtonRef.current.click();
        } else {
          this.AIplay();
        }
      }, 1000);
    }
  };

  updateCurrentPlayer = () => {
    let swapped = false;
    let i = +this.state.currentPlayer.slice(-1);
    i === +this.props.numOfPlayers ? (i = 1) : i++;
    while (!swapped) {
      if (!this.state[`player${i}`].didLose) {
        swapped = true;
        this.setState(
          () => {
            return { currentPlayer: `player${i}` };
          },
          () => {
            if (this.props.isAI) {
              if (this.state.is66)
                setTimeout(() => {
                  this.AIplay();
                }, 4000);
              else this.AIplay();
            }
          }
        );
      } else i++;
    }
  };

  updatePlayer = (totalScore, didLose, wins) => {
    return {
      totalScore: totalScore,
      didLose: didLose,
      wins: wins,
    };
  };

  updateTotalScore = () => {
    this.setState(
      (prev) => {
        return {
          [this.state.currentPlayer]: this.updatePlayer(
            prev[this.state.currentPlayer].totalScore + this.state.currentValue,
            prev[this.state.currentPlayer].didLose,
            prev[this.state.currentPlayer].wins
          ),
        };
      },
      () => {
        this.didPlayerLose();
        this.didPlayerWin();
        if (!this.state.isGameOver) this.updateCurrentPlayer();
      }
    );
  };

  didPlayerLose = () => {
    const currentPlayerTotalScore =
      this.state[this.state.currentPlayer].totalScore;
    if (currentPlayerTotalScore > this.props.scoreGoal) {
      this.setState(
        (prev) => {
          return {
            playersRemaining: prev.playersRemaining - 1,
            [this.state.currentPlayer]: this.updatePlayer(
              prev[this.state.currentPlayer].totalScore +
                this.state.currentValue,
              true,
              prev[this.state.currentPlayer].wins
            ),
          };
        },
        () => {
          if (this.state.playersRemaining === 1) {
            let winner = "";
            for (let key in this.state) {
              if (this.state[key]) {
                if (this.state[key].didLose === false) {
                  const namesIndex = +key.slice(-1) - 1;
                  winner =
                    this.props.isAI && key === "player2"
                      ? "Comp"
                      : this.props.names[namesIndex] || key;
                  this.setState((prev) => {
                    return {
                      [key]: this.updatePlayer(
                        prev[key].totalScore,
                        false,
                        prev[key].wins + 1
                      ),
                    };
                  });
                }
              }
            }
            this.setState({ isGameOver: true, winner: winner });
          }
        }
      );
    }
  };

  didPlayerWin = () => {
    const currentPlayerTotalScore =
      this.state[this.state.currentPlayer].totalScore;
    if (currentPlayerTotalScore === +this.props.scoreGoal) {
      const namesIndex = +this.state.currentPlayer.slice(-1) - 1;
      const winner =
        this.props.isAI && this.state.currentPlayer === "player2"
          ? "Comp"
          : this.props.names[namesIndex] || this.state.currentPlayer;
      this.setState((prev) => {
        return {
          isGameOver: true,
          winner: winner,
          [this.state.currentPlayer]: this.updatePlayer(
            prev[this.state.currentPlayer].totalScore,
            false,
            prev[this.state.currentPlayer].wins + 1
          ),
        };
      });
    }
  };

  resetCurrentValue = () => {
    this.setState({ currentValue: null });
  };

  onHoldButtonClick = () => {
    if (!this.state.isGameOver) {
      if (this.state.currentValue) {
        this.resetCurrentValue();
        this.updateTotalScore();
      }
    }
  };

  renderPlayers = (n) => {
    const players = [];
    for (let i = 1; i <= n; i++) {
      players.push(
        <Player
          key={`player${i}`}
          id={`player${i}`}
          currentPlayer={this.state.currentPlayer}
          totalScore={this.state[`player${i}`].totalScore}
          name={
            this.props.isAI && i === 2
              ? "Comp"
              : this.props.names[i - 1] || `player${i}`
          }
          wins={this.state[`player${i}`].wins}
          didLose={this.state[`player${i}`].didLose}
        />
      );
    }
    return players;
  };

  resetPlayers = () => {
    for (let i = 1; i <= +this.props.numOfPlayers; i++) {
      this.setState((prev) => {
        return {
          [`player${i}`]: this.updatePlayer(
            null,
            false,
            prev[`player${i}`].wins
          ),
        };
      });
    }
  };

  onNewGameButtonClick = () => {
    this.setState({
      currentValue: null,
      currentPlayer: "player1",
      playersRemaining: +this.props.numOfPlayers,
      isGameOver: false,
      winner: "",
    });
    this.resetPlayers();
  };

  render() {
    return (
      <>
        {this.state.isGameOver && (
          <GifMessage
            message={`${this.state.winner} won`}
            gif="https://cliparting.com/wp-content/uploads/2018/03/happy-birthday-gif-2018-31.gif"
            audio={ayeWin}
          />
        )}
        <div className="players">
          {this.renderPlayers(+this.props.numOfPlayers)}
          {this.state.is66 && (
            <GifMessage
              message="You rolled 6 6 and lost all your accumulated points. Too Bad!"
              gif="https://i.pinimg.com/originals/8a/ce/0b/8ace0bd4e6e94bed0a4a1a9883670008.gif"
              audio={aye}
            />
          )}
        </div>
        <Menu
          isGameOver={this.state.isGameOver}
          currentValue={this.state.currentValue}
          currentPlayer={this.state.currentPlayer}
          scoreGoal={this.props.scoreGoal}
          onHoldButtonClick={this.onHoldButtonClick}
          onRollButtonClick={this.updateCurrentValue}
          onNewGameButtonClick={this.onNewGameButtonClick}
          diceTheme={this.props.diceTheme}
          is66={this.state.is66}
          rollButtonRef={this.state.rollButtonRef}
          holdButtonRef={this.state.holdButtonRef}
        />
      </>
    );
  }
}
