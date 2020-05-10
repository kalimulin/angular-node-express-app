const express = require('express')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/auth')
const orderRoutes = require('./routes/auth')
const positionRoutes = require('./routes/auth')
const mongoose = require("mongoose")

const app = express()

// connect to DB
mongoose.connect(require('./config/keys').mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", () => {
  console.log("mongoose is connected")
})

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

module.exports = app