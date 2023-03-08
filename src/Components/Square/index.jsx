const Square = ({ value, onClick, highlight }) => {
    return (
        <button className={"square " + (highlight ? 'highlight' : '')} onClick={() => onClick()} >
            {value}
        </button>
    )
}
export default Square