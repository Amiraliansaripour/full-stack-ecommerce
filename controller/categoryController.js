import { response } from "../helper/Response.js"
import Category from "../models/categoryModel.js"
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return response({ res, code: 401, result: false, message: 'لطفا نام دسته بندی را وارد  کنید', })
        }
        console.log(name)

        const existingCategory = await Category.findOne({ name })
        if (existingCategory) {
            return response({ res, code: 200, message: 'این دسته بندی وجود دارد', result: false })
        }

        const category = await new Category({ name, slug: slugify(name) }).save()

        response({
            res,
            code: 201,
            message: 'دسته بندی با موفقیت  ساخته شد',
            data: category,
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

export const updateCategoryController = async (req, res) => {
    try {
        const { name, id } = req.body;
        const category = await Category.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

        response({
            res,
            code: 200,
            message: 'دسته بندی تغیر یافت ',
            result: true,
            data: category
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

export const getAllCategoryController = async (req, res) => {
    try {
        const category = await Category.find({})
        response({
            res,
            code: 200,
            message: '',
            data: category
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

export const getSingleCategoryController = async (req, res) => {
    try {
        const {id} = req.params
        const category = await Category.findById(id)

        response({
            res,
            code: 200,
            message: '',
            data: category,
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
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        await Category.findByIdAndDelete(id)
        response({
            res,
            code: 200,
            message: 'دسته بندی حذف شد',
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