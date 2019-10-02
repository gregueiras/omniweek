const express = require('express')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/sessions', SessionController.store)

routes.get('/', (req, res) => res.json({ msg: 'hello World' }))

module.exports = routes
