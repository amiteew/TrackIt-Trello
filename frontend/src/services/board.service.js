// import { httpService } from './http.service'
import { storageService } from './async-storage.service'
// import {userService} from './user.service'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED } from './socket.service'

export const boardService = {
  add,
  query,
  remove
}


function query() {
  // return httpService.get(`board${queryStr}`)
  let boards = storageService.query('board')
  if (!boards.length) {
    boards = require('../data/board.json');
    storageService.save('board', boards)
  }
  return boards;
}

function remove(boardId) {
  // return httpService.delete(`board/${boardId}`)
  return storageService.remove('board', boardId)

}
async function add(board) {
  // const addedBoard = await httpService.post(`board`, board)

  // board.byUser = userService.getLoggedinUser()
  // board.aboutUser = await userService.getById(board.aboutUserId)
  const addedBoard = storageService.post('board', board)
  return addedBoard
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

