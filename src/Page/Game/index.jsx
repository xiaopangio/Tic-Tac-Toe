import { useState } from "react"
import Board from "../../Components/Board"

const Game = () => {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null), location: 0 }])
    const [xIsNext, setXIsNext] = useState(true)
    const [stepNumber, setStepNumber] = useState(0)
    const [historyDisplaySequence, setHistoryDisplaySequence] = useState(true)
    let status = 'Next player: ' + (xIsNext ? 'X' : 'O')
    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return [squares[a], [a, b, c]]
            }
        }
        return [null, [Array(3).fill(null)]]
    }
    const handleClick = (i) => {
        const newHistory = history.slice(0, stepNumber + 1)
        const current = newHistory[newHistory.length - 1]
        const newSquares = current.squares.slice()
        const [win] = calculateWinner(newSquares)
        if (win || newSquares[i]) {
            return
        }
        newSquares[i] = xIsNext ? 'X' : 'O'
        setHistory(newHistory.concat([{ squares: newSquares, location: i }]))
        setXIsNext(!xIsNext)
        setStepNumber(newHistory.length)
    }
    const jumpTo = (step) => {
        setStepNumber(step)
        setXIsNext((step % 2) === 0)
    }
    const changeHistoryDisplaySequence = () => {
        setHistoryDisplaySequence(!historyDisplaySequence)
    }
    const newHistory = history
    const current = newHistory[stepNumber]
    const moves = []
    let winner = ''
    let winSquaresLocation = []
    const beforeRender = () => {
        [winner, winSquaresLocation] = calculateWinner(current.squares)
        let move = historyDisplaySequence ? 0 : newHistory.length - 1
        let end = move == 0 ? newHistory.length - 1 : 0
        const pushItem = (move) => {
            const step = newHistory[move]
            const desc = move ? 'Go to move #' + move + ',location in row: ' + (Math.floor(step.location / 3) + 1) + ' col: ' + (step.location % 3 + 1) : 'Go to game start'
            let item = (
                <li key={move}>
                    <button onClick={() => jumpTo(move)} className={move == stepNumber ? 'bold' : ''}>{desc}</button>
                </li>
            )
            moves.push(item)
        }
        if (move <= end) {
            for (; move <= end; move++) {
                pushItem(move)
            }
        } else {
            for (; move >= end; move--) {
                pushItem(move)
            }
        }
        if (winner) {
            status = 'Winner: ' + winner
        } else {
            if (stepNumber == 9) {
                status = 'The two sides draw'
            }
        }
    }
    beforeRender()
    return (
        <div className="game">
            <div className="game-board">
                <Board squares={current.squares} onClick={(i) => handleClick(i)} winSquaresLocation={winSquaresLocation}></Board>
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
            <div>
                <button onClick={() => changeHistoryDisplaySequence()}>changeSequence</button>
            </div>
        </div>
    )
}
export default Game