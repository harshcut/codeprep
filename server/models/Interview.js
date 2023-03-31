const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  date :{
    type : Date,
    required : true
  },
  user1:{
    type : mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  user2:{
    type : mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  question1:{
    type : mongoose.Schema.Types.ObjectId,
    ref: 'question'
  },
  question2:{
    type : mongoose.Schema.Types.ObjectId,
    ref: 'question'
  },
  duration:{
    type: timestamps
  },
  feedback12:{
    type: String
  },
  feedback21:{
    type: String
  }
},
{timestamps : true}
);
module.exports = Interview = mongoose.model('interview', InterviewSchema);
//date-time, user1, user2, question1, question2, feedback12, feedback21