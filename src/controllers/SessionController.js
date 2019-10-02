//index, show, store, update, destroy

const User = require('../models/User')

class SessionController {
  async store(req, res) {
    const { email } = req.body

    try {
      const user = await User.create({ email })
      return res.status(201).json(user)
    } catch (error) {
      return res.status(400).json({ code: 400, msg: 'Duplicated email' })
    }
  }
}

module.exports = new SessionController()
