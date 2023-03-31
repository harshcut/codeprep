const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  firstName :{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  location:{
    city :{
      type: String,
    required: true
    },
    state:{
      type: String,
    required: true
    },
    country:{
      type: String,
    required: true
    }
  },
  candidate_level:{
    type: String,
    required: true
  },
  YOE:{
    type: Number,
    required:true
  },
  role:{
    type: String,
    required:true
  },
  past_interviews:[
    {
      interview : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'interview'
      }
    }
  ],
  upcoming_interviews:[
    {
      interview : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'interview'
      }
    }
  ]
});
module.exports = Profile = mongoose.model('profile', ProfileSchema);
//firstname, lastname, past_interviews(array), upcoming_interviews(array), YOE, coding_language, location, candidate_level, gender, role 