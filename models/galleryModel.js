import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    name:{
        type:String,
    },
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products"
    },
    imageUrl:{
        type:String,
    }
})

const Gallery = mongoose.model("gallery",gallerySchema);

export default Gallery;