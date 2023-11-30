import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './todoStyle.css';

const Todo = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskAdded, setTaskAdded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [taskAdded]);

  const fetchTasks = () => {
    axios.get('http://localhost:8008/api/v1/TodoList')
      .then(response => {
        setTasks(response.data || []);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        setTasks([]);
        setError('Error fetching tasks. Please try again.');
      });
  };

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    const data = {
      taskName: taskName,
      description: description,
    };

    axios.post('http://localhost:8008/api/v1/newTodo', data)
      .then(response => {
        console.log('Task added successfully:', response.data);
        setTaskAdded(!taskAdded);
        setTaskName('');
        setDescription('');
      })
      .catch(error => {
        console.error('Error adding task:', error);
      });
  };

  const handleDelete = (taskId) => {
    axios.delete(`http://localhost:8008/api/v1/TodoList/${taskId}`)
      .then(response => {
        console.log('Task deleted successfully:', response.data);
        setTaskAdded(!taskAdded);
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <div className="todo-item">
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={handleTaskNameChange}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
        <button onClick={handleSubmit}>Add Task</button>

        {error && <div className="error-message">{error}</div>}

        {Array.isArray(tasks) && tasks.map(task => (
          <div key={task._id} className="task-item">
            <div className="task-details">
              <div className="task-name">{task.taskName}</div>
              <div className="task-description">{task.description}</div>
            </div>
            <div className="task-actions">
              <button onClick={() => handleDelete(task._id)}>Delete</button>
              {/* Add update functionality here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
