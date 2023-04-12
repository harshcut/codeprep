const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
require('dotenv').config()

const auth = require('../middleware/auth')
const User = require('../models/User')

const { check, validationResult } = require('express-validator');


router.get('/', auth, async(req,res)=>{
  try {
    const user = await User.findById(req.user.id).
                select('-password');
    res.json(user);
  } catch (err) {
    // console.log(err.message);
    res.status(500).send('Server error');
    
  }
})

//@route     POST api/auth
//@desc      AUthenticate user and get token
//@access    Public
router.post('/login', [
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body;
  try {
    //See if the user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    //return jsonwebtoken
    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(
      payload,
      process.env.JWTSECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      });


  } catch (err) {
    // console.error(err.message);
    res.status(500).send('Server error')
  }
});

//@route    POST api/users
//@desc     Register user
//@access   Public
router.post('/register',[
  check('email','Please include a valid email').isEmail(),
  check('password','Please enter a password with 6 or more characters').exists()
],async (req,res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()){
return res.status(400).json({errors: errors.array()})
  }
    const {  email, password } = req.body;

    try {

  //See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        email,
        password
      });

  //Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //return jsonwebtoken
      const payload = {
        user: { 
          id: user.id
        }
      }
  //Return jsonwebtoken
      jwt.sign(
        payload,
        process.env.JWTSECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      // res.send('User Registered');
    }catch(err){
      // console.error(err.message);
      res.status(500).send('Server error')
    }

  
})

module.exports = router;