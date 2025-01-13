require('dotenv').config()
const express = require("express");
const app = express();
const cors = require('cors');
const connection = require("./db");
const port = process.env.PORT || 8080;
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const applicationRoutes = require("./routes/reports")
const categoryRoutes = require("./routes/categories")
const tokenVerification = require("./middleware/tokenVerification");
const opinionRoutes = require("./routes/opinions");
const difficultiesRoutes = require("./routes/difficulty")
const imagesRoutes = require("./routes/image")

// DB CONNECTION
connection()

app.get("/api/tasks/", tokenVerification)
app.get("/api/reports", tokenVerification)
app.get("/api/categories", tokenVerification)
app.get("/api/opinions", tokenVerification)
app.get("/api/progress", tokenVerification)
app.get("/api/difficulties", tokenVerification)
app.get("/api/images", tokenVerification)

app.use(express.json())
app.use(cors())

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/reports", applicationRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/opinions", opinionRoutes)
app.use("/api/difficulties", difficultiesRoutes)
app.use("/api/images", imagesRoutes)

app.listen(port, () => console.log(`Server started on PORT ${port}`));
