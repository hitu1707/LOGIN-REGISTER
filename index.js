import dotenv from "dotenv";                                                            
import Express from "express";
import cors from "cors";
import morgan from "morgan";  
import connectDB from "./config/db.js";
import userRouter from "./routes/userRouter.js";

dotenv.config({
    path: "./env"
})

connectDB();

const app = Express();

app.use(cors());
app.use(Express.json());
app.use(morgan("dev"));

app.use('/api/v1/auth', userRouter);

const PORT = process.env.PORT || 5000; 

app.listen(PORT,()=>{
    console.log(`Server running in ${PORT}`);   
}   )