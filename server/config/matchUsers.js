var clustering = require('density-clustering');
var kmeans = new clustering.KMEANS();
const { spawn } = require('child_process');


const matchUsers = () =>{
console.log('matching users...')



  var data1;
   // spawn new child process to call the python script
   const python = spawn('python', ['C:\Users\Reeti\Desktop\codeprep-\server\config\p1.py']);
   // collect data from script
   python.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...');
      data1 = data.toString();
   });
   // in close event we are sure that stream from child process is closed
   python.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`);
      // send data to browser
      console.log(data1)
   });
}

matchUsers();

module.exports = matchUsers;