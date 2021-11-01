require('dotenv/config')
const mongoose = require('mongoose')
const user = process.env.USER_DB
const pass = process.env.PASS_DB
const host = process.env.HOST_DB
const nameDb = process.env.NAME_DB

mongoose.connect(
  `mongodb+srv://${user}:${pass}@${host}/${nameDb}?retryWrites=true&w=majority`
)

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected')
})

module.exports = mongoose
