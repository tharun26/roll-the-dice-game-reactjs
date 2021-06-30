import React, { useState, useEffect} from "react";
import { render } from "react-dom";
import Confetti from "react-confetti";

/**
* @function Player
* @description Functional component for player
* @returns {React Element}
*/
const Player = (props)=> {

  const [score, setScore] = useState(0); 

  /**
  * @function rollDice
  * @description return number between 1 and 6
  * @returns {Number} dice value
  */
  const rollDice = () => {
    const min = 1;
    const max = 6
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
  * @function onClick
  * @description onClick Listener to roll button, sets score state for each player
  * @returns {Number} dice value
  */
  const onClick = (event) =>{
    if(props.currentPlayer) {
      const currentDiceValue = rollDice();
      setScore(score + currentDiceValue);
      if(score + currentDiceValue >= props.scoreToWin){
        props.setWinner(props.data.id);
        props.setCurrentPlayer(null);
        return;
      }
      props.setCurrentPlayer(props.nextPlayer);
    }
  };

  return(
    <div className="player-wrapper">
      {props.winner === props.data.id ? <Confetti />: null}
      <div className="player-header">
        <h4><b>{props.data.name}</b></h4>
      </div>
      <div className="player-avatar">
        {<img src={props.data.imageUrl} alt="avatar-image"/>}
      </div>
      <div className="player-score">
        <span>Score: {score}</span>
      </div>
      <div className="player-roll-button-container">
        <button className={ props.currentPlayer ? "player-roll-button" : "player-roll-button player-roll-button-disable"} onClick={onClick}>Roll</button>
      </div>
    </div>
  );
}


/**
* @function PlayersList
* @description Functional component for players list section
* @returns {React Element}
*/
const PlayersList = ({players, scoreToWin, setWinner, winner})=> {
  const [currentPlayer, setCurrentPlayer] = React.useState(players[0].id); 
  return(
    <div>
      <div className="players-item-container">
        {
        players.map( (player, index) => {
          let nextPlayerIndex = index + 1;
          nextPlayerIndex = (nextPlayerIndex >= players.length) ? nextPlayerIndex % players.length : nextPlayerIndex;
          return <Player key={index.toString()} index={index} data={player} currentPlayer={currentPlayer === player.id} setCurrentPlayer={setCurrentPlayer} nextPlayer={players[nextPlayerIndex].id} scoreToWin={scoreToWin} setWinner={setWinner} winner={winner}/> 
          }) 
        }
      </div>
    </div>
  );
}

export default PlayersList;