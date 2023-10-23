import { response } from "../helper/Response.js";
import Brand from "../models/brandModel.js"
import slugify from "slugify";


export const createBrandController = async (req, res) => {
    const { name } = req.body;
    try {
        if (!name) {
            return response({ res, code: 404, result: false, message: 'لطفا نام برند را وارد  کنید', })
        }

        const existinbrand = await Brand.findOne({ name })
        if (existinbrand) {
            return response({ res, code: 200, message: 'این برند وجود دارد', result: false })
        }

        const brand = await new Brand({ name, slug: slugify(name) }).save()

        response({
            res,
            code: 201,
            message: ' برند با موفقیت  ساخته شد',
            data: brand,
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



// ****************** Update Brand ****************
export const updateBrandController = async (req, res) => {
    const { name, id } = req.body;
    try {
        const brand = await Brand.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

        response({
            res,
            code: 200,
            message: 'برند تغیر یافت ',
            result: true,
            data: brand
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

// ******************** get All brand ********************
export const getAllBrandController = async (req, res) => {
    try {
        const brand = await Brand.find({})
        response({
            res,
            code: 200,
            message: '',
            data: brand
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

// ***************** get Single brand *******************

export const getSingleBrandController = async (req, res) => {
    const { id } = req.params
    try {
        const brand = await Brand.findById(id)

        response({
            res,
            code: 200,
            message: '',
            data: brand,
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


// ************* delete brand **************
export const deleteBrandController = async (req, res) => {
    const { id } = req.params
    try {
        await Brand.findByIdAndDelete(id)
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