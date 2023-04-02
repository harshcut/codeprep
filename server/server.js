const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
require('dotenv').config()
const port =  8000
const app =  express()

//Connect DB
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

//Defining Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/interview', require('./routes/interview'))

app.get('/', (req, res)=>{
  res.json({message : 'running....!'})
})
console.log(Date.now())

app.listen(port, ()=>{
    console.log('app running on port 8000..')
})