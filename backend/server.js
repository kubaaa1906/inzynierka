require('dotenv').config()
const express = require("express");
const app = express();
const cors = require('cors');
const connection = require("./db");
const port = process.env.PORT || 8081;
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const applicationRoutes = require("./routes/applications")
const categoryRoutes = require("./routes/categories")
const tokenVerification = require("./middleware/tokenVerification");

// DB CONNECTION
connection()

//test - dostep przez tokenverification
app.get("/api/tasks/", tokenVerification)
app.get("/api/applications", tokenVerification)
app.get("/api/categories", tokenVerification)


// MIDDLEWARE
app.use(express.json())
app.use(cors())

// ROUTES
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/applications", applicationRoutes)
app.use("/api/categories", categoryRoutes)



// START APPLICATION
app.listen(port, () => console.log(`Server started on PORT ${port}`));
