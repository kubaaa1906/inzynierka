const router = require ("express").Router();
const { Opinion, validate } = require("../models/OpinionModel");
const tokenVerification = require("../middleware/tokenVerification")
const { Task} = require("../models/TaskModel");
const {Category} = require("../models/CategoryModel");

router.post("/", tokenVerification, async (req, res) => {
    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    try {
        console.log("Dane z backendu: ", req.body);
        const existingOpinion = await Opinion.findOne({ userId: req.user._id, zadanie: req.body.zadanie });

        if(existingOpinion){
            return res.status(400).send({message: "Użytkownik już ocenił to zadanie"});
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

router.get("/user-rating/:zadanieId", tokenVerification, async(req, res) => {
    try{
        const userOpinion = await Opinion.findOne({
            userId: req.user._id,
            zadanie: req.params.zadanieId
        })

        if(userOpinion){
            return res.status(200).send({ ocena: userOpinion})
        }

        return res.status(200).send({ocena: null})
    } catch (error){
        res.status(500).send({ message: "Error"})
    }
})

router.get("/", tokenVerification, async(req, res) => {
    try{
        const { zadanieId } = req.query;

        const opinions = await Opinion.find({ zadanie: zadanieId });
        const avgRating = opinions.length ?
            (opinions.reduce((sum, o) => sum + o.ocena, 0) / opinions.length).toFixed(2) : null

        res.status(200).send({ opinions, avgRating })
    } catch (error){
        res.status(500).send({message: error.message})
    }
})


module.exports = router