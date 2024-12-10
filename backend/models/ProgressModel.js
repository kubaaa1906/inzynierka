const mongoose = require("mongoose");
const Joi = require("joi");


const progressSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    ukonczoneZadania: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]
})

const Progress = mongoose.model("Progress", progressSchema)

const validate = (data) =>{
    const schema = Joi.object({
        userId: Joi.required().label("Id użytkownika"),
        ukonczoneZadania: Joi.required().label("Ukończone zadania")
    })
    return schema.validate(data)
}

module.exports = {Progress, validate}