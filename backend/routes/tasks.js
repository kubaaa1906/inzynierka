const router = require ("express").Router();
const { Task, validate } = require("../models/TaskModel");
const tokenVerification = require("../middleware/tokenVerification")
const {Category} = require("../models/CategoryModel");


//Funkcja do dodawania zadań
router.post("/", tokenVerification, async (req, res) => {
    try {
        console.log(req.body)
        const { error } = validate(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })
        await new Task({ ...req.body}).save()
        if(req.body.kategoria){
            const category = await Category.findById(req.body.kategoria)
            if(!category){
                return res.status(404).send({ message: "Category not found"})
            }
            category.zadania.push(task._id)
            await category.save()
        }

        res.status(201).send({ message: "Task created successfully" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})

//Funkcja do listowania zadań
router.get("/", tokenVerification, async(req, res) => {
    //pobranie wszystkich taskow z bd
    console.log("Pokaz zadania :)")
    Task.find().exec()
        .then(async () => {
            const tasks = await Task.find().populate('kategoria').populate('oceny');
            res.status(200).send({ data: tasks, message: "Lista zadań: "})
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        })
})

//listowanie zadania po id
router.get("/:id", tokenVerification, async(req, res)=> {
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).json(task);
    } catch (error){
        res.status(404).json({message: "Error przy get po id"});
    }
})

//edit pojedynczego taska
router.put("/:id", tokenVerification, async(req, res) => {
    try{
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTask);
    } catch (error){
        res.status(404).json({message: "Error przy update"});
    }
})

//delete pojedynczego taska
router.delete("/:id", tokenVerification, async(req, res) => {
    try{
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Zadanie usuniete"});
    } catch (error){
        res.status(404).json({message: "Error przy delete"});
    }
})

module.exports = router