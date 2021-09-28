import { DynamicPopover } from './DynamicPopover';

export function CardDetailsHeader({ board, currListIdx, currCardIdx, handleClose }) {
    const currCard = board.lists[currListIdx].cards[currCardIdx]
    const coverMode = currCard.cardStyle.id ? 'cover-mode ' + currCard.cardStyle.color : '';
    return (
        <div className={coverMode} >
            <div className="close-window-btn pointer" onClick={handleClose}>X</div>
           {coverMode && <div className="cover-menu pointer">
                <DynamicPopover type={'cover'} title={'Cover'} titleModal={'Cover'}
                    board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                />
            </div>}
        </div>
    )
}