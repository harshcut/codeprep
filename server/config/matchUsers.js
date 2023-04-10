var clustering = require('density-clustering');
var kmeans = new clustering.KMEANS();
const { spawn } = require('child_process');
const path = require('path');
const scriptFilename = path.join(__dirname,'matching.py');

const Profile = require('../models/Profile')
const Slot = require('../models/Slot')







const matchUsers =  () =>{
  let curtime = new Date();
curtime.setHours(curtime.getHours() + 1);
randomPair(curtime);
console.log('matching users...')
}

const getAllProfiles = async() =>{
  try {
    const profiles = await Profile.find().select('YOE role candidate_level').populate('user', '_id')
    // console.log(profiles)
    return profiles;
  } catch (err) {
    console.error(err.message);
    return [];
    
  }
}

const randomPair = async (time) =>{
  const slot_profiles = await Slot.find({'date' : time}).populate('profile')
  let len = slot_profiles.length;
  if(len%2){
    //handle odd one out
  }else{


    let arr1 = slot_profiles.slice();
    let arr2 = slot_profiles.slice();

    arr1.sort(function() { return 0.5 - Math.random();}); // shuffle arrays
    arr2.sort(function() { return 0.5 - Math.random();});

    while (arr1.length) {
        var profile1 = arr1.pop(), // get the last value of arr1
            profile2 = arr2[0] == profile1 ? arr2.pop() : arr2.shift();
            //        ^^ if the first value is the same as name1, 
            //           get the last value, otherwise get the first

        // scheduleInterview();
    }





  }



}

matchUsers();

module.exports = matchUsers;