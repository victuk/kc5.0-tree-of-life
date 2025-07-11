const express = require("express");
const todoRouter = require("./router/router");
const authRouter = require("./router/userRouter");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log("An error occurred while trying to connect::::", err);
});

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/todo", todoRouter);

app.listen(3000, () => {
    console.log("Server has started on port 3000");
});

