import { connect } from 'react-redux'
import { updateBoard } from "../../../store/board.actions"

export function _ChooseBgColor(props) {
    const colors = ['#0079bf', '#d29034', '#519839', '#b04632', '#89609e', '#cd5a91', '#4bbf6b', '#00aecc', '#838c91']

    const changeBgColor = (color) => {
        const newBoard = { ...props.board }
        newBoard.boardStyle = { backgroundColor: color }
        props.updateBoard(newBoard, 'changed background color')
    }

    return (
        <div className="choose-bg-color flex wrap">
            {colors.map((color, idx) =>
                (<div key={color} className={`bg-color bgclr${idx + 1}`} onClick={() => { changeBgColor(color) }}></div>))}
        </div >
    )
}

function mapStateToProps() {
    return {}
}

const mapDispatchToProps = {
    updateBoard
}

export const ChooseBgColor = connect(mapStateToProps, mapDispatchToProps)(_ChooseBgColor)