const express = require('express')
const dontenv = require('dotenv').config()
const connectDb = require('./config/dbconnection')
const errorHandler = require('./middleware/errorHandler')
var cors = require('cors')

const app = express()
const port = process.env.PORT || 3001

app.use(
  cors({
    origin: ['http://localhost:5174', 'http://localhost:5175'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))
app.use('/api', require('./routes/productRoutes'))
app.use('/api', require('./routes/cartRoutes'))

app.use(errorHandler)

app.listen(port, () => {
  console.log(`server is running on ${port}`)
})
