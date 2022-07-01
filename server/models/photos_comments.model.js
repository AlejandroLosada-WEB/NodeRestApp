const mongoose=require('mongoose');
const { Schema } = mongoose;

const photos_commentsSchema=new Schema({
_id:{type:String},
_id_photo:{type:String,required:true},
_id_user_photo:{type:String,required:true},
_id_user_comment:{type:String,required:true},
name_user_comment:{type:String,required:true},
path_avatar_user_comment:{type:String,required:true},
fecha:{type:String,required:true},
hora:{type:String,required:true}, 
date:{type:Date,required:true},
comment:{type:String,required:true},
});

module.exports = mongoose.model('photos_comments',photos_commentsSchema);
