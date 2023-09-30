import { response } from "../helper/Response.js"
import Gallery from "../models/galleryModel.js";


export const uploadImage = async (req, res) => {
    const { product_id } = req.body;
    try {
        if (product_id) {
            const addImage = await Gallery({
                name: req.file.filename,
                imageUrl:req.file.path,
                product_id: product_id,
            })

            await addImage.save().then((resp) => {
                response({
                    res,
                    code: 200,
                    message: "عکس به محصول اضافه شد",
                    data: resp,
                    result: true
                })
            }, (err) => {
                response({
                    res,
                    code: err.code,
                    message: err.message,
                    data: err,
                    result: false
                })
            })


            // if (saveImage) {
            //     return response({
            //         res,
            //         code: 400,
            //         result: false,
            //         message: "مشکلی در اضافه کردن عکس پیش آمد",
            //     })
            // }
        } else {
            return response({
                res,
                code: 404,
                result: false,
                message: "لطفا محصول را انتخاب کنید",
            })
        }
    } catch (error) {
        return response({
            res,
            code: 500,
            result: false,
            message: "(photo-upload)",
            data: { error }

        })
    }

}

export const getImageFromProductId = async (req, res) => {
    const { id } = req.params;
    try {
        const findImage = await Gallery.find({ product_id:id })
        console.log(findImage)
        if (id) {
             response({
                res,
                code: 200,
                data: findImage,
                message: "All images found",
                result: true
            })
        }

        

    } catch (error) {
        return response({
            res,
            code: 500,
            result: false,
            message: "(photo-get)",
            data: { error }

        })
    }
}