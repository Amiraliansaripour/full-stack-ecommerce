import { response } from "../helper/Response.js"
import Mil from "../models/milModel.js";
import slugify from "slugify";

export const createMilController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return response({ res, code: 404, result: false, message: 'لطفا نام میل را وارد  کنید', })
        }

        const existingmil = await Mil.findOne({ name })
        if (existingmil) {
            return response({ res, code: 200, message: 'این میل وجود دارد', result: false })
        }

        const mil = await new Mil({ name, slug: slugify(name) }).save()

        response({
            res,
            code: 201,
            message: ' میل با موفقیت  ساخته شد',
            data: mil,
            result: true
        })
    } catch (error) {
        response({
            res,
            code: 500,
            result: false,
            message: "مشکلی  در سرور پیش آمده ، لطفا بعدا تلاش کنید",
            data: { error }
        })
    }
}
// ***********************************************

export const updateMilController = async (req, res) => {
    try {
        const { name, id } = req.body;
        const mil = await Mil.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

        response({
            res,
            code: 200,
            message: 'میل تغیر یافت ',
            result: true,
            data: mil
        })


    } catch (error) {
        response({
            res,
            code: 500,
            result: false,
            message: "مشکلی  در سرور پیش آمده ، لطفا بعدا تلاش کنید",
            data: { error }
        })
    }
}
// ************************************

export const getAllMilController = async (req, res) => {
    try {
        const mil = await Mil.find({})
        response({
            res,
            code: 200,
            message: '',
            data: mil
        })
    } catch (error) {
        response({
            res,
            code: 500,
            result: false,
            message: "مشکلی  در سرور پیش آمده ، لطفا بعدا تلاش کنید",
            data: { error }
        })
    }
}

// ********************************

export const getSingleMilController = async (req, res) => {
    try {
        const {id} = req.params
        const mil = await Mil.findById(id)

        response({
            res,
            code: 200,
            message: '',
            data: mil,
            result: true
        })


    } catch (error) {
        response({
            res,
            code: 500,
            result: false,
            message: "مشکلی  در سرور پیش آمده ، لطفا بعدا تلاش کنید",
            data: { error }
        })
    }
}


// *********************************
export const deleteMilController = async (req, res) => {
    try {
        const { id } = req.params
        await Mil.findByIdAndDelete(id)
        response({
            res,
            code: 200,
            message: ' میل حذف شد',
            result: true,
        })
    } catch (error) {
        response({
            res,
            code: 500,
            result: false,
            message: "مشکلی  در سرور پیش آمده ، لطفا بعدا تلاش کنید",
            data: { error }
        })
    }
}