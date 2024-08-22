import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import pollRoutes from "./routes/poll.route.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import Option from "./models/option.model.js";
import Poll from "./models/poll.model.js";

const app =express();
const PORT= process.env.PORT || 5000 ;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/poll", pollRoutes);

// app.get("/support", async (req,res) =>{
//     const newOption = new Option({
//         option : "new Option 3"
//     });
    
//     if(newOption){
//         const optionId = await newOption.save();
//         console.log(JSON.stringify(optionId._id));
//     }
//     const polls = await Poll.find().select("question");
//     console.log(polls);
//     res.send("Hello World");
// });

app.listen(PORT, ()=>{
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
})

