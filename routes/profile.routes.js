const { Router } = require('express');
const { getProfilePage, updateUserPage, updateUser } = require('../controllers/profileConrollers');


const router = Router()


router.get('/change', updateUserPage)
router.post('/change', updateUser)
router.get('/:username', getProfilePage)



module.exports = router