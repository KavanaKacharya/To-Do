import React from 'react';
import { Check } from 'react-feather';

const Task = ({ task, deleteTask, toggleTaskCompletion }) => {


  return (
    <li>
      <span 
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        onClick={() => toggleTaskCompletion(task.id)}
      >
        {task.text}
      </span>
      <input type='checkbox'></input>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
};

export default Task;