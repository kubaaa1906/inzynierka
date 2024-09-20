const router = require("express").Router()
const { User, validate } = require("../models/UserModel")
const bcrypt = require("bcrypt")

router.post("/", async (req,res) => {
    try{
        const {error} = validate(req.body)
        if(error){
            return res.status(400).send({message: error.details[0].message})
        }

        const user = await User.findOne({ nazwa: req.body.nazwa })
        if(user)
            return res
                .status(409)
                .send({ message: "User with given username already Exist!"})

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.haslo, salt)

        await new User({ ...req.body, haslo: hashPassword }).save()
        res.status(201).send({ message: "User created successfully" })
    } catch (error){
        res.status(500).send({message: "Internal Server Error" })
    }
})

module.exports = router