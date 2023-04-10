var clustering = require('density-clustering');
var kmeans = new clustering.KMEANS();
const { spawn } = require('child_process');
const path = require('path');
const scriptFilename = path.join(__dirname,'matching.py');

const Profile = require('../models/Profile')
const Slot = require('../models/Slot');
const User = require('../models/User');
const Interview = require('../models/Interview')







const matchUsers =  () =>{
console.log('matching users...')
randomPair('2023-02-10T04:30:00.000Z')
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
  const slot = await Slot.findOne({'date' : time})
  // console.log(slot)
  let slot_profiles = slot.profiles;
  // console.log(slot_profiles[0])
  let len = slot_profiles.length;
  // console.log(slot_profiles[0])
  // console.log(slot_profiles[1])
  if(len%2){
    //handle odd one out
  }else{


    let arr1 = slot_profiles
    let arr2 = slot_profiles

    // console.log(arr1)

    arr1.sort(function() { return 0.5 - Math.random();}); // shuffle arrays
    arr2.sort(function() { return 0.5 - Math.random();});
    // console.log(arr1[0])
    while (arr1.length) {
        let profile1 = arr1.pop()// get the last value of arr1
        let profile2 = arr2[0] == profile1 ? arr2.pop() : arr2.shift();
            //        ^^ if the first value is the same as name1, 
            //           get the last value, otherwise get the first
    
        scheduleInterview(profile1.profile, profile2.profile, time);
    }
  }
}


const scheduleInterview = async(profile1, profile2,time) =>{
  console.log(profile1)
  profile1 = await Profile.findOne({_id:profile1}).populate('user')
  profile2 = await Profile.findOne({_id:profile2}).populate ('user')

  let user1 = profile1.user;
  let user2 = profile2.user;

  const newInterview = Interview({
    date : time,
    user1 : user1,
    user2 : user2
  })

  const interview = await newInterview.save();
  console.log(interview)
}

matchUsers();

module.exports = matchUsers;