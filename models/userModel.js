const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs')
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    required:true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    // maxLength: 10
  },
  posters: [{
    type: Schema.Types.ObjectId, 
    ref: 'Poster'
  }]
}, {
  timestamps: true
})

// userSchema.pre('save', async function() {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt)

// })

module.exports = model('User', userSchema)