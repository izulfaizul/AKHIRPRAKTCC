const express = require('express');
const authenticationToken = require('../../middleware/authenticationToken');
const { handlerAllCourse, handlerPostCourse, handlerCourseById, handlerImagePost, handlerGetImage } = require('./handler');

const router = express.Router();
const uploadImage = require('../../utils/multerImage')
const uploadToStorage = require('../../utils/googleStorage')

router.get("/", handlerAllCourse);
router.post('/image', uploadImage.single("Image"), handlerImagePost)
router.get('/image/:id', handlerGetImage);
router.get("/:id", handlerCourseById);
router.post("/", uploadImage.single("Image"), uploadToStorage, handlerPostCourse);


module.exports = router;