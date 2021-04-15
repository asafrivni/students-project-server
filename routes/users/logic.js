'use strict'

module.exports = {
    getUsers,
    addUser,
}
const queries = require('../users/data-queries')

function getUsers(query) {
    return queries.selectUsers(query)
}

function addUser(user) {
    user.matches = []
    user.userId = Date.now()
    return queries.insertUser(user)
}
