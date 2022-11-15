const { Router } = require('express');
const { getLoginPage, getRegisterPage,registerNewUser, loginUser, logout } = require('../controllers/authControllers');

const router = Router()
const {guest} = require('../middlewares/auth')
router.get('/login',  guest,getLoginPage )
router.post('/login',guest, loginUser )
router.get('/signup',guest, getRegisterPage )
router.post('/signup',guest,registerNewUser  )
router.get('/logout',logout  )

module.exports = router