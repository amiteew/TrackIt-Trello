const express = require('express')
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
// const {log} = require('../../middlewares/logger.middleware')
const {getBords} = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getBoards)
// router.post('/',  log, requireAuth, addReview)
// router.delete('/:id',  requireAuth, deleteReview)

module.exports = router