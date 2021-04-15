'use strict'

const router = require('express-promise-router')({
    mergeParams: true
})

router.use('/users', require('./users'))

module.exports = router