const mongoose = require("mongoose");
const Joi = require("joi");

const opinionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    zadanie: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    ocena: { type: Number, enum: ['1', '2', '3', '4', '5'], required: true },
})

const Opinion = mongoose.model("Opinion", opinionSchema);

const validate = (data) => {
    const schema = Joi.object({
        ocena: Joi.number().valid('1', '2', '3', '4', '5').required(),
    })

    return schema.validate(data)
}

module.exports = {Opinion, validate};