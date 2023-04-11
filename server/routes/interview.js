const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Interview = require('../models/Interview')
const Slot = require('../models/Slot')
const Profile = require('../models/Profile')
const auth = require('../middleware/auth')

//@route      POST api/interview/slot
//@desc       Select time slot for interview
//@access     Authorized
router.post('/slot',auth, async(req, res)=>{
  try {
    let user = await User.findById(req.user.id).select('-password');
    const profile = await Profile.findOne({
      user : req.user.id
    }).populate('user')

    let slot = await Slot.findOne({date :req.body.date})

    if(!slot){
    const newSlot = Slot({
          date : req.body.date,
          profiles : [
            {profile:profile}
          ]
        })
      const slot = await newSlot.save();
      res.status(200).json(slot);
    }
    else{
      //update profile array
      slot.profiles.unshift({profile : profile})
      await slot.save();
      res.status(200).json(slot);
    }
  
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
  

})

//@route      GET api/interview/problem/:id
//@desc       get problem by _id
//@access     Public
router.post('/problem/:id', async(req, res)=>{
  try {
    const problem = await Questions.findById(req.params.id)

  if(!problem){
    return res.status(404).send("Problem not found");
  }
  res.status(200).json(problem);
  } catch (err) {
    if (err.kind==='ObjectId') 
      return res.status(404).send("Problem not found");
    console.error(err.message);
    res.status(500).send('Server error!!');

  }
});

module.exports = router;