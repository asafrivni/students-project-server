'use strict'

module.exports = {
    deleteUser,
    updateUser,
    selectUser
}

const db = require('../../../middleware/database/db')
const tableName = 'users'

function selectUser(objId) {
    return db.getObjectFromDatabase(tableName,objId)
}

function deleteUser(id) {
    return db.removeObjectFromDatabase(tableName, id)
}

function updateUser(user) {
    return db.updateObjectInDatabase(tableName, user)
}