const mongoose = require("mongoose");
const Joi = require("joi");

const imageSchema = new mongoose.Schema({
    nazwa: {type: String, required: true},
    link: {type: String, required: true}
})

const Image = mongoose.model("Image", imageSchema)

const validate = (data) => {
    const schema = Joi.object({
        nazwa: Joi.string().required().label("Nazwa obrazka"),
        link: Joi.string().required().label("Odnośnik do obrazka")
    })
    return schema.validate(data)
}

module.exports = {Image, validate}