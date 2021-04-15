'use strict'

const router = require('express-promise-router')({
        mergeParams: true
    }),
    logic = require('./logic'),
    validate = require('express-jsonschema').validate

const querySchema = {
    query: {
        type: 'object',
        properties: {
            ageIsGraterThen: {type: ['number', 'string'], format: 'numeric', minimum: 10, maximum: 90},
            ageIsLowerThen: {type: ['number', 'string'], format: 'numeric', minimum: 10, maximum: 90}
        }
    }
}

const bodySchema = {
    body: {
        type: 'object',
        properties: {
            user: {
                type: 'object',
                properties: {
                    email: {type: 'string', minLength: 6, maxLength: 30, required: true},
                    password: {type: 'string', minLength: 6, required: true},
                    firstName: {type: 'string', format: 'alphabetic', minLength: 2, maxLength: 10, required: true},
                    lastName: {type: 'string', format: 'alphabetic', minLength: 2, maxLength: 10, required: true},
                    institution: {type: 'string', format: 'alphabetic', minLength: 5, maxLength: 50, required: true},
                    major: {type: 'string', format: 'alphabetic', minLength: 5, maxLength: 40, required: true},
                    year: {type: 'number', format: 'numeric', minimum:1 ,maximum: 7, required: true},
                    profileSet: {type: 'boolean', required: true},
                }
            }
        }
    }
}

router.get('/', validate(querySchema), async (req, res) => {
    const result = await logic.getUsers(req.query)
    res.status(200).json({result})
})

router.post('/',validate(bodySchema), async (req, res) => {
    const result = await logic.addUser(req.body.user)
    res.status(200).json({result})
})


router.use('/:id', require('./user'))

module.exports = router
