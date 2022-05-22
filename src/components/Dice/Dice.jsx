import React from "react";
import plainDice1 from "./dice_images/dice-1.png";
import plainDice2 from "./dice_images/dice-2.png";
import plainDice3 from "./dice_images/dice-3.png";
import plainDice4 from "./dice_images/dice-4.png";
import plainDice5 from "./dice_images/dice-5.png";
import plainDice6 from "./dice_images/dice-6.png";
import woodDice1 from "./dice_images/wood/dice-1.png";
import woodDice2 from "./dice_images/wood/dice-2.png";
import woodDice3 from "./dice_images/wood/dice-3.png";
import woodDice4 from "./dice_images/wood/dice-4.png";
import woodDice5 from "./dice_images/wood/dice-5.png";
import woodDice6 from "./dice_images/wood/dice-6.png";
import diceRollAudio from "./audio/dice_roll.mp3";
import "./Dice.css";
import Die from "./Die";
import ClickButton from "../ClickButton/ClickButton";

export default class Dice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: this.chooseTheme(this.props.diceTheme),
      rolls: [1, 1],
      animate: false,
      audio: new Audio(diceRollAudio),
    };
  }

  chooseTheme = (theme) => {
    const images = {
      plain: {
        1: plainDice1,
        2: plainDice2,
        3: plainDice3,
        4: plainDice4,
        5: plainDice5,
        6: plainDice6,
      },
      wood: {
        1: woodDice1,
        2: woodDice2,
        3: woodDice3,
        4: woodDice4,
        5: woodDice5,
        6: woodDice6,
      },
    };
    return images[theme];
  };

  roll = () => {
    return [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ];
  };

  onRollButtonClick = () => {
    if (!this.props.isGameOver && !this.props.is66) {
      const rolls = this.roll();
      this.setState({ rolls: rolls, animate: true });
      this.state.audio.currentTime = 0;
      this.state.audio.play();
      this.props.onClick(rolls);
      setTimeout(() => {
        this.setState({ animate: false });
      }, 500);
    }
  };

  render() {
    return (
      <div className="dice-wrapper">
        <div className="dice">
          <Die
            className={this.state.animate && "dice-animation"}
            src={this.state.theme[this.state.rolls[0]]}
          />
          <Die
            className={this.state.animate && "dice-animation"}
            src={this.state.theme[this.state.rolls[1]]}
          />
        </div>
        <ClickButton
          id="roll-button"
          onClick={this.onRollButtonClick}
          name="Roll Dice"
          buttonRef={this.props.rollButtonRef}
        />
      </div>
    );
  }
}
