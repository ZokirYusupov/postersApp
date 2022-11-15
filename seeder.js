const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Poster = require('./models/posterModel')
const User = require('./models/userModel')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,

})

const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'))
const posters = JSON.parse(fs.readFileSync(`${__dirname}/_data/posters.json`, 'utf-8'))

// import
const importData = async () => {
  try {
    await User.create(users)
    await Poster.create(posters)
    console.log('data imported');
    process.exit()
  } catch (error) {
    console.log(error)
  }
}

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Poster.deleteMany();
    console.log('Deleted');
    process.exit()
  } catch (error) {
    console.log(error);
  }
}

if(process.argv[2] === '-i') {
  importData()
} else if(process.argv[2] === '-d') {
  deleteData()
}