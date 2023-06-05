import { useState, useRef} from "react"
import "./Game.css"

const Game = ({verifyletter, pickedWord, pickedCategory,letters, guessedLetters, wrongLetters, guesses,score}) => {

      const[letter, setLetter]=useState("");
      const letterinputref = useRef(null)
      const handleSubmit = (e) => {
        e.preventDefault();
        verifyletter(letter);
        setLetter("");
        letterinputref.current.focus();
      }

  return (
    <div className="game">
      <p className="points"><span>Pontuação: {score}</span></p>
      <h1>adivinha a palavra:</h1>
      <h3 className="tip"> dica sobre a palavra: <span>{pickedCategory}</span></h3>
      <p>você ainda tem {guesses} tentativa(S).</p>
      <div className="wordContainer">
       {letters.map((letter, i ) =>
        guessedLetters.includes(letter) ? (
            <span key={i} className="letter"> {letter}</span>
        )  :
        ( <span key={i} className="blackSquare"> </span>)
        )}

      </div>
     <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra: </p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="letter" maxLength="1" required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterinputref}/>
          <button>Jogar!</button>
        </form>
        <div className="wrongLettersContainer">
          <p>Letras ja utilizadas:</p>
          {wrongLetters.map((letter, i) => (
            <span key={i}>{letter}, </span>
          ))}
          
        </div>
      </div>
    </div>
  )
}

export default Game