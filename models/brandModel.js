import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    slug:{
        type:String,
        lowercase:true,
    }
})

const Brand = mongoose.model('brand', brandSchema)

export default Brand