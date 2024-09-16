const express = require("express");
require('dotenv').config()
const connection = require("./db");
const app = express();
const PORT = 3000;


// DB CONNECTION
connection()

// ROUTER

app.get('/', (_req,res) => {
    res.send("API is running..");
})



// START APPLICATION
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
