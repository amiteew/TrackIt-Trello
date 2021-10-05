import Divider from '@mui/material/Divider';
import { ShowMenu } from '../../ShowMenu';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

export function MainBoardMenuContent({ board, changeMenu }) {
    return (
        <>
            <div className="board-actions">
                <button className="menu-action-btn" onClick={() => changeMenu('Change Background', 'select-bg-type')}>
                    <span className="change-bg-preview" style={board.boardStyle}></span>
                    Change background
                </button>
                <button onClick={() => changeMenu('Search cards', 'search')}>
                    <SearchSharpIcon />
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