const protected = (req, res, next) => {
  if(!req.session.isLogged) {
    res.redirect('/')
  }
  next()
}


const guest = (req, res, next) => {
  if(req.session.isLogged) {
    res.redirect('/')
  }
  next()
}

module.exports = {
  protected,
  guest
}