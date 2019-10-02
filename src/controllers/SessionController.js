//index, show, store, update, destroy

class SessionController {
  store(req, res) {
    console.log('HEy')
    return res.json({ message: 'Hello World' })
  }
}

module.exports = new SessionController()
