const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRouters = require('./routers/user.router')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.json())
app.use('/api/user', userRouters)
mongoose.connect(process.env.DBHOST)

const bcrypt = require('bcrypt')
const securePass = async () => {
    const pass = 'admin'
    const newPass = await bcrypt.hash(pass, 8)
    const ifMatch = await bcrypt.compare(pass, newPass)
    console.log(ifMatch)
} 
securePass()


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})