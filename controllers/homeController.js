
const Poster = require('../models/posterModel')
// @route     /
// @desc    Get home page
// @access   public
const getHomePage =  async (req, res) => {
  const posters = await Poster.find().lean()
  res.render('home', {
    title: "home",
    url: process.env.URL,
    user: req.session.user,
    isLogged: req.session.isLogged,
    posters: posters.reverse().slice(0,8)
  })
}


module.exports = {
  getHomePage
}