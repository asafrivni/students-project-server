'use strict'

const router = require('express-promise-router')({
        mergeParams: true
    }),
    logic = require('./logic')

router.get('/', async (req, res) => {
    const result = await logic.getUser(Number(req.params.id))
    res.status(200).json({result})
})

router.put('/', async (req, res) => {
    const result = await logic.updateUser(req.body.user, Number(req.params.id))
    res.status(200).json({result})
})

router.delete('/', async (req, res) => {
    const result = await logic.deleteUser(Number(req.params.id))
    res.status(200).json({result})
})

router.patch('/', async (req, res) => {
    const result = await logic.updateUser(req.body, Number(req.params.id))
    res.status(200).json({result})
})

router.use('/matches', require('./matches'))

module.exports = router