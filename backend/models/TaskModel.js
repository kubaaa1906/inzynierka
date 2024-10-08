const mongoose = require("mongoose");
const Joi = require("joi");

const taskSchema = new mongoose.Schema({
    nazwaZadania: { type: String, required: true },
    opis: { type: String, required: true },
    tresc: { type: String, required: true },
    poprawnaOdpowiedz: { type: String, required: true },
    kategoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
})

const Task = mongoose.model("Task", taskSchema)

const validate = (data) => {
    const schema = Joi.object({
        nazwaZadania: Joi.string().required().label("Nazwa zadania"),
        opis: Joi.string().required().label("Opis"),
        tresc: Joi.string().required().label("Tresc"),
        poprawnaOdpowiedz: Joi.string().required().label("Poprawna odpowiedz"),
    })

    return schema.validate(data)
}

module.exports = { Task, validate }

