require('dotenv').config()
const mongoose = require('mongoose')

const dbURI = process.env.CONNECTION_STRING

mongoose
  .connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Connection error', error)

    process.exit(1)
  })
