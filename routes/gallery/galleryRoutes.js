import express from 'express'
import { uploadImage ,getImageFromProductId } from '../../controller/galleryControll.js';
import multer from 'multer';
import { isAdmin, requireSignIn } from '../../middlewares/authMiddleware.js';

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'public/upload/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage });
const router = express.Router();

router.post(
    "/upload",
    requireSignIn,
    isAdmin,
    upload.single("image"),
    uploadImage)

// get product image from product id
router.get("/:id",getImageFromProductId)

export default router