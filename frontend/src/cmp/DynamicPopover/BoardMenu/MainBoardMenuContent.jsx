import Divider from '@mui/material/Divider';
import { ShowMenu } from '../../ShowMenu';

export function MainBoardMenuContent({ board, changeMenu }) {
    return (
        <>
            <div className="board-actions">
                <button className="menu-action-btn" onClick={()=> changeMenu('Change Background', 'select-bg-type')}>
                    <span className="change-bg-preview" style={board.boardStyle}></span>
                    Change background
                </button>
            </div>
            <Divider />
            <div className="activities">
                <ShowMenu board={board} />
            </div>
        </>
    )
}