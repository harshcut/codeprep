const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  date :{
    type : Date,
    required : true
  },
  profiles:[
  {
    profile : {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'profile'
  }
}
]
},
{timestamps : true}
);
module.exports = Interview = mongoose.model('slot', SlotSchema);
//date-time, user, role-type,