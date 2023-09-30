import express from 'express';
import { isAdmin, requireSignIn } from '../../middlewares/authMiddleware.js';
import { validate } from '../../controller/controller.js';
import formidable from 'express-formidable'
import multer from 'multer';
import { productValidate } from './validator.js'
import {
    createProductController,
    getProductController,
    getSingleProductController,
    productPhotoController,
    deleteProductController,
    getAllProductForAdminController,
    updateProductController
} from '../../controller/productController.js';

const router = express.Router()


const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'public/upload/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage });
// post create-product
router.post('/',
    requireSignIn,
    isAdmin,
    // productValidate(),
    // validate,
    // formidable(),
    upload.single("image"),
    createProductController
)

// put update-product
router.put('/:id',
    requireSignIn,
    isAdmin,
    // productValidate(),
    // validate,
    // formidable(),
    upload.single("image"),
    updateProductController
)


// get products
router.get('/', getProductController)

// get all product for dmin panel
router.get('/admin', getAllProductForAdminController)

getAllProductForAdminController

// get single-product
router.get('/:id', getSingleProductController)

// get photo
router.get('/vp-photo/:pid', productPhotoController)

// delete product
router.delete(
    '/:id',
    requireSignIn,
    isAdmin,
    deleteProductController)

export default router


// 5:24:46