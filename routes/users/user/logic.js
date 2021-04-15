'use strict'

module.exports = {
    getUser,
    deleteUser,
    updateUser
}
const queries = require('./data-queries')

function getUser(id) {
    return queries.selectUser(id)
}

function deleteUser(id) {
    return queries.deleteUser(id)
}

function updateUser(user, id) {
    user.id = id
    return queries.updateUser(user)
}

