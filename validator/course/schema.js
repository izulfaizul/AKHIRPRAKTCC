const Joi = require('joi');

const createCourseSchema = Joi.object({
    judul: Joi.string().required(),
    isi: Joi.string().required(),
}).unknown();

module.exports = { createCourseSchema };