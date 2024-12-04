const mongoose = require("mongoose");
const Joi = require("joi");

const opinionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    zadanie: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    ocena: { type: Number, required: true, min: 1, max: 5 },
})

const Opinion = mongoose.model("Opinion", opinionSchema);

const validate = (data) => {
    const schema = Joi.object({
        ocena: Joi.number().required().min(1).max(5),
        zadanie: Joi.string().required().label("Zadanie"),
    })

    return schema.validate(data)
}

module.exports = {Opinion, validate};