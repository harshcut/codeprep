const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
require('dotenv').config()
const port =  8000
const app =  express()

connectDB();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended:true
  })
)
app.get('/', (req, res)=>{
  res.json({message : 'running....'})
})

app.listen(port, ()=>{
    console.log('app running on port 8000..')
})