const boardService = require('./board.service.js');
const logger = require('../../services/logger.service');

// GET Boards
async function getBoards(req, res) {
    try {
        var userId = req.query; 
        console.log('req query', userId);
               
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
    const board = await boardService.getById(boardId)
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
      const savedBoard = await boardService.save(board)
      res.send(savedBoard)
  } catch (err) {
      console.log(err)
      logger.error('Failed to update board', err)
      res.status(500).send({ err: 'Failed to update board' })
  }
}

module.exports = {
    getBoards,
    getBoardById,
    addBoard,
    removeBoard,
    updateBoard
}