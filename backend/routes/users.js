const router = require("express").Router()
const { User, validate } = require("../models/UserModel")
const bcrypt = require("bcrypt")
const tokenVerification = require("../middleware/tokenVerification")
const {Task} = require("../models/TaskModel");
const authorizeRoles = require("../middleware/authorizeRoles");

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
                .send({ message: "Uzytkownik z podaną nazwą już istnieje!"})
        const userEmail = await User.findOne({ nazwa: req.body.email })
        if(userEmail)
            return res
                .status(409)
                .send({ message: "Konto z podanym emailem widnieje juz w bazie danych!"})
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.haslo, salt)

        const newUser = new User({ ...req.body, haslo: hashPassword, osiagniecia: [] })
        await newUser.save()

         res.status(201).send({ message: "User created successfully", user: newUser })
    } catch (error){
        console.log(error)
         res.status(500).send({message: "Internal Server Error" })
    }
})


router.get("/", tokenVerification, authorizeRoles("ADMIN"), async(req,res) => {
    //pobranie wszystkich użytkowników z bd:
    User.find().exec()
        .then(async () => {
            const users = await User.find();
            res.status(200).send({ data: users,  message: "Lista użytkownikow: "});
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        });

})

router.get("/me", tokenVerification, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        console.log("User: ", user)
        if (!user) return res.status(404).json({ message: "Użytkownik nie istnieje" });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Wystąpił błąd serwera" });
    }
});

router.put("/:id/addTask", tokenVerification,async(req,res)=>{
    const {taskId} = req.body
    try{
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).send({message: "Podany użytkownik nie istnieje!"})
        }
        if(user.tasksCompleted.includes(taskId)) {
            console.log("Zadanie juz wykonane")
            return res.status(404).send({message: "Zadanie juz wczesniej rozwiazane!"})
        }
        user.tasksCompleted.push(taskId)
        await user.save()
        res.status(200).send({message: "Zadanie dodane do tablicy poprawnie!"})
    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
})
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
        console.log(error)
        res.status(500).json({message: "Wystapil blad serwera"})
    }

})
router.get('/stats', async (req, res) => {
    const {userId} = req.query;
    console.log(req.query)
    const user = await User.findById(userId);
    if (user) {
        res.status(200).json({
            tasksCompleted: user.tasksCompleted.length,
            totalTasks: await Task.countDocuments(),
            memoryGameCompleted: user.memoryGameCompleted,
            dragNDropGameCompleted: user.dragNDropGameCompleted,
        });
    } else {
        res.status(404).json({ error: 'Uzytkownik nie znaleziony!' });
    }
});

router.get("/:id", tokenVerification, async(req, res)=> {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({message: "Użytkownik nie istnieje"})
        }
        res.status(200).json(user);
    } catch (error){
        res.status(404).json({message: "Error przy get po id"});
    }
})

router.put("/:id", tokenVerification, authorizeRoles("ADMIN"), async(req, res) => {
    try{
        const {nazwa, email, haslo, imieDziecka, wiekDziecka, rola} = req.body
        const user = await User.findById(req.params.id)

        if(!user){
            return res.status(404).json({message: "Użytkownik nie istnieje"})
        }

        if(haslo){
            const salt = await bcrypt.genSalt(Number(process.env.SALT))
            const hashPassword = await bcrypt.hash(haslo, salt)
            user.haslo = hashPassword
        }

        if(nazwa !== undefined){
            user.nazwa = nazwa;
        }
        if(email !== undefined){
            user.email = email;
        }
        if(imieDziecka !== undefined){
            user.imieDziecka = imieDziecka;
        }
        if(wiekDziecka !== undefined){
            user.wiekDziecka = wiekDziecka;
        }
        if(rola !== undefined){
            user.rola = rola;
        }

        await user.save()

        res.send({data: user, message: "Dane użytkownika zostaly zmienione!"});
    } catch (error){
        res.status(404).json({message: "Error przy update"});
    }
})



router.delete("/:id", tokenVerification, async(req, res) => {
   const {oldPassword} = req.body
    try{

        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({message: "Użytkownik nie istnieje"})
        }

        const isMatch = await bcrypt.compare(oldPassword, user.haslo)
        if (!isMatch){
            return res.status(400).json({message: "Stare haslo jest nieprawidlowe"})
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Twoje konto zostało usunięte."});
    } catch (error){
       console.error(error)
        res.status(500).json({message: "Wystąpił błąd."});
    }
})

router.delete("/paneladmin/:id", tokenVerification, authorizeRoles("ADMIN"), async(req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "Uzytkownik usuniety"});
    } catch (error){
        res.status(404).json({message: "Error przy delete"});
    }
})

router.post('/validate-password', async (req, res) => {
    const { userId, password } = req.body;
    const user = await User.findById(userId);
    if (user && user.password === password) {
        res.status(200).json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
});





module.exports = router