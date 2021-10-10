import { boardService } from '../services/board.service'
import { emitToUser, socketService } from '../services/socket.service'
// import { socketService, SOCKET_EVENT_BOARD_ADDED } from '../services/socket.service'
import { userService } from '../services/user.service'
import { utilService } from '../services/util.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service';
import { storageService } from '../services/storage.service';

export function loadBoards(userId) {
  return async dispatch => {
    try {
      const boards = await boardService.query(userId)
      dispatch({ type: 'SET_BOARDS', boards })
      // socketService.on(SOCKET_EVENT_BOARD_ADDED, (board) =>{
      //   dispatch({ type: 'ADD_BOARD', board })
      // })

    } catch (err) {
      showErrorMsg('Sorry cannot load boards')
      console.log('BoardActions: err in loadBoards', err)
    }
  }
}

export function loadBoard(boardId) {
  return async dispatch => {
    try {
      const board = !boardId ? null : await boardService.getBoardById(boardId)
      dispatch({ type: 'SET_BOARD', board: { ...board } })
      // socketService.on(SOCKET_EVENT_BOARD_ADDED, (board) =>{
      //   dispatch({ type: 'ADD_BOARD', board })
      // })
    } catch (err) {
      showErrorMsg('Sorry cannot load board')
      console.log('BoardActions: err in loadBoards', err)
    }
  }
}

export function loadListAndCard(list, card) {
  return async dispatch => {
    try {
      dispatch({ type: 'SET_LIST', list })
      dispatch({ type: 'SET_CARD', card })

      // socketService.on(SOCKET_EVENT_BOARD_ADDED, (board) =>{
      //   dispatch({ type: 'ADD_BOARD', board })
      // })
    } catch (err) {
      console.log('BoardActions: err in loadList', err)
    }
  }
}

export function addBoard(board) {
  return async dispatch => {
    try {
      const addedBoard = await boardService.save(board)
      dispatch({ type: 'ADD_BOARD', board: addedBoard })
      return addedBoard

    } catch (err) {
      showErrorMsg('Sorry cannot add board')
      console.log('BoardActions: err in addBoard', err)
    }
  }
}

export function removeBoard(boardId) {
  return async dispatch => {
    try {
      await boardService.remove(boardId)
      dispatch({ type: 'REMOVE_BOARD', boardId })
    } catch (err) {
      showErrorMsg('Sorry cannot remove board')
      console.log('BoardActions: err in removeBoard', err)
    }
  }
}

export function toggleLabels() {
  return dispatch => {
    dispatch({ type: 'TOGGLE_LABELS' })
  }
}

export function setFilterBy(filterBy, boardId) {
  return async dispatch => {
    try {
      dispatch({ type: 'SET_FILTER', filterBy: filterBy });
      const board = !boardId ? null : await boardService.getBoardById(boardId, filterBy)
      dispatch({ type: 'UPDATE_BOARD', board: { ...board } });
      // dispatch({ type: 'SET_BOARD', board: { ...board } })
    } catch (err) {
      console.log('Cannot update notification', err);
    }
  }

}

export function updateBoard(board, action = null, card = '', txt = "") {
  if (!board.createdBy) {
    return dispatch => {
      dispatch({ type: 'UNDO_UPDATE_BOARD' });
      showErrorMsg('Templates cannot be changed')
    }
  }

  return async dispatch => {
    try {
      if (action) {
        var activity = _storeSaveActivity(action, card, txt);
        board.activities.unshift(activity);
      }
      dispatch({ type: 'UPDATE_BOARD', board: { ...board } });
      const serviceBoard = await boardService.save(board);
      
      dispatch({ type: 'UPDATE_LAST_UPDATED_BOARD' });
      if(serviceBoard._id === board._id){
        socketService.emit('update-board', board);
        console.log('im in socket');
      }      
    } catch (err) {
      dispatch({ type: 'UNDO_UPDATE_BOARD' });
      showErrorMsg('Sorry cannot update board')
      console.log('BoardActions: err in updateBoard', err);
    }
  }
}

function _storeSaveActivity(action, card, txt) {

  // const cardCopy = { ...card } // MAYBE WE DONT NEED IT
  const activity = {
    id: utilService.makeId(),
    txt,
    createdAt: Date.now(),
    byMember: userService.getLoggedinUser(),
    action,
    card: card ? { cardId: card.cardId, cardTitle: card.cardTitle } : '',
    isNotif: false,
  }
  return _filterActionsNotif(activity)
}

function _filterActionsNotif(activity) {
  switch (activity.action) {
    // MEMBERs
    case 'Added':
    case 'Removed':
    // DUE DATE
    case 'Set due date':
    case 'Removed due date':
    case 'Changed due date':
    // CHECKLIST
    case 'Completed checklist':
    // COMMENT
    case 'Added comment':
      activity.isNotif = true
      break
    default:
      activity.isNotif = false
      break
  }
  return activity
}


export function setNotif(isNotif) {
  return async dispatch => {
    try {
      dispatch({ type: 'SET_NOTIF', isNotif: isNotif });
      isNotif ?
        dispatch({ type: 'SET_NOTIF_COUNT++' })
        : dispatch({ type: 'SET_NOTIF_COUNT', count: 0 });
    } catch (err) {
      console.log('Cannot update notification', err);
    }
  }

}

export function setUpdateLabel(labelsProps) {
  return async dispatch => {
    try {
      dispatch({ type: 'SET_LABEL', labelsProps });
    } catch (err) {
      console.log('Cannot set labels props', err);
    }
  }

}

export function setOffline(isOffline) {
  return async dispatch => {
    try {
      dispatch({ type: 'SET_OFFLINE', isOffline });
    } catch (err) {
      console.log('Cannot set offline', err);
    }
  }

}

// can be deleteted:
export function setNotifCount(count) {
  return async dispatch => {
    try {
      dispatch({ type: 'SET_NOTIF_COUNT', count });
    } catch (err) {
      console.log('Cannot update notification', err);
    }
  }

}

export function setSearchBg(searchStr) {
  return async dispatch => {
    try {
      dispatch({ type: 'SET_SEARCH_BG', searchStr });
    } catch (err) {
      console.log('Cannot set search background', err);
    }
  }

}
