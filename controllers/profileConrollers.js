const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
// @route    Get /profile:username
// @desc    User profil
// @access   private

const getProfilePage = async (req, res) => {
  try {
    const userProfile = await User
    .findOne({username: req.params.username})
    .populate('posters')
    .lean()
    // console.log(user.posters);
    let isMe = false
    if(!userProfile) throw new Error('Foydalanuvchi yoq') 
    if(req.session.user) {
       isMe = userProfile._id == req.session.user._id.toString()
    }
      res.render('user/profile', {
      title: `${userProfile.username}`,
      user: req.session.user,
      userProfile,
      // myposters: req.session.user.username,
      posters: userProfile.posters,
      isAuth: req.session.isLogged,
      url: process.env.URL,
      isMe
    })
  } catch (error) {
    console.log(error);
  }
}
// @route    Get /profile:change
// @desc    Update
// @access   private
const updateUserPage = async (req, res) => {
  const user = await User.findById(req.session.user._id).lean()

  try {
    res.render('user/update', {
      title: `${req.session.user.username}`,
      user,
      isAuth: req.session.isLogged,
      url: process.env.URL,
    })
  } catch (error) {
    console.log(error)
  }
}

// @route    Post /profile:change
// @desc    Update
// @access   private
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id)
    const {username, phone, oldPassword, newPassword} = req.body
    if(oldPassword === '' && newPassword === '') {
      await User.findByIdAndUpdate(user._id, req.body)
      return res.redirect(`/profile/${user.username}`)
    }
    const machPassword = await bcrypt.compare(oldPassword, user.password)
    if(!machPassword) {
      req.flash('changeError', 'Eski parol xata')
      return res.redirect('/profile/change')
    }
    const salt =  await bcrypt.genSalt(10)

  const hashedPassword = await  bcrypt.hash(newPassword, salt)
  await User.findByIdAndUpdate(user._id, {
    username, phone, password: hashedPassword
  })
  return res.redirect(`/profile/${user.username}`)
 
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProfilePage,
  updateUserPage,
  updateUser
}