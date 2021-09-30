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

function query(userId) {
  // this function saves the whole DB locally, but sends only the user boards to the store
  // when we move to backend the server will filter and return only the user boards 
  // the frontend query will simply return it to the store...
  return storageService.query(BOARD_KEY)
  .then((boards) => {
    if (!boards.length) {
      boards = require('../data/boards.json');
      storageService.save(BOARD_KEY, boards)
    }
    const userBoards = boards.filter(board =>
      (!board.createdBy || board.boardMembers.some(member => member._id === userId)) //change in json to "id"?
      )
      // console.log('usrBrds:', userBoards);
      return userBoards
    })
    // return httpService.get(`boards/${userId}`)
    // return httpService.get(`board${queryStr}`)
}

// function query2() {
//   // return httpService.get(`board${queryStr}`)
//   return storageService.query(BOARD_KEY)
//     .then((boards) => {
//       if (!boards.length) {
//         boards = require('../data/board.json');
//         storageService.save(BOARD_KEY, boards)
//       }
//       return boards
//     })
// }


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
    // console.log('board in service.save', board);
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

