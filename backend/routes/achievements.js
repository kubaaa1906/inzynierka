const router = require ("express").Router();
const {Achievement, validate}= require("../models/AchievementsModel");
const tokenVerification = require("../middleware/tokenVerification")
const authorizeRoles = require("../middleware/authorizeRoles");

router.post("/", tokenVerification, authorizeRoles("ADMIN"), async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })
        await new Achievement({ ...req.body}).save()
        res.status(201).send({ message: "Achievement created successfully" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})

router.get("/", tokenVerification, async(req, res) => {
    Achievement.find().exec()
        .then(async () => {
            const achievements = await Achievement.find();
            res.status(200).send({ data: achievements, message: "Lista osiagniec: "})
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        })
})


router.get("/:id", tokenVerification, async(req, res)=> {
    try {
        const achievement = await Achievement.findById(req.params.id);

        if(!achievement){
            return res.status(404).json({message: "Nie istnieje osiągnięcie o podanym ID"})
        }

        res.status(200).json(achievement);
    } catch (error){
        res.status(404).json({message: "Error przy get po id"});
    }
})

router.put("/:id", tokenVerification, authorizeRoles("ADMIN"), async(req, res) => {
    try{
        const updatedAchievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedAchievement);
    } catch (error){
        res.status(404).json({message: "Error przy update"});
    }
})

router.delete("/:id", tokenVerification, authorizeRoles("ADMIN"), async(req, res) => {
    try{
        await Achievement.findByIdAndDelete(req.params.id);
        res.json({ message: "Osiagniecie usuniete"});
    } catch (error){
        res.status(404).json({message: "Error przy delete"});
    }
})

module.exports = router