import React from "react";
import { render } from "react-dom";
import HomePage from "./homePage.js";
import "./index.scss";


const Game = (props) => {
  // Call API and get the data 
  // till we receive data spinner UI is shown
  // once data is received we ender homePage.js
  const [gameInfo, setGameInfo] = React.useState({});  
  React.useEffect(() => {
    const url = "http://localhost:8000/api/game"
    fetch(url)
      .then(results => results.json())
      .then(data => {
        setGameInfo(data);
      });
  }, []);

  if(gameInfo.players == undefined)
    return null;
  return (
    <div>
      <HomePage matchId={gameInfo.matchId} players={gameInfo.players} scoreToWin={gameInfo.scoreToWin}/>
    </div>
  );
  
  };

/**
* @function showReactComponent
* @desc Function that adds Application react component to the page
* @returns None
*/
const showReactComponent = ()=>{
  render(<Game />, document.getElementById("container"));
};

showReactComponent();