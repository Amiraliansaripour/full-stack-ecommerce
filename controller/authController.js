import _ from 'lodash'
import jwt from 'jsonwebtoken'
import { hashPassword, comparePassword } from "../helper/authHelper.js"
import User from "../models/userModel.js"
import { response } from '../helper/Response.js'

export const registerController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body
        const existingUser = await User.findOne({ email })

        // Check if the user existing
        if (existingUser) {
            return response({
                res,
                code: 200,
                result: false,
                message: `User ${email} already exists Please login`,
            })

        }

        // register user 
        const hashpassword = await hashPassword(password)

        // save user
        const user = new User({
            email,
            password: hashpassword,
            name,
            phone,
            address
        })
        await user.save()

        // token

        const token = await jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        response({
            res,
            code: 201,
            result: true,
            message: "ثبت نام شما با موفقیت انجام شد",
            data: {
                user: _.pick(user, ["name", "phone", "address", "email", "createdAt", "updatedAt"]),
                token: token
            }

        })


    } catch (error) {
        response({
            res,
            result: false,
            message: "مشکلی  در سرور پیش آمده ، لطفا بعدا تلاش کنید",
            data: { error },
            code: 500
        })
    }
}


//***************** */ Post Login********************************
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return response({
                res,
                code: 404,
                result: false,
                message: "کاربری با مشخصات یاف نشد لطفا ثب نام کنید",

            })

        }

        const match = await comparePassword(password, existingUser.password)
        if (!match) {
            return response({
                res,
                code: 200,
                message: "کلمه عبور نادرست میباشد",
                result: false,
            })

        }

        // token
        const token = await jwt.sign(
            { _id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        response({
            res,
            code: 200,
            result: true,
            data: {
                user: _.pick(existingUser, ["name", "phone", "address", "email", "createdAt", "updatedAt"]),
                token,
            },
            message: "با موفقیت وارد شدید"
        })

    } catch (error) {
        response({
            res,
            result: false,
            message: "مشکلی  در سرور پیش آمده ، لطفا بعدا تلاش کنید",
            data: { error },
            code: 500
        })
    }
}


// ******************************** Forget password **********************************

export const forgetPasswordController = async (req,res) =>{
    try {
        const {email,question,newPassword} = req.body;
        
    } catch (error) {
        response({
            res,
            result: false,
            message: "مشکلی  در سرور پیش آمده ، لطفا بعدا تلاش کنید",
            data: { error },
            code: 500
        })
    }
}



export const testController = async (req, res) => {
    console.log("Protected Route")
    res.send({
        message: "Protected Route"
    })
}


// ************* All Users *********

export const getAllUsersController = async (req, res) => {
    try {
        const user = await User.find()

        if (!user) {
        return  response({
                res,
                code: 404,
                message:"لطفا بعدا تلاش کنید مشکلی پیش آمد",
                data:'',
                result:false
            })
        }

        response({
            res,
            code: 200,
            message:'',
            data: user,
            result:true
        })
        
    } catch (error) {
        response({
            res,
            result: false,
            message: "مشکلی  در سرور پیش آمده ، لطفا بعدا تلاش کنید",
            data: { error },
            code: 500
        })
    }
}