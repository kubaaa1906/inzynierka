require('dotenv').config()
const express = require("express");
const app = express();
const cors = require('cors');
const connection = require("./db");
const port = process.env.PORT || 8080;
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// DB CONNECTION
connection()

// MIDDLEWARE
app.use(express.json())
app.use(cors())

// ROUTER
//app.get('/', (_req,res) => {
//    res.send("API is running..");
//})
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)



// START APPLICATION
app.listen(port, () => console.log(`Server started on PORT ${port}`));
