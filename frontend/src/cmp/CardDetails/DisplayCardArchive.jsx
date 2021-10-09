import DeleteIcon from '@mui/icons-material/Delete';

export function DisplayCardArchive() {

    return (
        <div className="display-card-archive flex direction-row align-center">
            <DeleteIcon /> <h3>This card is Archived.</h3>
        </div>
    )
}