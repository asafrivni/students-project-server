'use strict'

module.exports = {
    getObjectsFromDatabase,
    getObjectFromDatabase,
    insertObjectToDatabase,
    updateObjectInDatabase,
    removeObjectFromDatabase
}
const fs = require('fs').promises;


const noTableErr = 'No such table in the database.'
const objNotFoundErr = 'Object not found'

function getObjectsFromDatabase(tableName) {
    return readFromDb(tableName)
}

function getObjectFromDatabase(tableName, objId) {
    return searchObjById(objId, tableName)
}

async function insertObjectToDatabase(tableName, obj) {
    const db = await readFromDb(tableName)
    db.push(obj)
    await writeToDatabase(tableName, db)
    return obj
}

async function removeObjectFromDatabase(tableName, id) {
    let db = await readFromDb(tableName)
    let result = undefined
    const sizeBefore = db.length
    db = db.filter(o => o.userId !== id)
    if (db.length === sizeBefore) {
        result = {msg: objNotFoundErr}
    } else {
        await writeToDatabase(tableName, db)
        result = {msg: 'Deleted successfully'}
    }
    return result
}

async function updateObjectInDatabase(tableName, obj) {
    const db = await readFromDb(tableName)
    const index = db.findIndex(o => o.userId === obj.userId)
    let result = undefined
    if (index !== -1) {
        Object.assign(db[index], obj)
        await writeToDatabase(tableName, db)
        result = db[index]
    } else {
        result = {msg: objNotFoundErr}
    }
    return result
}

async function searchObjById(objId, tableName) {
    const db = await readFromDb(tableName)
    let result = undefined
    for (let obj of db) {
        if (obj.userId === objId) {
            result = obj
        }
    }
    if (!result) {
        result = {msg: objNotFoundErr}
    }
    return result
}

async function readFromDb(tableName) {
    let data = undefined
    try {
        data = await fs.readFile(`${__dirname}\\db.txt`, {encoding: 'utf8'})
        data = JSON.parse(data)
    } catch (e) {
        return {msg: 'Failed to load from db'}
    }
    const table = data[tableName]
    return (table) ? table : {msg: noTableErr}
}

async function writeToDatabase(tableName, newData) {
    let data = undefined
    try {
        data = await fs.readFile(`${__dirname}\\db.txt`, {encoding: 'utf8'})
        data = JSON.parse(data)
    } catch (e) {

    }
    data[tableName] = newData
    data = JSON.stringify(data)
    try {
        await fs.writeFile(`${__dirname}\\db.txt`, data, {encoding: 'utf8', flag: 'w'})
    } catch (e) {
        return {msg: 'Failed to write to db'}
    }
}
