const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const userSchema = new mongoose.Schema({
    nazwa: {type: String, required: true},
    email: {type: String, required: true},
    haslo: {type: String, required: true},
    imieDziecka: {type: String, required: false},
    wiekDziecka: {type: String, required: true},
    rola: {type: String, enum: ["USER", "ADMIN"], default: "USER"},
    osiagniecia: [{order: {type: mongoose.Schema.Types.ObjectId, ref: 'Achievement'},
        date: {type: Date, default: Date.now }}],
    tasksCompleted: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
    memoryGameCompleted: { type: Number, default: 0 },
    dragNDropGameCompleted: { type: Number, default: 0 }
})
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id, rola: this.rola}, process.env.JWTPRIVATEKEY, {
        expiresIn: "60d",
    })
}
const User = mongoose.model("User", userSchema)
const validate = (data) => {
    const schema = Joi.object({
        nazwa: Joi.string().required().label("Nazwa uzytkownika"),
        email: Joi.string().email().required().label("Email"),
        haslo: passwordComplexity().required().label("Haslo"),
        imieDziecka: Joi.string().required().label("Imie"),
        wiekDziecka: Joi.number().required().label("Wiek"),
        rola: Joi.string().valid("USER", "ADMIN").label("Rola")
    })
    return schema.validate(data)
}

module.exports = { User, validate };
