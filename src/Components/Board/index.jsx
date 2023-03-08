import Square from "../Square"

const Board = ({ squares, onClick, winSquaresLocation }) => {
    const highlight = (i) => {
        for (let j = 0; j < winSquaresLocation.length; j++) {
            if (i == winSquaresLocation[j]) {
                return true
            }
        }
        return false
    }
    const renderSquare = (i) => {
        return <Square
            value={squares[i]}
            onClick={() => onClick(i)}
            highlight={highlight(i)}
            key={i}
        ></Square>
    }
    return (
        <div>
            {
                function () {
                    let data = []
                    for (let i = 0; i < 3; i++) {
                        let item = <div className="board-row" key={i}>
                            {
                                function () {
                                    let data = []
                                    for (let j = 0; j < 3; j++) {
                                        let item = renderSquare(i * 3 + j)
                                        data.push(item)
                                    }
                                    return data
                                }()
                            }
                        </div>
                        data.push(item)
                    }
                    return data
                }()
            }
        </div>
    )
}
export default Board