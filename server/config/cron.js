const cron = require('node-cron')
const matchUsers = require('./matchUsers')

const cronjob = () =>{
const job = cron.schedule("* * * * *",matchUsers);
}

const scehduleInterviews = ()=>{
console.log('heyyy')
}



module.exports = cronjob;