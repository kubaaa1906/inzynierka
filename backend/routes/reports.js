const router = require ("express").Router();
const { Report  } = require("../models/ReportModel");
const tokenVerification = require("../middleware/tokenVerification")
const authorizeRoles = require("../middleware/authorizeRoles");
const {User} = require("../models/UserModel");


router.post("/", tokenVerification, async (req, res) => {
    try {
        const { tytul, opis } = req.body
        const newReport = new Report({
            userId: req.user.id,
            tytul: tytul,
            opis: opis,
        })
        await newReport.save()
        res.status(201).send({message:"Zgłoszenie utworzone pomyślnie, dziękujemy!",report: newReport})
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error })
    }
})

router.get("/", tokenVerification, authorizeRoles("ADMIN"), async(req, res) => {
    Report.find().exec()
        .then(async () => {
            const reports = await Report.find().populate('userId');
            console.log(reports)
            res.status(200).send({ data: reports, message: "Lista zgloszen: "})
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        })
})

router.get("/:id", tokenVerification, authorizeRoles("ADMIN"), async(req, res) => {
    try{
        const report = await Report.findById(req.params.id).populate('userId');
        if(!report){
            return res.status(404).json({message: "Zgłoszenie o podanym ID nie istnieje"})
        }
        res.status(200).json(report);
    } catch(error){
        res.status(404).json({message: 'Error przy get po id'});
    }
})

router.put("/:id", tokenVerification, authorizeRoles("ADMIN"), async(req, res) => {
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

router.delete("/:id", tokenVerification, authorizeRoles("ADMIN"), async(req, res) => {
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