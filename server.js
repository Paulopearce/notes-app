const express = require('express')
const app = express()
const { join } = require('path')

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//use all routes in routes
app.use(require('./routes'))

app.listen(process.env.PORT || 3000)