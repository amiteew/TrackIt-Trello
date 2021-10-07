const boardService = require('./board.service.js');
const logger = require('../../services/logger.service');

// GET Boards
async function getBoards(req, res) {
  try {
    var userId = req.query;
    const boards = await boardService.query(userId)
    res.json(boards);
  } catch (err) {
    logger.error('Failed to get boards', err)
    res.status(500).send({ err: 'Failed to get boards' })
  }
}

// GET BY ID 
async function getBoardById(req, res) {
  try {
    const boardId = req.params.id;
    const filterBy = req.query;
    let board = await boardService.getById(boardId)
    // console.log('filterby', filterBy);
    board = _filterBoard(filterBy, board);
    res.json(board)
  } catch (err) {
    logger.error('Failed to get board', err)
    res.status(500).send({ err: 'Failed to get board' })
  }
}

// POST (add board)
async function addBoard(req, res) {
  try {
    const board = req.body;
    const addedBoard = await boardService.save(board)
    res.send(addedBoard)
  } catch (err) {
    logger.error('Failed to add board', err)
    res.status(500).send({ err: 'Failed to add board' })
  }
}

// DELETE BOARD
async function removeBoard(req, res) {
  try {
    const boardId = req.params.id;
    const removedId = await boardService.remove(boardId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove board', err)
    res.status(500).send({ err: 'Failed to remove board' })
  }
}

// PUT (Update board)
async function updateBoard(req, res) {
  try {
    const board = req.body
    let savedBoard = await boardService.save(board)
    // savedBoard = _LimitActivities(savedBoard) //Avoiding Data leak - Board Object too large
    // if (board.activities[0].isNotif) socketService.emit('resieve notification');
    res.send(savedBoard)
  } catch (err) {
    console.log(err)
    logger.error('Failed to update board', err)
    res.status(500).send({ err: 'Failed to update board' })
  }
}

function _filterBoard(filterBy, board) {
  // console.log('before', filterBy);
  // filterBy = JSON.stringify(filterBy)
  const newFilterBy = JSON.parse(filterBy.filterBy)
  if (!newFilterBy.isFilter) return board

  console.log('filterBy.searchKey', newFilterBy)

  const regex = new RegExp(newFilterBy.searchKey, 'i');
  board.lists.forEach(list => {
    list.cards = list.cards.filter(card => {
      let isMemberOnCard = true
      let isLabelsOnCard = true

      if (newFilterBy.members.length) {
        isMemberOnCard = newFilterBy.members.some(filterMember => card.cardMembers.some(cardMember => filterMember === cardMember._id))

      }

      if (newFilterBy.labels.length) {
        isLabelsOnCard = newFilterBy.labels.some(filterLabel => card.cardLabels.some(cardLabel => filterLabel._id === cardLabel._id))
      }

      const isTxtOnCard = regex.test(card.cardTitle)

      return isTxtOnCard && isMemberOnCard && isLabelsOnCard
    })
  })
  // console.log('board', board);

  return board
}

// function _LimitActivities(board) {
//   if (board.activities.length > 20) {
//     console.log('activities', board.activities.length)
//     board.activities.splice(19)
//     console.log('activities', board.activities.length)

//     // console.log('activities', board.activities);
//   }
//   return board;
// }

module.exports = {
  getBoards,
  getBoardById,
  addBoard,
  removeBoard,
  updateBoard
}