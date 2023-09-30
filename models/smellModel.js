import mongoose from "mongoose";


const smellSchema = new mongoose.Schema({
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

const Smell = mongoose.model('smell', smellSchema)

export default Smell