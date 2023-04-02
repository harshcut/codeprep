const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  date :{
    type : Date,
    required : true
  },
  user:{
    type : mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  type :{
    type : 'String',
    required: true
  }
},
{timestamps : true}
);
module.exports = Interview = mongoose.model('slot', SlotSchema);
//date-time, user, role-type,