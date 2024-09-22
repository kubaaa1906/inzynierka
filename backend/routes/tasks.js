const router = require ("express").Router();
const { Task, validate } = require("../models/TaskModel");
const tokenVerification = require("../middleware/tokenVerification")


//Funkcja do dodawania zadań
router.post("/", tokenVerification, async (req, res) => {
    try {
        const { error } = validate(req.body)
        if(error){
            return res.status(500).send({message: error.details[0].message})
        }
        await new Task({ ...req.body}).save()
        res.status(201).send({ message: "Zadanie zostalo pomyslnie dodane"})
    } catch (error){
        res.status(500).send({ message: "Internal Server Error"})
    }
})

//Funkcja do listowania zadań
router.get("/", tokenVerification, async(req, res) => {
    //pobranie wszystkich taskow z bd
    console.log("Pokaz zadania :)")
    Task.find().exec()
        .then(async () => {
            const tasks = await Task.find();
            res.status(200).send({ data: tasks, message: "Lista zadań: "})
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        })
})

module.exports = router