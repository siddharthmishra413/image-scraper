const express =require('express');
const user =require('../handler/userHandler');


const router=express.Router();
router.post('/images',user.ImagesFromGoogle);
router.post('/imageUpload',user.uploadFiles);
router.get('/KeyWordsFromDB',user.KeyWordsFromDB);
router.post('/gettingImages',user.gettingImages);
router.post('/getAllImages',user.getAllImages);

module.exports= router;
