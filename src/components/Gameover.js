import "./Gameover.css"

const Gameover = ({retry,score}) => {
  return (
    <div>
        <h1>FIM DE JOGO</h1>
        <h2>
          a sua pontuação foi: <span>{score}</span>
        </h2>
        <button onClick={retry}>Resetar o jogo</button>
        
    </div>
  )
}

export default Gameover