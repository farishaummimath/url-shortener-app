const mongoose = require('mongoose')
const Schema = mongoose.Schema
const sh = require("shorthash");


const bookmarkSchema = new Schema({
    title :{
        type : String,
        required : true
    },
    original_url : {
        type : String,
        required : true
    },
    tags : [String],
    hashedUrl : {
        type : String,
    },
    createdAt : {
        type : Date,
        default: Date.now()
    }
})
bookmarkSchema.pre('save', function (next) {
    const self = this;
    self.hashedUrl = sh.unique(self.original_url)    
    next()

}) 
bookmarkSchema.pre('findOneAndUpdate', function (next) {
    const self = this;
    self._update.hashedUrl = sh.unique(self._update.original_url)  
    console.log(self.hashedUrl)
    next()

}) 
const Bookmark = mongoose.model('Bookmark',bookmarkSchema)
module.exports = Bookmark
