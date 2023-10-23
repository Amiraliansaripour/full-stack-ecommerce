import slugify from "slugify";
import Products from "../models/productModel.js"
import Mil from "../models/milModel.js"
import Smell from "../models/smellModel.js"
import Category from "../models/categoryModel.js"
import fs from 'fs'
import { response } from "../helper/Response.js";
import _ from "lodash";

export const createProductController = async (req, res) => {
    const { name, price, category, smell, count, mil, description, enName, status } = req.body;
    try {
        // const { thumb } = req.files;
        switch (true) {
            case !name:
                return response({ res, code: 404, message: "لطفا نام را وارد کنید", result: false, })
            case !enName:
                return response({ res, code: 404, message: "لطفا نام انگلیسی را وارد کنید", result: false, })
            case !price:
                return response({ res, code: 404, message: "لطفا قیمت را وارد کنید", result: false, })
            case !category:
                return response({ res, code: 404, message: "لطفا دسته بندی را وارد کنید", result: false, })
            case !brand:
                return response({ res, code: 404, message: "لطفا برند را وارد کنید", result: false, })
            case !smell:
                return response({ res, code: 404, message: "لطفا رایحه را وارد کنید", result: false, })
            case !count:
                return response({ res, code: 404, message: "لطفا تعداد را وارد کنید", result: false, })
            case !mil:
                return response({ res, code: 404, message: "لطفا میلی لیتر را وارد کنید", result: false, })
            case !description:
                return response({ res, code: 404, message: "لطفا توضیحات را وارد کنید", result: false, })
        }

        const product = new Products({
            name
            , enName
            , price
            , category
            , brand
            , smell
            , mil
            , description
            , count
            , status: status
            , thumb: req.file.filename
            , slug: slugify(enName)
        })

        await product.save();

        response({
            res,
            code: 201,
            result: true,
            data: product,
            message: "محصول با موفقیت ساخته شد"
        })
    } catch (error) {
        response({
            res,
            code: 500,
            result: false,
            message: error.message,
            data: { error }
        })
    }
}



// ***************** update product ****************

export const updateProductController = async (req, res) => {
    const { name, price, category, smell, count, mil, description, enName, status } = req.body;
    const { id } = req.params;
    try {
        // const { thumb } = req.files;
        switch (true) {
            case !name:
                return response({ res, code: 404, message: "لطفا نام را وارد کنید", result: false, })
            case !enName:
                return response({ res, code: 404, message: "لطفا نام انگلیسی را وارد کنید", result: false, })
            case !price:
                return response({ res, code: 404, message: "لطفا قیمت را وارد کنید", result: false, })
            case !category:
                return response({ res, code: 404, message: "لطفا دسته بندی را وارد کنید", result: false, })
            case !smell:
                return response({ res, code: 404, message: "لطفا رایحه را وارد کنید", result: false, })
            case !brand:
                return response({ res, code: 404, message: "لطفا برند را وارد کنید", result: false, })
            case !count:
                return response({ res, code: 404, message: "لطفا تعداد را وارد کنید", result: false, })
            case !mil:
                return response({ res, code: 404, message: "لطفا میلی لیتر را وارد کنید", result: false, })
            case !description:
                return response({ res, code: 404, message: "لطفا توضیحات را وارد کنید", result: false, })
        }



        if (req.file) {
            const product = await Products.findByIdAndUpdate(id, {
                name
                , enName
                , price
                , category
                , smell
                , mil
                , description
                , count
                , brand
                , status: status
                , thumb: req.file.filename
                , slug: slugify(enName)
            })

            return response({
                res,
                code: 200,
                result: true,
                data: product,
                message: "محصول با موفقیت ویرایش شد"
            })
        }
        const product = await Products.findByIdAndUpdate(id, {
            name
            , enName
            , price
            , category
            , smell
            , mil
            , description
            , brand
            , count
            , status: status
            // , thumb: req.file.filename
            , slug: slugify(enName)
        })

        response({
            res,
            code: 200,
            result: true,
            data: product,
            message: "محصول با موفقیت ویرایش شد"
        })
    } catch (error) {
        response({
            res,
            code: 500,
            result: false,
            message: error.message,
            data: { error }
        })
    }
}

