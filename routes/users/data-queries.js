'use strict'

module.exports = {
    selectUsers,
    insertUser,
}
const db = require('../../middleware/database/db')
const tableName = 'users'

async function selectUsers(query) {
    let users = await db.getObjectsFromDatabase(tableName)
    if (query.ageIsGraterThen) {
        users = users.filter(user => user.age >= query.ageIsGraterThen)
    }
    if (query.ageIsLowerThen) {
        users = users.filter(user => user.age <= query.ageIsLowerThen)
    }
    return users
}

function insertUser(user) {
    return db.insertObjectToDatabase(tableName, user)
}

