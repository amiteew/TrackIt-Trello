
//Frontend
export function updateBoard(board, action = null, card = '', txt = "") {
    return async dispatch => {
        try {
            if (action) {
                var activity = _storeSaveActivity(action, card, txt);
                board.activities.unshift(activity);
            }
            dispatch({ type: 'UPDATE_BOARD', board: { ...board } });
            await boardService.save(board);
            dispatch({ type: 'UPDATE_LAST_UPDATED_BOARD' }); // Ask asaf
            socketService.emit('update-board', board);
        } catch (err) {
            dispatch({ type: 'UNDO_UPDATE_BOARD' });
            showErrorMsg('Sorry cannot update board')
        }
    }
}

//Beckend
socket.on('update-board', board => {
    socket.broadcast.to(socket.myTopic).emit('board updated', board) 
    if (board.activities[0].isNotif) {
        socket.broadcast.to(socket.myTopic).emit('sending notification', true)
    }

})

