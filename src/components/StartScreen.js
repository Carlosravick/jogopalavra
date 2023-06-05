import "./StartScreen.css"

const StartScreen = ({ startGame }) => {
  return (
    <div className="start">
        <h1>Acerte a palavra</h1>
        <p>Clique no botão abaixo para começar a jogar</p>
        <button onClick={startGame }>Começa o jogo</button>
       
    </div>
  )
}

export default StartScreen