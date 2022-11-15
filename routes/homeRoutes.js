const { Router } = require('express');
const { getHomePage } = require('../controllers/homeController');
const router = Router()

router.get('/', getHomePage)

module.exports = router