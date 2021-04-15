'use strict'

module.exports = {
    selectMatches,
    addMatch,
    deleteMatch
}

const db = require('../../../../middleware/database/db')
const tableName = 'users'

async function selectMatches(objId) {
    const user = await db.getObjectFromDatabase(tableName,objId)
    return user.matches
}

async function addMatch(objId,newMatch) {
    const user = await db.getObjectFromDatabase(tableName,objId)
    if(!user.matches) {
        user.matches = [newMatch]
    } else {
        user.matches.push(newMatch)
    }
    await db.updateObjectInDatabase(tableName,user)
}

async function deleteMatch(objId,oldMatch) {
    const user = await db.getObjectFromDatabase(tableName,objId)
    try {
        user.matches = user.matches.filter(user => user.id !== oldMatch)
    } catch (e) {
        console.log(e)
        return
    }
    await db.updateObjectInDatabase(tableName,user)
}