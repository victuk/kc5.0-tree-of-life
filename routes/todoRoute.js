const express = require("express");
const todoModel = require("../schema/todoModel");
const router = express.Router();

router.get("/", async (req, res) => {
    const todos = await todoModel.findAll();
    res.send({
        todos
    });
});

router.post("/", async (req, res) => {
    const {title, description} = req.body;

    await todoModel.create({title, description});

    res.send({message: "Created"});

});

module.exports = router;
