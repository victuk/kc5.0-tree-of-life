const transporter = require("../utility/sendEmail");

let todo = [];


const getAllTodo = (req, res) => {
    res.send(todo);
}


const addNewTodo = (req, res) => {
    const id = Math.floor(Math.random() * 10000);
    const title = req.body.title;
    const description = req.body.description;

    todo.push({
        id,
        title,
        description,
        isDone: false
    });

    transporter.sendMail({
        from: "ukokjnr@gmail.com",
        to: "ukokjnr@gmail.com",
        subject: "Todo [[Create todo]]",
        html: `
            <h1>You've added a new todo: ${req.body.title}</h1>
            <div>${req.body.description}</div>
        `
    });

    res.status(201).send({
        message: "Todo added successfully",
        todo
    });
}

const viewSingleTodo = (req, res) => {
    const id = req.params.id;

    let todoFound;

    for(let i = 0; i < todo.length; i++) {
        if(todo[i].id == id) {
            todoFound = todo[i];
        }
    }

    if(!todoFound) {
        res.status(404).send("Todo not found");
        return
    }

    res.send({
        message: "Todo found",
        todoFound
    });

}

const updateTodoStatus = (req, res) => {
    const id = req.params.id;
    const isDone = req.body.isDone;

    const updatedTodo = [];

    for(let i = 0; i < todo.length; i++) {
        if(todo[i].id == id) {
            todo[i].isDone = isDone
        }
        updatedTodo.push(todo[i]);
    }
    todo = updatedTodo;

    res.send({
        message: "Todo updated successfully",
        todo
    });
}

const deleteTodo = (req, res) => {
    const id = req.params.id;
    const updatedTodo = [];
    let deletedTodo;

    for(let i = 0; i < todo.length; i++) {
        if(todo[i].id != id) {
            updatedTodo.push(todo[i]);
        } else {
            deletedTodo = todo[i]
        }
    }
    todo = updatedTodo;
    res.send({
        message: "Todo deleted successfully",
        deletedTodo
    });
}

module.exports = {
    addNewTodo,
    getAllTodo,
    viewSingleTodo,
    updateTodoStatus,
    deleteTodo
}
