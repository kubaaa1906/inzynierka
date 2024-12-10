const router = require("express").Router()
const { User, validate } = require("../models/UserModel")
const bcrypt = require("bcrypt")
const tokenVerification = require("../middleware/tokenVerification")


router.post("/", async (req,res) => {
    try{
        const {error} = validate(req.body)
        if(error){
            return res.status(400).send({message: error.details[0].message})
        }

        const user = await User.findOne({ nazwa: req.body.nazwa })
        if(user)
            return res
                .status(409)
                .send({ message: "User with given username already Exist!"})

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.haslo, salt)

        const newUser = new User({ ...req.body, haslo: hashPassword, osiagniecia: [] })
        await newUser.save()

         res.status(201).send({ message: "User created successfully", user: newUser })
    } catch (error){
         res.status(500).send({message: "Internal Server Error" })
    }
})


router.get("/", tokenVerification, async(req,res) => {
    //pobranie wszystkich użytkowników z bd:
    User.find().exec()
        .then(async () => {
            const users = await User.find();
            res.json(users);
            //konfiguracja odpowiedzi res z przekazaniem listy użytkowników:
            res.status(200).send({ data: users });
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        });

})

router.get("/me", tokenVerification, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) return res.status(404).json({ message: "Użytkownik nie istnieje" });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Wystąpił błąd serwera" });
    }
});

router.put("/:id/change-password", tokenVerification, async(req,res) => {
    const {oldPassword, newPassword} = req.body
    try{
        const user = await User.findById(req.params.id)

        if(!user){
            return res.status(404).json({message: "Uzytkownik nie istnieje"})
        }

        const isMatch = await bcrypt.compare(oldPassword, user.haslo)
        if (!isMatch){
            return res.status(400).json({message: "Stare haslo jest nieprawidlowe"})
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        user.haslo = await bcrypt.hash(newPassword, salt)
        await user.save()

        res.status(200).json({message: "Haslo zostalo zaktualizowane"})
    } catch (error){
        res.status(500).json({message: "Wystapil blad serwera"})
    }

})

router.get("/:id", tokenVerification, async(req, res)=> {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error){
        res.status(404).json({message: "Error przy get po id"});
    }
})

router.put("/:id", tokenVerification, async(req, res) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error){
        res.status(404).json({message: "Error przy update"});
    }
})



router.delete("/:id", tokenVerification, async(req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "Uzytkownik usuniety"});
    } catch (error){
        res.status(404).json({message: "Error przy delete"});
    }
})





module.exports = router