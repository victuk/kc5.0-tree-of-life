require("dotenv").config();
const express = require("express");
const todoRouter = require("./router/router");
const authRouter = require("./router/userRouter");
const mongoose = require("mongoose");
const uploads = require("./utility/multerConfig");
const uploadFile = require("./utility/fileUploads");
const userModel = require("./schema/user");
const paystackRouter = require("./router/paystackRouter");

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log("An error occurred while trying to connect::::", err);
});

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    req.socket = ioServer;
    next();
});

app.use("/auth", authRouter);
app.use("/todo", todoRouter);
app.use('/paystack', paystackRouter);

app.get("/normalize", async (req, res) => {
    await userModel.updateMany({}, {
        role: "user"
    });
    res.send("Done");
});

app.post("/file-uploads", uploads.single("file"), async (req, res) => {
    console.log("file properties", req.file);
    const fileDetails = await uploadFile(req.file);
    console.log("fileDetails", fileDetails);
    res.send({
        message: "File uploaded successfully",
        fileDetails
    });
});

app.listen(3000, () => {
    console.log("Server has started on port 3000");
});

