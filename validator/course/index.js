const { createCourseSchema } = require("./schema");

function validateCreateCourseSchema(payload) {
    const validateResult = createCourseSchema.validate(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

module.exports = { validateCreateCourseSchema };