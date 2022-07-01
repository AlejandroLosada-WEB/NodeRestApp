const express = require('express');
const userCTRL = require('../controllers/user.controller');
const {validateUser,validateLogin,validateToken,validateEmail} = require('../validators/user.validator');
const router = express.Router();
 

 
router.post('/login',validateLogin,userCTRL.loginUser);
router.post('/verify/:token',userCTRL.verifyToken);
router.post('/photoprofile/:token',validateToken,userCTRL.photoUpload);
router.post('/create',validateUser,userCTRL.createUser);
router.post('/password',userCTRL.changePassword);
router.get('/activate/:token',validateToken,userCTRL.activateUser);
router.get('/forgot/:token',validateEmail,userCTRL.forgotMailUser);
router.get('/verify/:token',validateToken,userCTRL.verifyToken);
router.post('/gettoken',validateUser,userCTRL.getToken);
router.delete('/delete/:token',validateToken,userCTRL.deleteUser);
router.put('/update/:token',validateToken,userCTRL.updateUser);
router.get('/getAll',userCTRL.findAllUser);
router.get('/get',userCTRL.findUser);
router.post('/imagen/photos',userCTRL.imgPhotos);

module.exports = router;