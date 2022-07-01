const mongoose=require('mongoose');
const { Schema } = mongoose;

const photosSchema=new Schema({
    _id:{type:String},
    _id_user:{type:String,required:true}, 
    path:{type:String,required:true},
});

module.exports = mongoose.model('photos',photosSchema); 
