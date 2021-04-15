'use strict'

const router = require('express-promise-router')({
        mergeParams: true
    }),
    logic = require('./logic')

router.get('/', async (req, res) => {
    const result = await logic.getMatches(Number(req.params.id))
    res.status(200).json({result})
})

router.post('/', async (req, res) => {
    const result = await logic.addMatch(Number(req.params.id),req.body.newMatch)
    res.status(200).json({result})
})

router.delete('/', async (req, res) => {
    const result = await logic.deleteMatch(Number(req.params.id),req.body.oldMatch)
    res.status(200).json({result})
})

module.exports = router