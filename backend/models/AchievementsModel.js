const mongoose = require("mongoose");
const Joi = require("joi");


const achievementSchema = new mongoose.Schema({
    nazwa: {type: String, required: true},
    opis: {type: String, required: true},
})

const Achievement = mongoose.model("Achievement", achievementSchema)

const validate = (data) => {
    const schema = Joi.object({
        nazwa: Joi.string().required().label("Nazwa osiągnięcia"),
        opis: Joi.string().required().label("Opis osiągnięcia")
    })
    return schema.validate(data)
}

module.exports = {Achievement, validate}