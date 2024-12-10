const mongoose = require("mongoose");
const Joi = require("joi");

const difficultySchema = new mongoose.Schema({
    nazwa: {type: String, required: true},
    opis: {type: String, required: true}
})

const Difficulty = mongoose.model("Difficulty", difficultySchema)

const validate = (data) => {
    const schema = Joi.object({
        nazwa: Joi.string().required().label("Nazwa poziomu trudności"),
        opis: Joi.string().required().label("Sugerowany przydział wiekowy")
    })

    return schema.validate(data)
}


module.exports = { Difficulty, validate }