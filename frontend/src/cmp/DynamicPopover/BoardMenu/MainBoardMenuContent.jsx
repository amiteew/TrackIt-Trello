import Divider from '@mui/material/Divider';
import { utilService } from '../../../services/util.service';
import { ShowMenu } from '../../ShowMenu';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

export function MainBoardMenuContent({ board, changeMenu }) {
    const bgStyle = utilService.getFormattedBgStyle(board.boardStyle)
    return (
        <>
            <div className="board-actions">
                <button className="menu-action-btn" onClick={() => changeMenu('Change Background', 'select-bg-type')}>
                    <span className="change-bg-preview" style={bgStyle}></span>
                    Change background
                </button>
                <button className="menu-action-btn" onClick={() => changeMenu('Search cards', 'search')}>
                    <span className="search-cards"> <SearchSharpIcon /></span>
                    <span> Search cards </span>
                </button>
            </div>
            <Divider />
            <div className="activities">
                <ShowMenu board={board} />
            </div>
        </>
    )
}