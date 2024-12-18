const router = require ("express").Router();
const { Report , validate } = require("../models/ReportModel");
const tokenVerification = require("../middleware/tokenVerification")
const {Task} = require("../models/TaskModel");


router.post("/", tokenVerification, async (req, res) => {
    try {
        console.log("dane z backendu:", req.body)
        const { tytul, opis } = req.body
        const newReport = new Report({
            userId: req.user._id,
            tytul,
            opis,
        })
        await newReport.save()
        res.status(201).send({ message: "Report created successfully" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})

router.get("/", tokenVerification, async(req, res) => {
    console.log("Pokaz zgloszenia :)")
    Report.find().exec()
        .then(async () => {
            const reports = await Report.find();
            res.status(200).send({ data: reports, message: "Lista zgloszen: "})
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        })
})

router.get("/:id", tokenVerification, async(req, res) => {
    try{
        const report = await Report.findById(req.params.id);
        if(!report){
            return res.status(404).json({message: "Zgłoszenie o podanym ID nie istnieje"})
        }
        res.status(200).json(report);
    } catch(error){
        res.status(404).json({message: 'Error przy get po id'});
    }
})

router.put("/:id", tokenVerification, async(req, res) => {
    try{
        const updatedReport = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updatedReport){
            return res.status(404).json({message: "Zgłoszenie o podanym ID nie istnieje"})
        }
        res.status(200).json(updatedReport);
    } catch (error){
        res.status(404).json({message: "Error przy update"});
    }
})

router.delete("/:id", tokenVerification, async(req, res) => {
    try{
        const report = await Report.findByIdAndDelete(req.params.id);
        if(!report){
            return res.status(404).json({message: "Zgłoszenie o podanym ID nie istnieje"})
        }
        res.json({ message: "Zadanie usuniete"});
    } catch (error){
        res.status(404).json({message: "Error przy delete"});
    }
})


module.exports = router