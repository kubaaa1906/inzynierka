const router = require ("express").Router();
const {Category, validate}= require("../models/CategoryModel");
const tokenVerification = require("../middleware/tokenVerification")
const authorizeRoles = require("../middleware/authorizeRoles");


//Funkcja do dodawania kategorii
router.post("/", tokenVerification, authorizeRoles("ADMIN"), async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })
        await new Category({ ...req.body}).save()
        res.status(201).send({ message: "Kategoria utworzona pomyślnie" })
    } catch (error) {
        res.status(500).send({ message: "Błąd serwera" })
    }
})

//Funkcja do listowania kategorii
router.get("/", tokenVerification, async(req, res) => {
    Category.find().exec()
        .then(async () => {
            const categories = await Category.find();
            res.status(200).send({ data: categories, message: "Lista kategorii: "})
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        })
})


router.get("/:id", tokenVerification, async(req, res)=> {
    try {
        const category = await Category.findById(req.params.id);

        if(!category){
            return res.status(404).json({message: "Nie istnieje kategoria o podanym ID"})
        }

        res.status(200).json(category);
    } catch (error){
        res.status(404).json({message: "Error przy get po id"});
    }
})

//edit pojedynczej kategorii
router.put("/:id", tokenVerification, authorizeRoles("ADMIN"), async(req, res) => {
    try{
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedCategory);
    } catch (error){
        res.status(404).json({message: "Error przy update"});
    }
})

router.delete("/:id", tokenVerification, authorizeRoles("ADMIN"), async(req, res) => {
    try{
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Kategoria usunieta"});
    } catch (error){
        res.status(404).json({message: "Error przy delete"});
    }
})

module.exports = router