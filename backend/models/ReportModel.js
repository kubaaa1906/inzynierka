const mongoose = require("mongoose");
const Joi = require("joi");

const reportSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    tytul: { type: String, required: true },
    opis: { type: String, required: true },
    dataZgloszenia: { type: Date, default: Date.now },
    status: { type: String, default: 'Oczekujacy' },
})

const Report = mongoose.model("Report", reportSchema)

const validate = (data) => {
    const schema = Joi.object({
        tytul: Joi.string().required().label("Tytuł zgłoszenia"),
        opis: Joi.string().required().label("Opis zgłoszenia"),
    })

    return schema.validate(data)
}

module.exports = { Report, validate }

