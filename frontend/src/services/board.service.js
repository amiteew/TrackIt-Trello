import { httpService } from './http.service'
import { storageService } from './async-storage.service'

const BOARD_KEY = 'boardsDB'

export const boardService = {
  query,
  remove,
  getBoardById,
  save
}

function query(userId) {
  return httpService.get(`boards`, { userId: userId })
}

function remove(boardId) {
  // return httpService.delete(`board/${boardId}`)
  return storageService.remove(BOARD_KEY, boardId)
}

function getBoardById(boardId, filterBy = {}) {
  return httpService.get(`boards/${boardId}`, { filterBy: filterBy })
}

function save(board) {  
  if (board._id) {
    return httpService.put(`boards/${board._id}`, board);
  } else {
    return httpService.post(`boards`, board);
  }
}


