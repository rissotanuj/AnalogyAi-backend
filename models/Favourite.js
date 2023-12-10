const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
    conceptName:{type:String,required:true},
    explanation:{type:String,required:true},
},{timestamps:true})

const favouriteSchema = mongoose.Schema({
    userID:{type:String,required:true},
    favouriteList:[listSchema]
})

const favouriteModel = mongoose.model("favouriteData",favouriteSchema)

module.exports={
    favouriteModel
}