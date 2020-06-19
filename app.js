require('dotenv').config()
const helmet = require('helmet')
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require("passport");
const passportSetup = require("./src/middlewares/passportgoogle.js");

const apis= require('./src/api_es/api')

mongoose.set('useUnifiedTopology', true)
mongoose.set('useNewUrlParser', true)
mongoose.connect(process.env.mongoose_URI,{ autoIndex: false })
.then(() => console.log('DB connected'))
.catch((err) => console.error('err', err))

const app = express()

if (process.env.NOD_ENV !== 'test') {
  app.use(morgan('dev'))
}
app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true,
}))
app.use(bodyParser.json())
app.use(passport.initialize());

app.use('/api', apis)

app.use((req, res, next) => {
  const error = new Error('Request Not Found')
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
  })
})

module.exports = app
