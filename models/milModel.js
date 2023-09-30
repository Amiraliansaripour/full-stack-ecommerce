import mongoose from "mongoose";


const milSchema = new mongoose.Schema({
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

const Mil = mongoose.model('mil', milSchema)

export default Mil