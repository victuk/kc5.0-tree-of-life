const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    todoStatus: {
        type: String,
        enum: ["pending", "ongoing", "completed"],
        default: "pending"
    }
}, {
    timestamps: true
});

const todoModel = mongoose.model("todos", schema);

module.exports = todoModel;
