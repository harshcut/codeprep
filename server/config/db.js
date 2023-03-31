const mongoose = require('mongoose');
require('dotenv').config()
const mongoURI = process.env.MONGO_URI

const connectDB = async() => {
  try{
    await mongoose.connect(mongoURI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    });
    console.log('MongoDB connected !');
  }catch(err){
    console.error(err.message);
    process.exit(1);
    }
  
}

module.exports = connectDB;