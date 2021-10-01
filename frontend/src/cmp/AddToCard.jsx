import { DynamicPopover } from './DynamicPopover';
import { JoinCard } from './CardDetails/JoinCard';
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export function AddToCard({ board, currListIdx, currCardIdx, OnUpdateBoard }) {
    const currCard = board.lists[currListIdx].cards[currCardIdx]
    return (
        <div className="add-to-card">
            <JoinCard board={board}
                currListIdx={currListIdx}
                currCardIdx={currCardIdx} />
            <h4>ADD TO CARD</h4>
            <div className="btn-container">
                <DynamicPopover type={'members'} title={'Members'} titleModal={'Members'}
                    board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                />
                <DynamicPopover type={'labels'} title={'Labels'} titleModal={'Labels'}
                    board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                />
                <DynamicPopover type={'checklist'} title={'Checklist'} titleModal={'Add checklist'}
                    board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                />
                <DynamicPopover type={'dates'} title={'Dates'} titleModal={'Dates'}
                    board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                />
                {!currCard.cardStyle.id && <DynamicPopover type={'cover'} title={'Cover'} titleModal={'Cover'}
                    board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                />}
            </div>
        </div>
    )
}