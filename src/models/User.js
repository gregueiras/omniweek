const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: String,
})

export default mongoose.model('User', userSchema)
