const router = require("express").Router()
const {Image} = require("../models/ImageModel")


router.post("/", async (req,res) =>{
    try{
        const image = await Image.findOne({nazwa: req.body.nazwa, link: req.body.link})
        if(image)
            return res.status(409).send({message: "Obrazek istnieje juz w bazie danych, zmien dane!"})

        const newImage = new Image({nazwa: req.body.nazwa, link: req.body.link})
        await newImage.save()

        res.status(201).send({message: "Obrazek zapisany prawidlowo!"})
    }catch(error){

        console.log("Błąd przy dodawaniu obrazka do bazy danych: "  + error)
        res.status(500).send({message: "Nie udało się dodać obrazka do bazy danych!"})
    }
})

router.get("/", async(req,res) => {
    Image.find().exec()
        .then(async ()=> {
            const images = await Image.find()
            res.status(200).send({data: images})
        })
        .catch(error => {
            console.log(error)
            res.status(500).send({message: "Nie udało się odczytać obrazków z bazy danych!"})
        })
})


module.exports = router