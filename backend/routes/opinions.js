const router = require ("express").Router();
const { Opinion, validate } = require("../models/OpinionModel");
const tokenVerification = require("../middleware/tokenVerification")
const { Task} = require("../models/TaskModel");
const {Category} = require("../models/CategoryModel");
const {Report} = require("../models/ReportModel");

router.post("/", tokenVerification, async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })
        const newOpinion = new Report({
            userId: req.user._id,
            ocena,
        })
        await newOpinion.save();
        if(req.body.zadanie){
            const task = await Task.findById(req.body.zadanie)
            if(!task){
                return res.status(404).send({ message: "Category not found"})
            }
            task.oceny.push(opinion._id)
            await task.save()
        }

        res.status(201).send({ message: "Task created successfully" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})

router.get("/:id", tokenVerification, async(req, res) => {
    try{
        const opinion = await Opinion.findById(req.params.id);
        res.status(200).json(opinion);
    } catch(error){
        res.status(404).json({message: 'Error przy get po id'});
    }
})


module.exports = router