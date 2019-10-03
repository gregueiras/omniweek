const multer = require('multer')
const path = require('path')

const destination = path.resolve(__dirname, '..', '..', 'uploads', process.env.NODE_ENV)

module.exports = {
  storage: multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      const name = path.basename(file.originalname, ext)

      cb(null, `${name}-${Date.now()}${ext}`)
    },
  }),
  destination,
}
