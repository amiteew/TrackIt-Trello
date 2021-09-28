import { boardService } from '../services/board.service'
// import { socketService, SOCKET_EVENT_BOARD_ADDED } from '../services/socket.service'
import { userService } from '../services/user.service'
import { utilService } from '../services/util.service.js'

export function loadBoards(userId) {
  return async dispatch => {
    try {
      const boards = await boardService.query(userId)
      dispatch({ type: 'SET_BOARDS', boards })
      // socketService.on(SOCKET_EVENT_BOARD_ADDED, (board) =>{
      //   dispatch({ type: 'ADD_BOARD', board })
      // })

    } catch (err) {
      console.log('BoardActions: err in loadBoards', err)
    }
  }
}

export function loadBoard(boardId) {
  return async dispatch => {
    try {
      const board = await boardService.getBoardById(boardId)
      dispatch({ type: 'SET_BOARD', board })
      // socketService.on(SOCKET_EVENT_BOARD_ADDED, (board) =>{
      //   dispatch({ type: 'ADD_BOARD', board })
      // })

    } catch (err) {
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
      const addedBoard = await boardService.add(board)
      dispatch({ type: 'ADD_BOARD', board: addedBoard })

    } catch (err) {
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
      console.log('BoardActions: err in removeBoard', err)
    }
  }
}

// when we move to backend this function will check if the board has 'createBy'
// if not- it's a template and it should only update the store, NOT the server!
export function updateBoard(board, action, card, txt = "") {
  return async dispatch => {
    try {
      const activity = _storeSaveActivity(txt, action, card);
      board.activities.unshift(activity);
      await boardService.save(board);
      dispatch({ type: 'UPDATE_BOARD', board:{...board}});
    } catch (err) {
      console.log('BoardActions: err in updateBoard', err);
    }
  }
}

function _storeSaveActivity(txt, action, card) {
  const cardCopy = { ...card } // MAYBE WE DONT NEED IT
  const activity = {
    id: utilService.makeId(),
    txt,
    createdAt: Date.now(),
    byMember: userService.getLoggedinUser(),
    action,
    card: { cardId: cardCopy.cardId, cardTitle: cardCopy.cardTitle }
  }
  return activity
}



