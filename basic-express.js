const express   = require('express')
const path      = require('path')
const bodyParser= require('body-parser')
const nodemailer= require('nodemailer')

let app = express()
let port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.listen(port, () => {
    console.log(`Listening at ${port}`)
})