const router = require("express").Router()
const {Progress, validate} = require("../models/ProgressModel")


router.post("/", async (req, res) =>{
    try{
        const {error} = validate(req.body)
        if(error){
            return res.status(400).send({message: error.details[0].message})
        }
        const progress = await Progress.findOne({userId: req.body.userId})
        if(progress)
            return res.status(409).send({message: "Progress of that User already exist!"})

        const newProgress = new Progress({userId: req.body.userId, ukonczoneZadania: []})
        await newProgress.save()

        res.status(201).send({message: "Progress created successfully"})
    } catch (error){
        console.log("Błąd przy tworzeniu nowego progresu uzytkownika: " + error)
        res.status(500).send({message: "Nie udalo się stworzyć progresu dla użytkownika!"})
    }
})


router.get("/", async(req, res)=> {
    try {
        const progress = await Progress.findOne({userId: req.params.id});
        if(!progress){
            return res.status(404).json({message: "Brak progresu dla tego użytkownika"})
        }
        res.status(200).send(progress);
    } catch (error){
        res.status(404).json({message: error.message.details[0].message});
    }
})

router.put("/addTask/:userId", async(req,res)=>{
    const {taskId} = req.body
    try{
        const progress = await Progress.findOne({userId: req.params.userId})

        if(!progress){
            console.log("Progress nie istnieje pozdrawiam!")
            return res.status(404).send({message: "Progress dla danego użytkownika nie istnieje!"})
        }
        if(progress.ukonczoneZadania.includes(taskId)) {
            console.log("Zadanie juz wykonane")
            return res.status(405).send({message: "Zadanie juz wczesniej rozwiazane!"})
        }
        progress.ukonczoneZadania.push(taskId)
        await progress.save()

        res.status(200).send({message: "Zadanie dodane do tablicy poprawnie!"})
    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
})

module.exports = router;