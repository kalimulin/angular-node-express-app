const express = require('express')
const authRoute = require('./routes/auth')
const app = express()

app.use('/api/auth', authRoute)

module.exports = app