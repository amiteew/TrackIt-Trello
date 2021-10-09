import Divider from '@mui/material/Divider';
import { utilService } from '../../../services/util.service';
import { ShowMenu } from '../../ShowMenu';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { BsArchive } from "react-icons/bs";

export function MainBoardMenuContent({ board, changeMenu }) {
    const bgStyle = utilService.getFormattedBgStyle(board.boardStyle)
    return (
        <>
            <div className="board-actions">
                <button className="menu-action-btn" onClick={() => changeMenu('Change Background', 'select-bg-type')}>
                    <span className="change-bg-preview" style={bgStyle}></span>
                    Change background
                </button>
                <button className="menu-action-btn search flex align-center" onClick={() => changeMenu('Search cards', 'search')}>
                    <span className="search-cards-icon"><SearchSharpIcon /></span>
                    <span className="search-cards-txt"> Search cards </span>
                </button>
                <button className="menu-action-btn archive" onClick={() => changeMenu('Archived', 'archive')}>
                    <span className="archive-icon"><BsArchive /></span>
                    <span className="archive-txt">Archived items</span>
                </button>
            </div>
            <Divider />
            <div className="activities">
                <ShowMenu board={board} />
            </div>
        </>
    )
}