const router = require("express").Router();
const { User } = require("../models/UserModel");
const bcrypt = require("bcrypt");
const Joi = require("joi");


//Logowanie użytkownika
router.post("/", async (req, res) => {
    try{
        const {error} = validate(req.body);
        if(error){
            return res.status(400).send({ message: error.details[0].message })
        }

        const user = await User.findOne({ nazwa: req.body.nazwa })
        if(!user){
            return res.status(401).send({ message: "Nieprawidłowa nazwa użytkownika lub hasło"})
        }

        const validPassword = await bcrypt.compare(
            req.body.haslo,
            user.haslo
        )

        if(!validPassword){
            return res.status(401).send({ message: "Nieprawidłowa nazwa użytkownika lub hasło"})
        }

        const token = user.generateAuthToken();
        res.status(200).send({data: token, message: "Zalogowano poprawnie"})
    } catch (error){
        res.status(500).send({ message: "Błąd serwera: ", error})
    }
})

//walidacja logowania
const validate = (data) => {
    const schema = Joi.object({
        nazwa: Joi.string().required().label("Username"),
        haslo: Joi.string().required().label("Password"),
    })
    return schema.validate(data)
}

module.exports = router