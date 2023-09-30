import mongoose from 'mongoose'
import colors from 'colors'
const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/vahidperfume')
        console.log(`Connecting to database ${conn.connection.host}`.bgGreen)
    } catch (error) {
        console.log(`Error connecting to ${error}`.bgRed)
    }
}
export default connectDB