const { Course } = require("../../models");
const { validateCreateCourseSchema } = require("../../validator/course");
const fs = require("fs");
const path = require('path');

module.exports = {
  handlerAllCourse: async (req, res, next) => {
    try {
      const course = await Course.findAll();
      
      
      res.status(200).json({
        status: "success",
        message: "Successfully get all courses",
        data: course.map((x) => ({
          id: x.id,
          judul: x.judul,
          isi: x.isi,
          image: x.image,
          createdAt: x.createdAt,
          updatedAt: x.updatedAt,
        })),
      });
    } catch (error) {
      next(error);
    }
  },
  handlerCourseById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const course = await Course.findByPk(id);
      if (course) {
        course.judul = course.judul;
        course.isi = course.isi;
        course.image = course.image;
      }
      res.status(200).json({
        status: "success",
        message: "Successfully get course",
        data: course,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPostCourse: async (req, res, next) => {
    try {
      const { judul, isi } = req.body;

      if(!req.file){
        throw new Error('image required');
      }
      const publicUrl = req.file.publicUrl;
      
      validateCreateCourseSchema({ judul, isi });
      const img = req.file;
      if (!img) {
        throw new Error("Image not found");
      }

      const course = await Course.create({
        judul: judul,
        isi: isi,
        image: publicUrl,
      });

      res.status(200).json({
        status: "success",
        message: "Successfully create course",
        data: course,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerImagePost: async (req, res, next) => {
    try {
      const img = req.file;
      if (!img) {
        throw new Error("Image not found");
      }
      console.log(img.path);
      const encFile = await saveFile(req.file);
      res.status(200).json({
        status: "success",
        data: encFile,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetImage: async (req, res, next) => {
    const { id } = req.params;
    const dataImage = await Course.findByPk(id, {
      attributes: ['image'],
    });
    const encryptedHex = fs.readFileSync(
      `./public/uploads/${dataImage.image.replace("/", "")}`,
      "utf8"
    );
    const base64 = await decryptFile(encryptedHex);
    
    res.status(200).json({
      image: `data:image/jpeg;base64,${base64}`,
    });
  }
};
