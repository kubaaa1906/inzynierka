const router = require ("express").Router();
const { Opinion} = require("../models/OpinionModel");
const tokenVerification = require("../middleware/tokenVerification")
const { Task} = require("../models/TaskModel");

router.post("/", tokenVerification, async (req, res) => {


    try {
        console.log("Dane z backendu: ", req.body);
        const existingOpinion = await Opinion.findOne({ userId: req.body.userId, zadanie: req.body.zadanie._id });
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
        res.status(201).send({ message: "Opinia została dodana!" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get("/:id", tokenVerification, async(req, res) => {
    try{
        const opinion = await Opinion.findById(req.params.id).populate('zadanie');

        if(!opinion){
            return res.status(404).json({ message: "Ocena o podanym ID nie istnieje"})
        }
        res.status(200).json(opinion);
    } catch(error){
        res.status(404).json({message: 'Error przy get po id'});
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