import express from 'express'
import { isAdmin, requireSignIn } from '../../middlewares/authMiddleware.js'
import {
    createSmellController,
    getAllSmellController,
    updateSmellController,
    getSingleSmellController,
    deleteSmellController
} from '../../controller/smellController.js'
import { smellValidate } from './validator.js'
import { validate } from '../../controller/controller.js'

const router = express.Router()

// post create-smell
router.post(
    '/',
    requireSignIn,
    isAdmin,
    createSmellController)


// put update-smell
router.put(
    '/',
    requireSignIn,
    isAdmin,
    smellValidate(),
    validate,
    updateSmellController)

// get all-smell
router.get('/', getAllSmellController)

// get single-smell
router.get('/:id', getSingleSmellController)

// delete delete-smell
router.delete(
    '/:id',
    requireSignIn,
    isAdmin,
    deleteSmellController)


export default router 