const express = require("express");
const todoRouter = require("./router");
require("dotenv").config();

// The line below initializes express
const app = express();

//Middleware to handle any json payload data
//sent from a client
app.use(express.json());

// Middleware to handle any request to
// a route starting with /todo
app.use("/todo", todoRouter);

// Starting thing up the server on port 3000
app.listen(3000, () => {
    console.log("Server has started on port 3000");
});

