const mongoose = require('mongoose')
const app = require('./app')

const PORT = process.env.PORT || 3000

mongoose.connect(
  `mongodb+srv://omniweek:${process.env.MONGO_PASS}@omnistack-15q4n.mongodb.net/${process.env.COLLECTION}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
)

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`)
  console.log(process.env.NODE_ENV)
})
