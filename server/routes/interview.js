const express = require('express');
const router = express.Router();
const User = require('../models/User')


//@route      POST api/interview/slot
//@desc       Select time slot for interview
//@access     Authorized
// router.post('/slot', async(req, res)=>{
//   let user = await User.findOne()
// })


module.exports = router;