const express = require('express')

const router = express.Router()

const { getTasks, getTask, createTask, updateTask, deleteTask } = require('../controllers/tasks')

router.get('/', getTasks)

router.use(express.json())
router.post('/', createTask)
router.route('/:id')
    .get(getTask)
    .delete(deleteTask)
    .patch(updateTask)
module.exports = router