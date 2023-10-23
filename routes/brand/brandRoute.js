import express from 'express'
import { isAdmin, requireSignIn } from '../../middlewares/authMiddleware.js'
import { brandValidate } from './validator.js'
import { validate } from '../../controller/controller.js'
import { createBrandController, deleteBrandController, getAllBrandController, getSingleBrandController, updateBrandController } from '../../controller/brandController.js';

const router = express.Router();

// post create brand

router.post(
    '/',
    requireSignIn,
    isAdmin,
    createBrandController
)

// put update-brand
router.put(
    '/',
    requireSignIn,
    isAdmin,
    brandValidate(),
    validate,
    updateBrandController
)

// get all-brand
router.get(
    '/',
    getAllBrandController
)

// get single-brand
router.get(
    '/:id',
    getSingleBrandController
)

// delete delete-brand
router.delete(
    '/:id',
    requireSignIn,
    isAdmin,
    deleteBrandController
)

export default router