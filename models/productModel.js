import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    enName: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'category',
        required: true,
    },
    smell: {
        type: mongoose.ObjectId,
        ref: 'smell',
        required: true,
    },
    mil: {
        type: mongoose.ObjectId,
        ref: 'mil',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    body: {
        type: String
    },
    thumb: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    brand:{
        type: String,
    }
}, { timestamps: true })

const Products = mongoose.model('products', productSchema)

export default Products