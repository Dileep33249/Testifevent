import mongoose from "mongoose"
import express from "express"
import cors from  "cors"
import route from "./routes/route.js"



const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
))
mongoose.connect('mongodb://localhost:27017').then(()=>{
    console.log('db connected')
}).catch((err)=>{
    console.log(err);
})

app.use('/userroutes',route)

// userroutes/signup
app.listen(4000,()=>{
console.log("db is running on port ")
})