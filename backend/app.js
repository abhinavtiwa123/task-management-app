const express = require('express');
require('dotenv').config();
require("./conn/conn");
const cors = require('cors');
const userAPI = require("./routes/user");
const taskAPI = require("./routes/task")

// ✅ Initialize app first
const app = express();

// ✅ Then use middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes// ✅ Routes
app.use("/api/v1", userAPI)
app.use("/api/v2", taskAPI)


app.use("/", (req, res) => {
    res.send("hello from backend side")
});


const PORT = 1000;

app.listen(PORT, () => {
    console.log("server started")
})