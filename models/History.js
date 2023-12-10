const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
    conceptName:{type:String,required:true},
    explanation:{type:String,required:true},
},{timestamps:true})

const historySchema = mongoose.Schema({
    userID:{type:String,required:true},
    historyList:[listSchema]
})

const historyModel = mongoose.model("historyData",historySchema)

module.exports={
    historyModel
}