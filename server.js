if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const indexRoute = require('./routes/index')
const authorRoute = require('./routes/author')
const bookRoute = require('./routes/book')

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRoute)
app.use('/authors', authorRoute)
app.use('/books', bookRoute)
app.use(methodOverride('_method'))

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})