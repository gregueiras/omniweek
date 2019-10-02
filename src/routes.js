const express = require('express')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

console.log(SessionController)
routes.get('/', SessionController.store)

module.exports = routes
