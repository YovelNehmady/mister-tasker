const { execute } = require('../services/external.service.js')
const taskService = require('./task.service.js')

async function gettasks(req, res) {
  try {
    const tasks = await taskService.query()
    res.json(tasks)
  } catch (err) {
    res.status(500).send({ err: 'Failed to get tasks' })
  }
}

async function gettaskById(req, res) {
  try {
    const taskId = req.params.id
    const task = await taskService.getById(taskId)
    res.json(task)
  } catch (err) {
    res.status(500).send({ err: 'Failed to get task' })
  }
}

async function addtask(req, res) {
  try {
    const task = req.body
    const addedtask = await taskService.add(task)
    res.json(addedtask)
  } catch (err) {
    res.status(500).send({ err: 'Failed to add task' })
  }
}

async function updatetask(req, res) {
  try {
    const task = req.body
    const updatedtask = await taskService.update(task)
    res.json(updatedtask)
  } catch (err) {
    res.status(500).send({ err: 'Failed to update task' })
  }
}

async function removetask(req, res) {
  try {
    const taskId = req.params.id
    const removedId = await taskService.remove(taskId)
    res.send(removedId)
  } catch (err) {
    res.status(500).send({ err: 'Failed to remove task' })
  }
}

async function performTask(req, res) {
  const task = req.body
  try {
    task.status = 'running'
    await taskService.update(task)
    
    await execute(task)
    
    task.status = 'done'
    task.doneAt = Date.now()
    await taskService.update(task)
    console.log('try',task);

  } catch (error) {
    
    task.status = 'failed'
    task.errors.push(error)
    await taskService.update(task)
    console.log('catch',task);

  } finally {
    
    task.lastTriedAt = Date.now()
    task.triesCount++
    const taskAfterExcute = await taskService.update(task)
    console.log('fainely',taskAfterExcute)
    res.send(taskAfterExcute)
  }
}

module.exports = {
  gettasks,
  gettaskById,
  addtask,
  updatetask,
  removetask,
  performTask
}
