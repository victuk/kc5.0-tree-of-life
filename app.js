const express = require("express");
const todoRouter = require("./router/router");
const authRouter = require("./router/userRouter");
const mongoose = require("mongoose");
require("dotenv").config();
const uploads = require("./utility/multerConfig");

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log("An error occurred while trying to connect::::", err);
});

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/todo", todoRouter);

app.post("/file-uploads", uploads.single("file"), (req, res) => {
    console.log("file properties", req.file);
    res.send({
        message: "File uploaded successfully"
    });
});

app.listen(3000, () => {
    console.log("Server has started on port 3000");
});

