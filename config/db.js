import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect("mongodb+srv://aithanihitesh5:hitesh1707@hitesh.tds2v.mongodb.net/?retryWrites=true&w=majority&appName=hitesh");
        console.log(`connected to database ${mongoose.connection.host}`)
    }
    catch(error){
        console.log(`Error while connection DB ${error}`);
        process.exit(1)
    }
}
export default connectDB 