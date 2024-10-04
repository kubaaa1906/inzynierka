const router = require ("express").Router();
const { Application , validate } = require("../models/ApplicationModel");
const tokenVerification = require("../middleware/tokenVerification")
const roleVerification = require("../middleware/roleVerification")


//Funkcja do dodawania zadań
router.post("/", tokenVerification, async (req, res) => {
    try {
        const { tytul, opis } = req.body
        const newApplication = new Application({
            userId: req.user._id,
            tytul,
            opis,
        })
        await newApplication.save()
        res.status(201).send({ message: "Application created successfully" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})

//Funkcja do listowania zgloszen
router.get("/", tokenVerification, roleVerification, async(req, res) => {
    //pobranie wszystkich taskow z bd
    console.log("Pokaz zadania :)")
    try {
        const reports = await Report.find().populate('userId', 'email');
        res.json(reports);
    } catch (err) {
        res.status(500).json({ message: 'Błąd serwera' });
    }
})

module.exports = router