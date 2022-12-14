const mongoose = require('mongoose')

const connectDb = async () => {
  try {
   const conn = await mongoose.connect( process.env.MONGO_URI,
    {useNewUrlParser: true,
  })
  console.log(`Mongodb connected to: ${conn.connection.host}`);
  } catch (error) {
    console.log(error)
  }
  
  }
  // connectDb()
  module.exports = connectDb