import mongoose, { mongo } from "mongoose";

const optionSchema = new mongoose.Schema({
    option : {
        type : String,
        required : true
    },
    votedBy : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User"
            }
    ],
    voteCount: {
        type: Number,
        default : 0
    }
});

const Option = mongoose.model("Option", optionSchema);

export default Option;