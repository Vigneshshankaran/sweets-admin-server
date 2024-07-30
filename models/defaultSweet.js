const mongoose = require('mongoose');

const sweetSchema = new mongoose.Schema({
    sweetname: {type:String, required:true},
    sweetgram: {type:Number, required:true},
    sweetquantity:{type:Number, required:true} ,
});

const boxSchema = new mongoose.Schema({
    boxtype: {type:String, required:true},
    sweetweight: {type:String, required:true},
    sweets:[sweetSchema]
});

const Box = mongoose.model('Box', boxSchema)
module.exports = Box

