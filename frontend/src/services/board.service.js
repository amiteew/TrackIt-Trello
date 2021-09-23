// import { httpService } from './http.service'
import { storageService } from './async-storage.service'
// import { userService } from './user.service'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED } from './socket.service'

const BOARD_KEY = 'boardsDB'

export const boardService = {
  add,
  query,
  remove,
  getBoardById,
  save
}

function query() {
  // return httpService.get(`board${queryStr}`)
  let boards = storageService.query(BOARD_KEY)
  if (!boards.length) {
    boards = require('../data/board.json');
    storageService.save(BOARD_KEY, boards)
  }
  return boards
}

function remove(boardId) {
  // return httpService.delete(`board/${boardId}`)
  return storageService.remove(BOARD_KEY, boardId)

}
async function add(board) {
  // const addedBoard = await httpService.post(`board`, board)

  // board.byUser = userService.getLoggedinUser()
  // board.aboutUser = await userService.getById(board.aboutUserId)

  const addedBoard = storageService.post(BOARD_KEY, board)
  return addedBoard
}

function getBoardById(boardId) {
  return storageService.get(BOARD_KEY, boardId)
}

function save(board) {
  if (board._id) {
    return storageService.put(BOARD_KEY, board)
  } else {
    // board.owner = userService.getLoggedinUser()
    return storageService.post(BOARD_KEY, board)
  }
}

// This IIFE functions for Dev purposes 
// It allows testing of real time updates (such as sockets) by listening to storage events
// (async () => {
//   var boards = await storageService.query('board')

//   // Dev Helper: Listens to when localStorage changes in OTHER browser
//   window.addEventListener('storage', async () => {
//     console.log('Storage updated');
//     const freshBoards = await storageService.query('board')
//     if (freshBoards.length === boards.length + 1 ){
//       console.log('Board Added - localStorage updated from another browser')
//       socketService.emit(SOCKET_EVENT_REVIEW_ADDED, freshBoards[freshBoards.length-1])
//     }
//     boards = freshBoards
//   });
// })()

