'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const port = 3000

app.use(cors())
app.use(bodyParser.json())

app.get('/ping', (req, res) => {
    res.send('pong')
})

app.use('/', require('./routes'))

_useErrorMiddlewares()

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

function _useErrorMiddlewares() {
    app.use((err, req, res, next) => {
        // request aborted handler
        if (err.status === 400 && err.code === 'ECONNABORTED') {
            return res.status(err.status).json({
                error: err
            })
        }

        if (err.name !== 'JsonSchemaValidation') {
            return next(err);
        }

        res.status(400).json({
            statusText: 'Bad Request',
            jsonSchemaValidation: true,
            errors: err.validations  // All the validation information
        })
    })
}
