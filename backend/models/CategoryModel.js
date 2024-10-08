const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
    nazwaKategorii: { type: String, required: true },
    dziedzinaNaukowa: { type: String, enum: ['Matematyka', 'Przyroda', 'Zadania logiczne', 'Historia'] ,required: true },
    przedzialWiekowy: { type: String, enum: ['3','4','5'], required: true },
    zadania: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
})

const Category = mongoose.model("Category", categorySchema)

const validate = (data) => {
    const schema = Joi.object({
        nazwaKategorii: Joi.string().required().label("Nazwa kategorii"),
        dziedzinaNaukowa: Joi.string().valid('Matematyka', 'Przyroda', 'Zadania logiczne', 'Historia').required(),
        przedzialWiekowy: Joi.string().valid('3', '4', '5').required(),
    })

    return schema.validate(data)
}


module.exports = { Category, validate }
