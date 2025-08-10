const express = require("express");
const {getTodos, addTodo, deleteTodo} = require("../controllers/controllers");

const router = express.Router();

router.get("/get-todo", getTodos)

router.post("/add-todo", addTodo);

router.delete("/delete-todo/:id", deleteTodo);

module.exports = router;