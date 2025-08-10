const Todo = require('../models/todoModel');
const logger = require('../utils/logger');

// Get all todos
exports.getTodos = async (req, res) => {
    logger.info("Fetching todos from DB");
    try {
        const todos = await Todo.find();
        logger.info("Fetched todos:", todos);
        res.status(200).json(todos);
    } catch (error) {
        logger.error("Error fetching todos:", error);
        res.status(500).json({ message: "Error fetching todos" });
    }
};

// Add a new todo
exports.addTodo = async (req, res) => {
    try {
        const title = req.body.title;
        logger.info("Received todo title:", title);

        const newTodo = new Todo({
            title: title
        });

        logger.info("New Todo to DB:", newTodo);
        const saveTodo = await newTodo.save();
        logger.info("Saved Todo to DB:", saveTodo);

        res.status(200).json(saveTodo);
        
    } catch (error) {
        logger.error("Error adding todo:", error);
        res.status(500).json({ message: "Error adding todo" });
    }
};

// ✅ DELETE todo
exports.deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Todo.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted successfully", id });
    } catch (err) {
        logger.error("Failed to delete todo:", err);
        res.status(500).json({ error: "Failed to delete todo" });
    }
};
