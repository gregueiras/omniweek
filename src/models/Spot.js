const mongoose = require('mongoose')

const spotSchema = new mongoose.Schema({
  company: { type: String, unique: true },
  techs: { type: [String] },
  price: { type: Number },
  thumbnail: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

module.exports = mongoose.model('Spot', spotSchema)
