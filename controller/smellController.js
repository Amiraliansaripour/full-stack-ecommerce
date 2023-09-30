import { response } from "../helper/Response.js"
import Smell from "../models/smellModel.js"
import slugify from "slugify";

export const createSmellController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return response({ res, code: 401, result: false, message: 'لطفا نام رایحه را وارد  کنید', })
        }
        console.log(name)

        const existingSmell = await Smell.findOne({ name })
        if (existingSmell) {
            return response({ res, code: 200, message: 'این رایحه وجود دارد', result: false })
        }

        const smell = await new Smell({ name, slug: slugify(name) }).save()

        response({
            res,
            code: 201,
            message: ' رایحه با موفقیت  ساخته شد',
            data: smell,
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

export const updateSmellController = async (req, res) => {
    try {
        const { name, id } = req.body;
        const smell = await Smell.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

        response({
            res,
            code: 200,
            message: 'رایحه تغیر یافت ',
            result: true,
            data: smell
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

export const getAllSmellController = async (req, res) => {
    try {
        const smell = await Smell.find({})
        response({
            res,
            code: 200,
            message: '',
            data: smell
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

export const getSingleSmellController = async (req, res) => {
    const { id } = req.params
    try {
        const smell = await Smell.findById(id)

            response({
                res,
                code: 200,
                message: '',
                data: smell,
                result: true
            })

        
        console.log(req.params)

    } catch (error) {
        response({
            res,
            code: 500,
            result: false,
            message: "مشکلی  در سرور پیش آمده ، لطفا بعدا تلاش کنید",
            data:error 
        })
    }
}


// *********************************
export const deleteSmellController = async (req, res) => {
    try {
        const { id } = req.params
        await Smell.findByIdAndDelete(id)
        response({
            res,
            code: 200,
            message: ' رایحه حذف شد',
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