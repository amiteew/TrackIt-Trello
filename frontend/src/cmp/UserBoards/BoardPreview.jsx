// import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { IconContext } from "react-icons";
import { FiStar } from 'react-icons/fi';

export function BoardPreview({ boardInfo, loggedInUser, toggleStarBoard, isYellow, isLarge }) {
    return (
        <Link to={`/boards/${boardInfo.boardId}`}>
            <div className="board-preview flex direction-col space-between">
                <h3 className="board-title">{boardInfo.boardTitle}</h3>
                <div className="board-preview-bottom">
                    {(boardInfo.createdBy) ?
                        <>
                            {(boardInfo.createdBy._id !== loggedInUser._id) ?
                                <p className="board-owner">{boardInfo.createdBy.fullname}' board</p> : <></>}
                            {<button className={`star-btn ${boardInfo.isStarred ? "show" : ""}`} onClick={toggleStarBoard}>
                                <IconContext.Provider value={{ className: `star-icon ${isYellow ? "yellow" : ""} ${isLarge ? "large" : ""}` }}>
                                    <FiStar />
                                </IconContext.Provider>
                            </button>}
                        </>
                        :
                        <></>}
                </div>
            </div>
        </Link>
    )
}