const mongoose=require('mongoose');
const { Schema } = mongoose;

const userSchema=new Schema({
    _id:{type:String},
    email:{type:String,required:true},
    password:{type:String,required:true},
    name:{type:String,required:true},
    active:{type:Boolean,required:true},
    photoProfile:{type:String},
});

module.exports = mongoose.model('user',userSchema);
