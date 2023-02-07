const express = require('express')
const { removetask, updatetask, addtask, gettaskById, gettasks } = require('./task.controller')
const router = express.Router()

router.get('/', gettasks)
router.get('/:id', gettaskById)
router.post('/', addtask)
router.put('/:id', updatetask)
router.delete('/:id', removetask)

module.exports = router