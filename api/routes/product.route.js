const express = require('express')
const router = express.Router()
const controller = require('../controllers/product.controller')

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      console.log(file.originalname)
      cb(null, file.originalname.split(" ").join("-"));
    }
});
const upload = multer({storage: storage});

router.get('/new', controller.getNewProduct)
router.get('/featured', controller.getFetureProduct)
router.get('/details/:id', controller.getDetailProduct)
router.get('/category', controller.getAllCategory)
router.get('/category/:id', controller.getCategory)
router.get('/search', controller.searchProduct)
router.post('/order', controller.orderProduct)
router.post('/upload', upload.single('file'), controller.uploadImage)

router.post('/admin/signin', controller.signinUser)
router.post('/admin/user/create', controller.createUser)


module.exports = router;