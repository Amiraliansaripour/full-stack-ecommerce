import express from 'express'
import { isAdmin, requireSignIn } from '../../middlewares/authMiddleware.js'
import { 
    createCategoryController,
     getAllCategoryController,
     updateCategoryController,
     getSingleCategoryController,
     deleteCategoryController
 } from '../../controller/categoryController.js'
import { categoryValidate } from './validator.js'
import { validate } from '../../controller/controller.js'

const router = express.Router()

// post create-category
router.post(
    '/',
    requireSignIn,
    isAdmin,
    createCategoryController)


// put update-category
router.put(
    '/',
    requireSignIn,
    isAdmin,
    categoryValidate(),
    validate,
    updateCategoryController)

// get all-category
router.get('/',getAllCategoryController)

// get single-category
router.get('/:id',getSingleCategoryController)

// delete delete-category
router.delete(
    '/:id',
    requireSignIn,
    isAdmin,
    deleteCategoryController)


export default router 