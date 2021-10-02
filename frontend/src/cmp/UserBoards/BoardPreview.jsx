// import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { IconContext } from "react-icons";
import { FiStar } from 'react-icons/fi';

export function BoardPreview({ board, loggedInUser, toggleStarBoard, isYellow, isLarge }) {
    return (
        <Link to={`/boards/${board._id}`}>
            <div className="board-preview" style={board.boardStyle}>
                {(board.boardStyle.bgImgUrl) ? <div className="darken-image"></div> : <></>}
                <div className="preview-details flex direction-col space-between">
                    <h3 className="board-title">{board.boardTitle}</h3>
                    <div className="board-preview-bottom">
                        {(board.createdBy) ?
                            <>
                                {(board.createdBy._id !== loggedInUser._id) ?
                                    <p className="board-owner">{board.createdBy.fullname}'s board</p> : <></>}
                                {<button className={`star-btn ${board.isStarred ? "show" : ""}`} onClick={(ev) => toggleStarBoard(ev, board)}>
                                    <IconContext.Provider value={{ className: `star-icon ${isYellow ? "yellow" : ""} ${isLarge ? "large" : ""}` }}>
                                        <FiStar />
                                    </IconContext.Provider>
                                </button>}
                            </>
                            :
                            <></>}
                    </div>
                </div>
            </div>
        </Link>
    )
}