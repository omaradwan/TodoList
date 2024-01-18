const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
    description: {
        type:String,
        required: true
    },
    done:{
        type:Boolean,
        default:false
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model("ToDo",ToDoSchema)