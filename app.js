const express = require("express");

const app = express();

app.use(express.json());

let todo = [];

app.get("/", (req, res) => {
    res.send(todo);
});

app.post("/todo", (req, res) => {
    const id = Math.floor(Math.random() * 10000);
    const title = req.body.title;
    const description = req.body.description;

    todo.push({
        id,
        title,
        description,
        isDone: false
    });

    res.status(201).send({
        message: "Todo added successfully",
        todo
    });
});


app.get("/single/:id", (req, res) => {
    const id = req.params.id;

    let todoFound;

    for(let i = 0; i < todo.length; i++) {
        if(todo[i].id == id) {
            // If the post fot the todo at the index of i matches
            // the same ID we are looking for, then assign the value
            // of toDoFound to be the todo we are looking for
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
});


app.patch("/:id", (req, res) => {
    const id = req.params.id;
    const isDone = req.body.isDone;

    const updatedTodo = [];

    for(let i = 0; i < todo.length; i++) {
        if(todo[i].id == id) {
            // If the todo at the index of i has the ID for the post
            // we want to update, then update the isDone value
            // of the todo
            todo[i].isDone = isDone
        }
        updatedTodo.push(todo[i]);
    }
    todo = updatedTodo;

    res.send({
        message: "Todo updated successfully",
        todo
    });
});


app.delete("/:id", (req, res) => {
    const id = req.params.id;
    const updatedTodo = [];
    let deletedTodo;

    for(let i = 0; i < todo.length; i++) {
        if(todo[i].id != id) {
            // If the todo at the index of i is not the todo
            // we want to delete, then push it into the updatedTodo
            // array
            updatedTodo.push(todo[i]);
        } else {
            // Else if it is the post we want to delete, assign it to
            // deletedTodo variable so that we can tell the user
            // about the todo we've deleted
            deletedTodo = todo[i]
        }
    }
    todo = updatedTodo;
    res.send({
        message: "Todo deleted successfully",
        deletedTodo
    });
});

// The code below starts a local server running on port 3000
app.listen(3000, () => {
    console.log("Server has started on port 3000");
});

