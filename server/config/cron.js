const cron = require('node-cron')
const matchUsers = require('./matchUsers')

const cronjob = async() =>{
const job = cron.schedule("0 * * * *",matchUsers);
}

module.exports = cronjob;
//2617