const express = require('express');

const {createTodo, getTodo, getSingleTodo, updateTodo, deleteTodo} = require('../controllers/todoController')

const router = express.Router();

router.route('/NewTodo').post(createTodo);

router.route('/TodoList').get(getTodo);

router.route('/TodoList/:id').get(getSingleTodo);

router.route('/TodoList/:id').put(updateTodo);

router.route('/TodoList/:id').delete(deleteTodo);


module.exports = router;