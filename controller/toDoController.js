const transporter = require("../utility/sendEmail");
const todoModel = require("../schema/todo");
const joi = require("joi");
const { default: axios } = require("axios");


const getAllTodo = async (req, res) => {
    try {

        const {title, sort, taskStatus, page, limit} = req.query;

        let query = {};

        let sortObject = {};

        if(title && title.length > 2) {
            query.title = {$regex: title, $options: "i"};
        }

        if(sort == "date-asc") {
            sortObject.createdAt = 1;
        } else if (sort == "date-desc") {
            sortObject.createdAt = -1;
        }

        if(taskStatus) {
            query.todoStatus = taskStatus;
        }

        console.log("get decoded value",req.decoded);
        // const todo = await todoModel
        // .find()
        // .select("title description userId")
        // .populate("", "-password");

        const todo = await todoModel
        .paginate(query, {
            page: (page && isNaN(page) == false ) ? parseInt(page) : 1,
            limit: (limit && isNaN(limit) == false) ? parseInt(limit) : 10,
            populate: [
                {
                    path: "userId",
                    select: "-password -createdAt -updatedAt"
                }
            ],
            sort: sortObject
        });

        res.send(todo);
    } catch (error) {
        res.status(500).send({
            error
        });
    }
}

const addMultipleTodo = async (req, res) => {
    const {todos} = req.body;

    console.log(todos);

    const {error} = joi.object({
        todos: joi.array().items(joi.string().min(4)).min(2).required().messages({
            "array.min": "Todo array must contain at least two todos"
        })
    }).validate({todos});

    if(error) {
        res.status(400).send({
            errorMessage: error.message
        });
        return;
    }

    const todosWithUser = todos.map(todo => {
        todo.userId = req.decoded.userId;
        return todo;
    })

    const newTodos = await todoModel.create(todosWithUser);

    res.status(201).send({
        message: "Todos created",
        newTodos
    });

}


const addNewTodo = async (req, res) => {
    
    const title = req.body.title;
    const description = req.body.description;

    const newTodo = await todoModel.create({
        title, description, userId: req.decoded.userId
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
        newTodo
    });
}

const viewSingleTodo = async (req, res) => {
    const id = req.params.id;

    const todo = await todoModel.findById(id);

    if(!todo) {
        res.status(404).send({
            message: "No todo found"
        });
        return;
    }

    res.send({
        message: "Todo found",
        todo
    });

}

const updateTodoStatus = async (req, res) => {
    const id = req.params.id;
    const isDone = req.body.isDone;

    const schema = joi.string().valid("pending", "ongoing", "completed").required();

    const {error} = schema.validate(isDone);

    if(error) {
        res.status(422).send({
            message: error.message
        });
        return;
    }

    const doesTodoExist = await todoModel.findById(id);

    if(!doesTodoExist) {
        res.send("Todo does not exist");
        return;
    }

    const todo = await todoModel.findByIdAndUpdate(id, {
        todoStatus: isDone
    }, {new: true});

    res.send({
        message: "Todo updated successfully",
        todo
    });
}

const deleteTodo = async (req, res) => {
    const id = req.params.id;

    const todo = await todoModel.findById(id);
    
    if(todo.userId != req.decoded.userId) {
        res.status(401).send({
            message: "This action is forbidden."
        });
        return;
    }

    let deletedTodo = await todoModel.findByIdAndDelete(id);
    
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
    deleteTodo,
    addMultipleTodo
}
