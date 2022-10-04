const express = require("express")
const app = express()

const path = require('path')

const PORT = process.env.PORT || 7000

//load all key-value pairs in .env file to proces.env object
require('dotenv').config()

const { initDB } = require('./dbConfig')
const cookieParser = require('cookie-parser')

//connect to DB
initDB()

//express.urlencoded() will accept the form data from the postman
app.use(express.urlencoded({ extended: true }))

//express.json() will accept the json data from the postman
app.use(express.json())

app.use(cookieParser())

//express.static('public') will accept the public file
app.use(express.static('public'))



const customerRouter = require('./routes/customers')
const userRouter = require('./routes/users')
const paymentRouter = require('./routes/payments')

// console.log(pat)
app.get("/", (req, res) => {
    let pat = path.join(__dirname)
    res.sendFile(`${pat}public/signup.html`)
})

//importing user realted route
app.use('/', userRouter)

//importing customer related route
app.use('/customers', customerRouter)

// Importing payments related route
app.use('/payments', paymentRouter)

app.listen(PORT, () => {
    console.log("Server started")
})