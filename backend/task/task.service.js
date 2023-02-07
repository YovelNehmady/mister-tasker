const dbService = require('../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query() {
    try {
        const collection = await dbService.getCollection('task')
        var tasks = await collection.find().toArray()
        return tasks
    } catch (err) {
        throw err
    }
}

async function getById(taskId) {
    try {
        const collection = await dbService.getCollection('task')
        const task = collection.findOne({ _id: new ObjectId(taskId) })
        return task
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function remove(taskId) {
    try {
        const collection = await dbService.getCollection('task')
        await collection.deleteOne({ _id: new ObjectId(taskId) })
        return taskId
    } catch (err) {
        throw err
    }
}

async function add(task) {
    try {
        const collection = await dbService.getCollection('task')
        await collection.insertOne(task)
        return task
    } catch (err) {
        throw err
    }
}

async function update(task) {
    try {

        let taskToEdit = {
            status: task.status,
            doneAt: task.doneAt,
            errors: task.errors,
            lastTriedAt: task.lastTriedAt,
            triesCount: task.triesCount,
        }
        const collection = await dbService.getCollection('task')
        await collection.updateOne({ _id: new ObjectId(task._id) }, { $set: taskToEdit })
        return task
    } catch (err) {
        throw err
    }
}


module.exports = {
    remove,
    query,
    getById,
    add,
    update
}
