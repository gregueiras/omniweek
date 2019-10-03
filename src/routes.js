const express = require('express')
const multer = require('multer')

const uploadConfig = require('./config/upload')
const SessionController = require('./controllers/SessionController')
const SpotController = require('./controllers/SpotController')

const upload = multer(uploadConfig)
const routes = express.Router()

routes.get('/sessions', SessionController.show)
routes.post('/sessions', SessionController.store)

routes.get('/spots', SpotController.show)
routes.post('/spots', upload.single('thumbnail'), SpotController.store)

routes.get('/', (req, res) => res.json({ msg: 'hello World' }))

module.exports = routes
