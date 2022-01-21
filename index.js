
require('dotenv').config()
require('express-async-errors')

const path = require('path')
const express = require('express')
const app = express()
//routes 
const route = require('./src/routes')

const notFoundMiddleware = require('./src/middleware/not-found')
const errorHandlerMiddleware = require('./src/middleware/error-handler')

// connect db
const connect = require('./src/db/connectDB')

const port = process.env.PORT || 3000

// console.log('path:', path.join(__dirname))
app.use(express.static(path.join(__dirname, './src/public')))
app.use(express.json())

//routes 
route(app)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
   try {
      // connect to db
      await connect(process.env.MONGO_URI)
      console.log('Connect to db successfully!!!')
      //connect to server
      app.listen(port, () => {
         console.log(`Sever listen on ${port}...`)
      })
   } catch (error) {
      console.log(error)
   }
}
start()