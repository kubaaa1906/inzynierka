const mongoose = require("mongoose");
const Joi = require("joi");

const taskSchema = new mongoose.Schema({
    nazwaZadania: { type: String, required: true },
    opis: { type: String, required: true },
    tresc: { type: String, required: true },
    wszystkieOdpowiedzi: [{ tekst: { type: String, required: true }, czyPoprawna: { type: Boolean, default: false }}],
    typZadania: { type: String, required: true},
    kategoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    oceny: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Opinion'}],
})

const Task = mongoose.model("Task", taskSchema)

const validate = (data) => {
    const schema = Joi.object({
        nazwaZadania: Joi.string().required().label("Nazwa zadania"),
        opis: Joi.string().required().label("Opis"),
        tresc: Joi.string().required().label("Tresc"),
        wszystkieOdpowiedzi: Joi.array()
            .items(
                Joi.object({
                    tekst: Joi.string().required().label("Tekst odpowiedzi"),
                    czyPoprawna: Joi.boolean().label("Czy poprawna"),
                })
            )
            .min(2)
            .max(4)
            .label("Wszystkie odpowiedzi"),
        typZadania: Joi.string().required().label("Typ zadania"),
        kategoria: Joi.string().required().label("Kategoria"),
        ocena: Joi.number().label("Ocena zadania")
    })

    return schema.validate(data)
}

module.exports = { Task, validate }

