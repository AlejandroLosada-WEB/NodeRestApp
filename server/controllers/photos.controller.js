const Photos = require('../models/photos.model');
const mongoose = require('mongoose');
const fs = require('fs');
photosCTRL = {};




//CREATE REGISTER

photosCTRL.createPhotos = async (req, res) => {
    const photos = new Photos(req.body);
    photos._id = mongoose.Types.ObjectId();
    let resul = await photos.save();
    if (resul == null) {
        res.status(200).send({ Message: 'Error al crear el registro' });
    } else {
        res.status(200).send({ Message: 'Registro completado' });
    }
}


//DELETE REGISTER

photosCTRL.deletePhotos = async (req, res) => {
    const photos = new Photos();
    photos._id = req.params.token;
    console.log(photos._id)
    let photo = await Photos.findById(photos._id);
    if (photo == null) {
        res.status(200).send({ Message: 'Error al borrar el registro' });
    }else{
        try {
            fs.unlinkSync(photo.path)
        } catch(err) {
            console.error(err)
        }
        let resul = await Photos.findByIdAndDelete(photo._id);
        if (resul == null) {
            res.status(200).send({ Message: 'Error al borrar el registro' });
        } else {
            res.status(200).send({ Message: 'Registro borrado' });
        }
    }
}


//UPDATE REGISTER

photosCTRL.updatePhotos = async (req, res) => {
    let resul = await Photos.findByIdAndUpdate(req.params.token, { $set: req.body }, { new: true });
    if (resul == null) {
        res.status(200).send({ Message: 'Error al actualizar el registro' });
    } else {
        res.status(200).send({ Message: 'Registro actualizado' });
    }
}


//FIND ALL REGISTERS

photosCTRL.findAllPhotos = async (req, res) => {
    const photos = await Photos.find();
    res.json(photos);
}

photosCTRL.getAllPhotosUser = async (req, res) => {
    const token=req.params.token;
    const photos = await Photos.find({_id_user:token});
    res.json(photos);
}

photosCTRL.getPhotosWithComments = async (req, res) => {
    const token=req.params.token;
    //const photos = await Photos.find({_id_user:token});
    let retorno=[];
    const photos=await Photos.aggregate([
            { 
                $match: {_id_user:token}
            },
            { 
                $lookup: { 
                from: "photos_comments",
                localField: "_id",
                foreignField: "_id_photo",
                as: "comments",
                
            },
        }
    ]);
    for(let i=0;i<photos.length;i++){
        if(photos[i].comments.length>0){
            retorno.push(photos[i]);
        }
    }
    
    res.json(retorno);
}

photosCTRL.getPhotosWithOutComments = async (req, res) => {
    const token=req.params.token;
    //const photos = await Photos.find({_id_user:token});
    let retorno=[];
    const photos=await Photos.aggregate([
            { 
                $match: {_id_user:token}
            },
            { 
                $lookup: { 
                from: "photos_comments",
                localField: "_id",
                foreignField: "_id_photo",
                as: "comments",
                
            },
        }
    ]);
    for(let i=0;i<photos.length;i++){
        if(photos[i].comments.length==0){
            retorno.push(photos[i]);
        }
    }
    
    res.json(retorno);
}





//FIND REGISTER BY ID

photosCTRL.findPhotos = async (req, res) => {
    const photos = await Photos.findById(req.params.id);
    res.json(photos);
}



module.exports = photosCTRL;