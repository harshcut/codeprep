const cron = require('node-cron')
const matchUsers = require('./matchUsers')

const cronjob = async() =>{
  const d = new Date(2023, 1, 10, 10);
const job = cron.schedule("*/5 * * * *",matchUsers);
}

module.exports = cronjob;
//2617