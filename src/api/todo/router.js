const express = require('express');
const {
  getAllTodo,
  CreateTodo,
  getTodoById,
  updateTodoById,
  deleteTodoById,
  setProductivityAndUserId,
} = require('./handler');

const TodoRouter = express.Router({ mergeParams: true });

TodoRouter.route('/')
  .get(setProductivityAndUserId, getAllTodo)
  .post(CreateTodo);

TodoRouter.route('/:id')
  .get(getTodoById)
  .patch(updateTodoById)
  .delete(deleteTodoById);

module.exports = TodoRouter;
