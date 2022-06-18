/* eslint-disable consistent-return */
const AppError = require('../../exceptions/app-error');
const Todo = require('./validator');

const getAllTodo = async (req, res, next) => {
  try {
    let filter = {};
    if (req.params.productiveId) {
      filter = { productivity: req.params.productiveId };
    }
    const todo = await Todo.find(filter);

    console.log(req.body.productivity);
    res.status(200).json({
      status: 'success',
      total: todo.length,
      result: todo,
    });
  } catch (error) {
    next(error);
  }
};

const CreateTodo = async (req, res, next) => {
  try {
    const newTodo = await Todo.create();

    res.status(200).json({
      status: 'success',
      total: newTodo.length,
      result: newTodo,
    });
  } catch (error) {
    next(error);
  }
};

const getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return next(new AppError('No Todo found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      result: todo,
    });
  } catch (error) {
    next(error);
  }
};

const updateTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;

    req.body.updatedAt = Date.now();
    const newTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    const checkDay = await Todo.findOne({ day: newTodo.day + 1 });

    if (!checkDay) {
      if (newTodo.status) {
        await Todo.create({
          day: newTodo.day + 1,
          productivity: newTodo.productivity,
        });
      }
    }
    if (!newTodo) {
      return next(new AppError('No Productivity found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      result: newTodo,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return next(new AppError('No Productivity found with that ID', 404));
    }

    if (!todo) {
      res.status(400).json({
        status: 'fail',
        message: 'id not found',
      });
    }
    res.status(204).json({
      status: 'success',
      result: todo,
    });
  } catch (error) {
    next(error);
  }
};
const setProductivityAndUserId = async (req, res, next) => {
  if (!req.body.productivity) req.body.productivity = req.params.productiveId;
  next();
};

module.exports = {
  getAllTodo,
  CreateTodo,
  getTodoById,
  updateTodoById,
  deleteTodoById,
  setProductivityAndUserId,
};
