const express = require("express");

const router = express.Router();

const todoController = require("../controller/toDoController");
const checkIfLoggedIn = require("../middleware/checkIfLoggedIn");
const roleBasedAccess = require("../middleware/roleBasedAccess");

router.use(checkIfLoggedIn);

// Todo Router
router.get("/", todoController.getAllTodo);
router.post("/todo", roleBasedAccess(["admin", "user"]), todoController.addNewTodo);
router.post("/todo/multiple", todoController.addMultipleTodo);
router.get("/single/:id", todoController.viewSingleTodo);
router.patch("/:id", todoController.updateTodoStatus);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
