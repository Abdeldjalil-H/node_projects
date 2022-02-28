const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find()
    res.status(200).json({ success: true, tasks })
})

const getTask = asyncWrapper(async (req, res, next) => {
    const { id } = req.params
    const task = await Task.findById(id)
    if (!task) {
        return next(createCustomError(`no task with id ${id}`, 404))
    }
    return res.status(200).json({ success: true, task })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ success: true, task: task })
})

const updateTask = asyncWrapper(async (req, res, next) => {
    const { id } = req.params
    const task = await Task.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })

    if (!task) {
        return next(createCustomError(`no task with id ${id}`, 404))
    }
    return res.status(200).json({ success: true, task })
})

const deleteTask = asyncWrapper(async (req, res, next) => {
    const { id } = req.params
    const task = await Task.findByIdAndDelete(id)

    if (!task) {
        return next(createCustomError(`no task with id ${id}`, 404))
    }
    return res.status(200).json({ success: true, task })
})

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask }