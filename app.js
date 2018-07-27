const express   = require('express')
const path      = require('path')
const bodyParser= require('body-parser')
const nodemailer= require('nodemailer')
// const jade      = require('jade')

let app = express()
let port = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => { // '/' is for home page
    // console.log('Hello World ') //print on server whenever someone vist
    // res.send('<h1>hello world</h1>') //can use   html tags also
    // res.send('hello world') 
    res.render('index',{title:'Welcome ADD'} ); //rendering jade files  
})

app.get('/about', (req , res) => {
    res.render('about')
})

app.get('/contact', (req , res) => {
    res.render('contact')
})

app.post('/contact/send', (req, res) => {
    console.log('Send')
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'ansariadil81@gmail.com',
            pass: 'yourpassword'
        }
    })
    let mailOptions = {
        from: 'Adil Ansari <ansariadil81@gmail.com>',
        to: 'adil.ansari@deeplogictech.com',
        subject: 'Website Submission',
        text: 'You Have a Feedback with following details.. name '+req.body.name+' Email '+req.body.email+' Message  :- '+req.body.message ,
        html:`<p>You Have a Feedback with following details..</p><ul><li>Name : ${req.body.name}</li><li>Email : ${req.body.email}</li><li>Phone : ${req.body.phone}</li><li>Message :${req.body.message}</li></ul>`
    }

    transporter.sendMail(mailOptions, (err, info) => {
         if(err){
             console.log(err)
             alert('Proper validation are not done')
         }else{
             console.log('Message Sent:'+info.response)
            //  alert('Response has been saved')
             res.redirect('/')
         }
    })

})

app.listen(port, () => {
    console.log(`Listening at ${port}`)
})