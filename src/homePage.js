import React, { useState, useEffect} from "react";
import { render } from "react-dom";
import PlayersList from "./players"
import "./homepage.scss";
import axios from 'axios';

/**
* @function HomePage
* @description Functional component for HomePage
* @returns {React Element}
*/
const HomePage = (props)=> {
    const {matchId, players, scoreToWin} = props;
    const [winner, setWinner] = useState(""); 
    const [error, setError] = useState(""); 

    useEffect(() => {
        if(winner === "")
            return;
        const gameOverInfo = {matchId: matchId, winnerId: winner};
        axios.post('http://localhost:8000/api/game', gameOverInfo)
        .then(response => console.log("Updated Server"))
        .catch(error => {
            this.setState({ errorMessage: error.message });
            console.error('There was an error!', error);
        });
      }, [winner]);

    const getPlayerName = (id) => {
        for (const player of players){
            if(player.id === id){
                return player.name
            }
        }
    }

  return(
    <div>
        <div className="homepage-container">
            <div className="matchid-container">
                <span className="matchid">Match ID: {matchId} </span>
            </div>
            <div className="homepage-block">
                <div className="game-title top-text">
                    <span className="top-text-font">
                        {"ROLL THE DICE"}
                    </span>
                </div>
                <div className="score-to-win top-text">
                    {
                    winner === "" ?(<span className="top-text-font"> {"Score to win: " + scoreToWin} </span>) : (<span className="top-text-font"> {"Winner is " + getPlayerName(winner)}  </span>)
                    }
                    
                </div>
            </div>
            <div className="players-block">
                <PlayersList players={players} scoreToWin={scoreToWin} setWinner={setWinner} winner={winner}/>                    
            </div>
        </div>
    </div>
  );
}

export default HomePage;