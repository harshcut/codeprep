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
    // const profile = await Profile.findOne({
    //   user : req.user.id
    // }).populate('user')

    const newSlot = Slot({
      date : req.body.date,
      user : req.user.id,
      type : req.body.type
    })
    const slot = await newSlot.save();
    res.status(200).json(slot);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
  

})



module.exports = router;