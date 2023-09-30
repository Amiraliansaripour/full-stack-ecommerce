import jwt from 'jsonwebtoken'
import { response } from '../helper/Response.js';
import User from '../models/userModel.js';
// Protected Route token base
export const requireSignIn = async (req, res, next) => {

    try {
        const decode = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user =decode
        next()
    } catch (error) {
        res.status(500).send({
            error,
        })
    }
}


export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        if (user.role !== 1) {
            response({
                res,
                code:401,
                result:false,
                message:"UnAuthorized Access"
            })
        }else{
            next()
        }
    } catch (error) {
        console.log(error)
        response({
            res,
            code:500,
            message:"Server error",
            data:error,
            result:false
        })
    }
}