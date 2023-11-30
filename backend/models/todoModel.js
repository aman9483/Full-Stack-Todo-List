const mongoose = require('mongoose');

const TodoList = new mongoose.Schema({
  taskName: {
    type: String,
    required: [true, 'please enter the task name'],
    trim: true,
  },
  description: {
    type: String,
    maxlength: 1000,
    required: [true, 'please enter the task description'],
  },
});

const Todo = mongoose.model('TODO', TodoList);

module.exports = Todo;