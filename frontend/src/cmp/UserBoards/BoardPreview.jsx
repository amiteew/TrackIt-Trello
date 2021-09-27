// import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiStar } from 'react-icons/fi';

export function BoardPreview({ boardInfo, loggedInUser, toggleStarBoard }) {
    return (
        <Link to={`/boards/${boardInfo.boardId}`}>
            <div className="board-preview">
                <h3 className="board-title">{boardInfo.boardTitle}</h3>
                <div>
                    {(boardInfo.createdBy && boardInfo.createdBy._id !== loggedInUser._id) ?
                        <p className="board-owner">{boardInfo.createdBy.fullname}' board</p> : <></>}
                    {<button className={`star ${boardInfo.isStarred ? "yellow" : ""}`} onClick={toggleStarBoard}>
                        <FiStar />
                    </button>}
                </div>
            </div>
        </Link>
    )
}