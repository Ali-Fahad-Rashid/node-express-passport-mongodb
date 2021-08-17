const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-'+  Math.round(Math.random() * 1E9) + path.extname(file.originalname)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })


router.get('/',PostController.index)
router.get('/create',ensureAuthenticated,PostController.create)
router.post('/create', upload.array('photos', 12), PostController.post_create)
router.get('/:id/edit',PostController.edit)
router.post('/:id/edit',PostController.post_edit)
router.get('/:id',PostController.details)
router.post('/:id',PostController.post_delete)

router.use(PostController.notfound)


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router