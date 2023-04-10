const cron = require('node-cron')
const matchUsers = require('./matchUsers')

const cronjob = () =>{
  const d = new Date(2023, 1, 10, 10);
  console.log(d.toJSON())
const job = cron.schedule("* * * * *",matchUsers);
}

module.exports = cronjob;