const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(userId) {
    try {
        // const criteria = _buildCriteria(filterBy)        
        // criteria = {boardMembers}
        const collection = await dbService.getCollection('board')
        var boards = await collection.find({ "boardMembers._id" :"u103"}).toArray()
        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }
}

async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = collection.findOne({ '_id': ObjectId(boardId) })
        return board
    } catch (err) {
        logger.error(`while finding board ${boardId}`, err)
        throw err
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.deleteOne({ '_id': ObjectId(boardId) })
        return boardId
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}

async function save(board) {
    const { boardTitle, createdBy, boardStyle, covers, labels, boardMembers, lists, activities } = board;
    let savedBoard;
    if (board._id) {
        try {
            savedBoard = {
                _id: ObjectId(board._id),
                boardTitle,
                createdBy,
                boardStyle,
                covers,
                labels,
                boardMembers,
                lists,
                activities
            }
            const collection = await dbService.getCollection('board')
            await collection.updateOne({ "_id": savedBoard._id }, { $set: { ...savedBoard } })
            return savedBoard
        } catch (err) {
            logger.error(`cannot update board`, err)
            throw err
        }
    } else {
        try {
            // savedBoard = {
            //     createdAt: ObjectId(board._id).getTimestamp(),
            //     boardTitle: board.boardTitle,
            //     createdBy: board.createdBy,
            //     boardStyle: board.boardStyle,
            //     covers: board.covers,
            //     labels: [],
            //     boardMembers: board.boardMembers,
            //     lists: [],
            //     activities: []
            // }

            const collection = await dbService.getCollection('board')
            await collection.insertOne(board)
            return board
        } catch (err) {
            logger.error('cannot add board', err)
            throw err
        }
    }

}

module.exports = {
    query,
    getById,
    // add,
    remove,
    save
}
