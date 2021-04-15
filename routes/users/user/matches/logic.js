'use strict'

module.exports = {
    getMatches,
    addMatch,
    deleteMatch
}
const queries = require('./data-queries')

function getMatches(id) {
    return queries.selectMatches(id)
}

function addMatch(id, newMatch) {
    return queries.addMatch(id , newMatch)
}

function deleteMatch(id, oldMatch) {
    return queries.deleteMatch(id,oldMatch)
}

