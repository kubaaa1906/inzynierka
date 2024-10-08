const router = require ("express").Router();
const { Application , validate } = require("../models/ApplicationModel");
const tokenVerification = require("../middleware/tokenVerification")
const {Task} = require("../models/TaskModel");


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
router.get("/", tokenVerification, async(req, res) => {
    //pobranie wszystkich taskow z bd
    console.log("Pokaz zgloszenia :)")
    Application.find().exec()
        .then(async () => {
            const applications = await Application.find();
            res.status(200).send({ data: applications, message: "Lista zgloszen: "})
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        })
})

router.get("/:id", tokenVerification, async(req, res) => {
    try{
        const application = await Application.findById(req.params.id);
        res.status(200).json(application);
    } catch(error){
        res.status(404).json({message: 'Error przy get po id'});
    }
})

router.put("/:id", tokenVerification, async(req, res) => {
    try{
        const updatedApplication = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedApplication);
    } catch (error){
        res.status(404).json({message: "Error przy update"});
    }
})

router.delete("/:id", tokenVerification, async(req, res) => {
    try{
        await Application.findByIdAndDelete(req.params.id);
        res.json({ message: "Zadanie usuniete"});
    } catch (error){
        res.status(404).json({message: "Error przy delete"});
    }
})


module.exports = router