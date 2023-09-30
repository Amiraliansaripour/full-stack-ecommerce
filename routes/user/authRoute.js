import express from "express";
import {
    registerValidate,
    loginValidate,
    ForgetPasswordValidate
} from "./validator.js";
// controllers
import {
    registerController,
    loginController,
    testController,
    forgetPasswordController,
    getAllUsersController
} from "../../controller/authController.js";
import { validate } from "../../controller/controller.js";
import { isAdmin, requireSignIn } from "../../middlewares/authMiddleware.js";
// router obj
const router = express.Router()

// Register "post"
router.post(
    '/register',
    registerValidate(),
    validate,
    registerController)

// login "post"
router.post(
    '/login',
    loginValidate(),
    validate,
    loginController
)

// forget password "post"
router.post(
    'forget-password',
    ForgetPasswordValidate(),
    validate,
    forgetPasswordController)




// protected route auth
router.get(
    '/user-auth',
    requireSignIn,
    (req, res) => {
        res.status(200).send({ result: true })
    }
)

// protected Admin route auth
router.get(
    '/admin-auth',
    requireSignIn,
    isAdmin,
    (req, res) => {
        res.status(200).send({ result: "ref" })
    }

)


// get All users 
router.get(
    '/users',
    requireSignIn,
    isAdmin,
    getAllUsersController
)

export default router

