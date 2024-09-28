const mongoose = require("mongoose");
const Joi = require("joi");

const applicationSchema = new mongoose.Schema({
    tytul: { type: String, required: true },
    opis: { type: String, required: true },
    dataZgloszenia: { type: Date, required: false },
})

const Application = mongoose.model("Application", applicationSchema)

const validate = (data) => {
    const schema = Joi.object({
        tytul: Joi.string().required().label("Tytuł zgłoszenia"),
        opis: Joi.string().required().label("Opis zgłoszenia"),
        dataZgloszenia: Joi.date().label("Data zgłoszenia"),
    })

    return schema.validate(data)
}

module.exports = { Application, validate }

