const { Router } = require('express');
const upload = require('../utils/fileUpload')
const { getPostersPage, addNewPoster, addNewPosterPage, getOnePoster, getEditPosterPage, updatePoster, deletePoster } = require('../controllers/postersController');
const router = Router()

const { protected, guest } = require('../middlewares/auth')

router.get('/', getPostersPage )
router.get('/add', protected, addNewPosterPage )
router.post('/add',protected, upload.single('image'), addNewPoster )
router.get('/:id', getOnePoster)
router.get('/:id/edit', protected, getEditPosterPage)
router.post('/:id/edit',upload.single('image'),protected, updatePoster)
router.post('/:id/delete',protected, deletePoster)



module.exports = router