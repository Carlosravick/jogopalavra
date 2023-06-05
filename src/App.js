//CSS
import './App.css';

// REACT 

import {  useCallback , useEffect, useState } from "react";

// DATA

import { jogoList } from "./data/jogo";

//components

import StartScreen from './components/StartScreen';
import Game from './components/Game';
import Gameover from './components/Gameover';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
];


function App() {
      const [gameStage, setGameStage] = useState(stages[0].name);
      
      const [jogo] = useState(jogoList);
      const [pickedWord, setPickedWord] = useState("");
      const [pickedCategory, setPickedCategory] = useState("");
      const [letters, setLetters]= useState([]);
      
      const [guessedLetters, setGuessedLetters]= useState([]);
      const [wrongLetters, setWrongLetters] = useState([]);
      const [guesses, setGuesses] = useState(3);
      const [score, setScore] = useState(0);
     
      const escolherpalavra=useCallback( () => {
        const categories = Object.keys(jogo);
        const category= categories[Math.floor(Math.random() * Object.keys(categories).length)];
        

        const jogos = jogo[category][Math.floor(Math.random() * jogo[category].length)]
        

        return {jogos, category}
      }, [jogo]);
      //Começa o game
      const startGame =useCallback( () =>{
        //limpar letras
        ClearLetterStates();
        const {jogos,category} = escolherpalavra();

        let wordLetters = jogos.split("");
        wordLetters = wordLetters.map((l) => l.toLowerCase());

       

        
        //fill state
        setPickedWord(jogos);
        setPickedCategory(category);
        setLetters(wordLetters);
       
        
 
        

        setGameStage(stages[1].name)
      }, [escolherpalavra]);
      
      //verificação
      const verifyletter = (letter) => {
        const normalizedletter=letter.toLowerCase();

        if(guessedLetters.includes(normalizedletter) || wrongLetters.includes(normalizedletter)) {
          return;
        }
          //push guessed letter or remove a guess
          if(letters.includes(normalizedletter)){
            setGuessedLetters((actualguessedLetters) =>[
              ...actualguessedLetters,
               normalizedletter,
            ]);
          }else {
            setWrongLetters((actualWrongLetters) =>[
                ...actualWrongLetters, normalizedletter,
              ]);
              setGuesses((actualguessedLetters) => actualguessedLetters -1);
          }
          
      };
      const ClearLetterStates = () =>{
        setGuessedLetters([]);
        setWrongLetters([]);
      };
      useEffect(() =>{

        if(guesses <= 0){
         
         //reset game  
          ClearLetterStates();
          setGameStage(stages[2].name);
      }
      }, [guesses])

      //ganhar
      useEffect(() =>{
        const uniqueLetters = [...new Set(letters)];
        //ganhar condição 
        if(guessedLetters.length === uniqueLetters.length){
          //add score
          setScore((actualScore) => actualScore += 100)

          //resetar o game
          startGame();
        }

      },[guessedLetters, letters, startGame])

      //reiniciar o jogo
      const retry = () => {
        setScore(0);
        setGuesses(3);
        setGameStage(stages[0].name);
      };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && <Game verifyletter={verifyletter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score}/>}
      {gameStage === "end" && <Gameover retry={retry} score={score}/>}
    </div>
  );
}

export default App;
