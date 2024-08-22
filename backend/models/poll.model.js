import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
    
    question : {
        type : String,
        required : true
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    options : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Option"
        }
    ],
    totalVotes : {
        type : Number,
        default: 0
    }
});

const Poll = mongoose.model("Poll",pollSchema);

export default Poll;