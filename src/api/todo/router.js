const express = require('express');
const {
  getAllTodo,
  CreateTodo,
  getTodoById,
  updateTodoById,
  deleteTodoById,
} = require('./handler');

const TodoRouter = express.Router({ mergeParams: true });

TodoRouter.route('/').get(getAllTodo).post(CreateTodo);

TodoRouter.route('/:id')
  .get(getTodoById)
  .patch(updateTodoById)
  .delete(deleteTodoById);

module.exports = TodoRouter;
