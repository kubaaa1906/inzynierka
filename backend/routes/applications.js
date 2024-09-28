const router = require ("express").Router();
const { Application , validate } = require("../models/ApplicationModel");
const tokenVerification = require("../middleware/tokenVerification")


//Funkcja do dodawania zadań
router.post("/", tokenVerification, async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })
        await new Application({ ...req.body}).save()
        res.status(201).send({ message: "Application created successfully" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})

//Funkcja do listowania zgloszen
router.get("/", tokenVerification, async(req, res) => {
    //pobranie wszystkich taskow z bd
    console.log("Pokaz zadania :)")
    Application.find().exec()
        .then(async () => {
            const applications = await Application.find();
            res.status(200).send({ data: applications, message: "Lista zgłoszeń: "})
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        })
})

module.exports = router