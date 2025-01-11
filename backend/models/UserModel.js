const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const {Progress} = require("./ProgressModel");

const userSchema = new mongoose.Schema({
    nazwa: {type: String, required: true},
    email: {type: String, required: true},
    haslo: {type: String, required: true},
    imieDziecka: {type: String, required: false},
    wiekDziecka: {type: String, required: true},
    czyAdmin: {type: Boolean, required: false},
    osiagniecia: [{order: {type: mongoose.Schema.Types.ObjectId, ref: 'Achievement'},
        date: {type: Date, default: Date.now }}],
    tasksCompleted: {type: Progress, required: true},
    memoryGameCompleted: { type: Number, default: 0 },
    dragNDropGameCompleted: { type: Number, default: 0 }
})

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {
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
        czyAdmin: Joi.boolean().label("Uprawnienia administratora")
    })
    return schema.validate(data)
}



module.exports = { User, validate };
