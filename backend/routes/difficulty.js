const router = require("express").Router()
const {Difficulty} = require("../models/DifficultyModel")



router.get("/", async(req,res) =>{

    Difficulty.find().exec()
        .then(async()=>{
            const difficulties = await Difficulty.find()
            res.status(200).send({data: difficulties})
        })
        .catch(error => {
            console.log(error)
            res.status(500).send({ message: error})
        })

})








module.exports = router