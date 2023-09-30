import express from 'express'
import { isAdmin, requireSignIn } from '../../middlewares/authMiddleware.js'
import {
    createMilController,
    updateMilController,
    getAllMilController,
    getSingleMilController,
    deleteMilController
} from '../../controller/milController.js'
import { milValidate } from './validator.js'
import { validate } from '../../controller/controller.js'

const router = express.Router()

// post create-category
router.post(
    '/',
    requireSignIn,
    isAdmin,
    createMilController)


// put update-category
router.put(
    '/',
    requireSignIn,
    isAdmin,
    milValidate(),
    validate,
    updateMilController)

// get all-category
router.get('/', getAllMilController)

// get single-category
router.get('/:id', getSingleMilController)

// delete delete-category
router.delete(
    '/:id',
    requireSignIn,
    isAdmin,
    deleteMilController)


export default router 