const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const cron = require('./config/cron')
const { setupWSConnection } = require('y-websocket/bin/utils')
const expressWs = require('express-ws')



require('dotenv').config()
const port =  8000
const { app } = expressWs(express())


//Connect DB
connectDB();
//Run cron job
cron();

//Init Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

//Defining Routes
app.ws('/collaboration/:document', (ws, req) => {
  setupWSConnection(ws, req, { docName: req.params.document })
})
app.use('/api/auth', require('./routes/Auth'))
app.use('/api/interview', require('./routes/Interview'))
app.use('/api/profile', require('./routes/Profile'))



app.get('/', (req, res)=>{
  res.json({message : 'running....!'})
})

