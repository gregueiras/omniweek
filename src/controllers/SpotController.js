//index, show, store, update, destroy

const Spot = require('../models/Spot')
const User = require('../models/User')

module.exports = {
  async store(req, res) {
    const { body, file, headers } = req

    const { filename } = file
    const { company, techs, price } = body
    const { user_id } = headers

    try {
      await User.findOne({ _id: user_id }).orFail(new Error('No user with provided ID'))

      const spot = await Spot.create({
        company,
        price,
        user: user_id,
        thumbnail: filename,
        techs: techs.split(',').map(tech => tech.trim()),
      })

      return res.status(201).json(spot)
    } catch (error) {
      return res.status(400).json({ code: 400, msg: error.message })
    }
  },

  async show(req, res) {
    const { body } = req

    const { company } = body

    try {
      const spot = await Spot.findOne({ company }).orFail(new Error('No Spot with provided company'))

      return res.status(200).json(spot)
    } catch (error) {
      return res.status(400).json({ code: 400, msg: error.message })
    }
  },
}
