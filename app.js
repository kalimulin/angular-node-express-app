const express = require('express')
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/auth')
const orderRoutes = require('./routes/auth')
const positionRoutes = require('./routes/auth')
const app = express()

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

module.exports = app