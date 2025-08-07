const express = require("express");
const todoRouter = require("./router/router");
const authRouter = require("./router/userRouter");
const messageRouter = require("./router/messageRouter");
const mongoose = require("mongoose");
require("dotenv").config();
const uploads = require("./utility/multerConfig");
const uploadFile = require("./utility/fileUploads");
const userModel = require("./schema/user");
const paystackRouter = require("./router/paystackRouter");
const cronRouter = require("./router/cronRouter");
const {createServer} = require("http");
const {Server} = require("socket.io");
const jsonWebToken = require("jsonwebtoken");

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log("An error occurred while trying to connect::::", err);
});

const app = express();

const httpServer = createServer(app);

const ioServer = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: "GET,POST,PUT,PATCH,DELETE"
    }
});

app.use(express.json());

app.use((req, res, next) => {
    req.socket = ioServer;
    next();
});

app.use("/auth", authRouter);
app.use("/todo", todoRouter);
app.use('/paystack', paystackRouter);
app.use('/message', messageRouter);
app.use('/scheduler', cronRouter);

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

app.get("/ping", (req, res) => {
    req.socket.to(req.body.to).emit("send-message", {
        message: req.body.message
    });
    res.send("pong");
});

ioServer.use((socket, next) => {
    const auth = socket.handshake.headers.authorization;
    const [type, token] = auth.split(" ");
    console.log("type", type, "token", token);
    if(type.toLocaleLowerCase() == "bearer") {
        const value = jsonWebToken.verify(token, process.env.JWT_KEY);
                    socket.handshake.auth.decoded = value;
                    next();
    } else {
        socket.send("You need to supply an authorization token");
    }
});


const sendMessage = (payload) => {
        // Message will contain to and message property
        socket.to(payload.to).emit("send-message", payload.message);
}

ioServer.on("connection", (socket) => {

    const decoded = socket.handshake.auth.decoded;
    
    console.log("Welcome", socket.id);
    console.log("socket.handshake.auth.decoded", socket.handshake.auth.decoded);

    socket.join(decoded.userId);

    socket.on("send-message", sendMessage);

    socket.on("disconnect", () => {
        socket.leave(decoded.userId);
        console.log("Goodbye", socket.id, "with user ID", decoded.userId);
    });

});

httpServer.listen(3000, () => {
    console.log("Server has started on port 3000");
});