export const getProductController = async (req, res) => {
    try {
        const { count } = req.query

        const products = await Products.find({ status: 1 })            // .limit(12)
            .sort({ createdAt: -1 })
            .populate("category").populate("smell").populate("mil")

        // slice product from query 
        if (count) {
            console.log(count)
            const slicedProduct = products.slice(0, count)
            return res.status(200).json({
                result: true,
                data: slicedProduct,
                total: slicedProduct.length,

            })
        }
        res.status(200).json({
            result: true,
            data: products,
            total: products.length,

        })
    } catch (error) {
        response({
            res,
            code: 500,
            result: false,
            message: error.message,
            data: { error }
        })
    }
}


// **************** get All product for admin panel ****************
export const getAllProductForAdminController = async (req, res) => {
    try {
        const { count } = req.query

        const products = await Products.find()
            // .limit(12)
            .sort({ createdAt: -1 })
            .populate("category").populate("smell").populate("mil")

        // slice product from query 
        if (count) {
            console.log(count)
            const slicedProduct = products.slice(0, count)
            return res.status(200).json({
                result: true,
                data: slicedProduct,
                total: slicedProduct.length,

            })
        }
        res.status(200).json({
            result: true,
            data: products,
            total: products.length,

        })
    } catch (error) {
        response({
            res,
            code: 500,
            result: false,
            message: error.message,
            data: { error }
        })
    }
}



// ***********single product************

export const getSingleProductController = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Products.findById(id)
            // .select("-thumb")
            .populate("category").populate("smell").populate("mil")

        response({
            res,
            code: 200,
            message: '',
            data: product,
            result: true
        })

    } catch (error) {
        response({
            res,
            code: 500,
            result: false,
            message: error.message,
            data: { error }
        })
    }

}


// **************** get product photo *****************
export const productPhotoController = async (req, res) => {
    try {
        const product = await Products.findById(req.params.pid).select("photo")
        if (product.thumb.data) {
            res.set('Content-Type', product.thumb.contentType)
            return res.status(200).send(product.thumb.data)
        }
    } catch (error) {
        response({
            res,
            code: 500,
            result: false,
            message: error.message,
            data: { error }
        })
    }
}


// Delete Product 
// *********************************
export const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params
        await Products.findByIdAndDelete(id)
        response({
            res,
            code: 200,
            message: 'محصول حذف شد',
            result: true,
        })
    } catch (error) {
        response({
            res,
            code: 500,
            result: false,
            message: error.message,
            data: { error }
        })
    }
}

// *************** product page ****************

export const productPageListController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1

        const product = await Products.find({})
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 })


        response({
            res,
            code: 200,
            result: true,
            message: '',
            data: product
        })

        res.send

    } catch (error) {
        response({
            res,
            code: 500,
            result: false,
            message: error.message,
            data: { error }
        })
    }
}


// **************** product filter ****************

export const filterProductController = async (req, res) => {
    try {
        // const { checked, radio } = req.body
        const { checked } = req.body

        let args = {}
        if (checked.length > 0) args.category = checked
        // if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        console.log(req.body)
        const product = await Products.find(args)

        response({
            res,
            result: true,
            data: product,
            message: '',
            code: 200
        })
    } catch (error) {
        response({
            res,
            code: 500,
            result: false,
            message: error.message,
            data: { error }
        })
    }
}


// ************************* search product ******************
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params
        const product = await Products.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { enName: { $regex: keyword, $options: "i" } }
            ]
        })
        response({
            res,
            code: 200,
            data: product,
            result: true,
            message: ''
        })

    } catch (error) {
        response({
            res,
            code: 500,
            result: false,
            message: error.message,
            data: { error }
        })
    }
}

// **************** similar product ****************
export const similarProductController = async (req, res) => {
    try {
        const { cid } = req.params
        const product = await Products.find({
            category: cid
        })

        response({
            res,
            message: '',
            data: product,
            code: 200,
            result: true,
        })
    } catch (error) {
        response({
            res,
            code: 500,
            result: false,
            message: error.message,
            data: { error }
        })
    }
}