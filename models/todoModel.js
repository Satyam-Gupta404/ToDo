import mongoose from "mongoose";

const todoSchema=new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Must have an owner"],
    },
    title:{
        type:String,
        required:[true,"Provide a title."],
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
});

const Todo=mongoose.model("Todo",todoSchema);

export default Todo;