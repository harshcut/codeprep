const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const User = require('../models/User');

const { check, validationResult } = require('express-validator');


//@route GET api/profile/me
//@desc Test route
//@access Public
router.get('/me',auth,async (req,res) => {
  try{
    
    const profile = await Profile.findOne({user : req.user.id}).populate('user');

    if(!profile){
      return res.status(400).json({msg : 'There is no profile for this user'});
    }
    res.json(profile);
  }catch(err){
    // console.error(err.message);
    res.status(500).send('Server Error')
  }
});
//@route  GET api/profile
//@desc   Get all profiles
//@access Public
router.get("/",async(req,res) => {
  try {
    const profiles = await Profile.find().populate('user');
    res.json(profiles);
  } catch (err) {
    // console.error(err.message);
    res.status(500).send('Server error!')
    
  }
});


//@route    GET api/profile/user/:user_id
//@desc     Get  profile by user id
//@access   Public
router.get('/user/:user_id', async (req, res) => {
  try {
    // console.log("im hit dude2")
    const profile = await Profile.findOne(
        {user: req.params.user_id}
      ).populate('user');

    if(!profile){
      return res.status(400).json({ msg: "Profile not found"})
    }
    res.json(profile);
  } catch (err) {
    // console.error(err.message);
    if(err.kind == 'ObjectId')
      return res.status(400).json({ msg: "Profile not found" });
      else
      res.status(500).send('Server error!');

  }
});



//@route POST api/profile
//@desc Create or update profile
//@access private
router.post('/', [auth, [
  check('firstName', 'firstName required').not().isEmpty(),
  check('lastName', 'lastName required').not().isEmpty(),
  check('location', 'location required').not().isEmpty(),
  check('candidate_level', 'candidate level required').not().isEmpty(),
  check('YOE', 'Years of experience required').not().isEmpty(),
  check('role','role required').not().isEmpty(),
]],async (req,res) => {
// console.log(req.body);
const errors =validationResult(req);
if(!errors.isEmpty()){
  return res.status(400).json({errors: errors.array()});
}
    const {
      firstName,lastName, candidate_level, location, YOE, language, role
    } = req.body;
    //Build profile object
    const profileFields = {};
    
    
    profileFields.user = req.user.id;
    if(firstName) profileFields.firstName = firstName;
    if (lastName) profileFields.lastName = lastName;
    if (location) profileFields.location = location;
    if (candidate_level) profileFields.candidate_level = candidate_level;
    if (language) profileFields.language = language;
    if (role) profileFields.role = role;
    if (YOE) profileFields.YOE = YOE;
    
    const user = await User.findById(req.user.id).select('-password');

    try{
      let profile =await Profile.findOne({user : req.user.id})

      if(profile){
        //Update
        profile = await Profile.findOneAndUpdate({user: req.user.id},
          {$set: profileFields},
          {new: true, upsert: true, setDefaultsOnInsert: true }
          );
          return res.json(profile)
      }

       //Create 
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile)

    }catch(err){
      // console.error(err.message);
      res.status(500).send('Server error!')
    }
});



module.exports = router;  