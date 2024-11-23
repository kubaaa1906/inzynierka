const router = require ("express").Router();
const { Opinion, validate } = require("../models/OpinionModel");
const tokenVerification = require("../middleware/tokenVerification")
const { Task} = require("../models/TaskModel");
const {Category} = require("../models/CategoryModel");

router.post("/", tokenVerification, async (req, res) => {
    try {
        console.log("Dane z backendu: ", req.body);
        const { error } = validate(req.body);

        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const { zadanie, ocena } = req.body;

        if(!zadanie || !ocena){
            return res.status(400).send({message: "Brak wymaganych danych"})
        }

        const newOpinion = new Opinion({
            userId: req.user._id,
            zadanie,
            ocena,
        });

        await newOpinion.save();

        if (zadanie) {
            const task = await Task.findById(zadanie);
            if (!task) {
                return res.status(404).send({ message: "Zadanie nie istnieje" });
            }

            task.oceny.push(newOpinion._id);
            await task.save();
        }

        res.status(201).send({ message: "Opinion created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get("/:id", tokenVerification, async(req, res) => {
    try{
        const opinion = await Opinion.findById(req.params.id).populate('zadanie');

        if(!opinion){
            return res.status(404).json({ message: "Opinion nie istnieje"})
        }
        res.status(200).json(opinion);
    } catch(error){
        res.status(404).json({message: 'Error przy get po id'});
    }
})

router.get("/", tokenVerification, async(req, res) => {
    Opinion.find().exec()
        .then(async () => {
            const opinions = await Opinion.find().populate('zadanie');
            res.status(200).send({ data: opinions, message: "Lista opinii: "})
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        })
})


module.exports = router