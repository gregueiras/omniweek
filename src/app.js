require('dotenv').config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
})

const express = require('express')
const mongoose = require('mongoose')

mongoose.connect(
  `mongodb+srv://omniweek:${process.env.MONGO_PASS}@omnistack-15q4n.mongodb.net/${process.env.COLLECTION}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
)

class AppController {
  constructor() {
    this.express = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.express.use(express.json())
  }

  routes() {
    this.express.use(require('./routes'))
  }
}

module.exports = new AppController().express
