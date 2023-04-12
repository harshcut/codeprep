var clustering = require('density-clustering');
var kmeans = new clustering.KMEANS();
const { spawn } = require('child_process');
const path = require('path');
const scriptFilename = path.join(__dirname,'matching.py');

const Profile = require('../models/Profile')
const Slot = require('../models/Slot');
const User = require('../models/User');
const Interview = require('../models/Interview');
const Question =  require('../models/Question')


const sgMail = require('@sendgrid/mail')



const matchUsers =  () =>{
// console.log('matching users...')
//schedule interviews one hour ahead
let cur_time = new Date();
cur_time.setHours(cur_time.getHours()+1);
randomPair(cur_time)
}


const randomPair = async (time) =>{
  const slot = await Slot.findOne({'date' : time})
  if(!slot) return

  let slot_profiles = slot.profiles;
  let len = slot_profiles.length;

  if(len%2){
    //handle odd one out
  }else{


    let arr1 = slot_profiles
    let arr2 = slot_profiles

    arr1.sort(function() { return 0.5 - Math.random();}); // shuffle arrays
    arr2.sort(function() { return 0.5 - Math.random();});
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
  profile1 = await Profile.findOne({_id:profile1}).populate('user')
  profile2 = await Profile.findOne({_id:profile2}).populate ('user')

  let user1 = profile1.user;
  let user2 = profile2.user;

  // Fetch two random leetcode problems
  let index1 = getRandomInt(1,50), index2 = getRandomInt(1,50);
  while(index1==index2) index2 = getRandomInt(1,50)

  const q1 = await Question.findOne({index : index1}),
  q2 = await Question.findOne({index : index2});

  

  const newInterview = Interview({
    date : time,
    user1 : user1,
    user2 : user2,
    question1 : q1,
    question2 : q2
  })

  const interview = await newInterview.save();

  const msg1 = {
  to: user1.email,
  from: process.env.SENDGRID,
  subject: 'Codeprep - Interview session link',
  text: 'some link..',
  html: '<strong>click here</strong>',
};
const msg2 = {
  to: user2.email,
  from: process.env.SENDGRID,
  subject: 'Codeprep - Interview session link',
  text: 'some link..',
  html: '<strong>click here</strong>',
};
sgMail.send(msg1);
sgMail.send(msg2);

  // console.log('Interview scheduled')
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
matchUsers();

module.exports = matchUsers;