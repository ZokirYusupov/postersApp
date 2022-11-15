const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
//  bcrypt = dcodeIO.bcrypt;
// @route    Get /login
// @desc   Get login page
// @access   public

const getLoginPage = (req, res) => {
  if(!req.session.isLogged) {

  return  res.render('auth/login', {
      title: 'Login',
      url: process.env.URL,
      loginError: req.flash('loginError')
    })
  }
}
// @route    Get /signup
// @desc   Get register page
// @access   public

const getRegisterPage = (req, res) => {
  if(!req.session.isLogged) {
    return res.render('auth/signup', {
      title: 'Register',
      url: process.env.URL,
      regError: req.flash('regError')
    })
  }
}

// @route    POST /signup
// @desc   Get new user
// @access   public
const registerNewUser = async (req, res) => {
  try {
    const {email, username, phone, password, password2} = req.body;
    // hash password
    const salt =  await bcrypt.genSalt(10)

    const hashedPassword = await  bcrypt.hash(password, salt)
    const userExist = await User.findOne({email});

    if(userExist) {
      req.flash('regError', 'Bunday foydalanuvchi mavjud')
      return res.redirect('/auth/signup')
    }
    if(password !== password2) {
      req.flash('regError', 'Parollar mos emas')
      return res.redirect('/auth/signup')
    }
    await User.create({
      email,
      username,
      phone,
      password: hashedPassword
    })
    return res.redirect('/auth/login')
  } catch (error) {
    
  }
}

// @route    POST /login
// @desc   Login User
// @access   public

const loginUser = async (req, res) => {
  try {
    const userExist = await User.findOne({email: req.body.email});
    if(userExist) {
      // const matchPassword = userExist.password === req.body.password
      const matchPassword = await bcrypt.compare(req.body.password, userExist.password)
      if(matchPassword) {
        req.session.user = userExist
        req.session.isLogged = true
        // console.log(req.session.user);
        req.session.save(err => {
          if(err) throw err
          return  res.redirect('/profile/' + req.session.user.username)
        })
      } else {
        req.flash('loginError', 'Parol yoki email xato')
        return res.redirect('/auth/login')
      }
    }
    else {
      req.flash('loginError', 'Bunday foydalanuvchi mavjud emas')
     return res.redirect('/auth/login')
    }
  } catch (error) {
    console.log(error)
  }
}

// logout
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
}

module.exports = {
  getLoginPage,
  getRegisterPage,
  registerNewUser,
  loginUser,
  logout
}