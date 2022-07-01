const express = require('express'); 
const photosCTRL = require('../controllers/photos.controller');
const router = express.Router();
const validatePhotos = require('../validators/photos.validator');

router.post('/create',validatePhotos,photosCTRL.createPhotos);
router.delete('/delete/:token',photosCTRL.deletePhotos);
router.put('/update/:token',validatePhotos,photosCTRL.updatePhotos);
router.get('/getAll',photosCTRL.findAllPhotos);
router.get('/getAllPhotosUser/:token',photosCTRL.getAllPhotosUser);
router.get('/getPhotosWithComments/:token',photosCTRL.getPhotosWithComments); 
router.get('/getPhotosWithOutComments/:token',photosCTRL.getPhotosWithOutComments);

router.get('/get',photosCTRL.findPhotos);


module.exports = router;