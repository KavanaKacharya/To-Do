import React from 'react';

const TaskList = ({ tasks, deleteTask, toggleTaskCompletion }) => {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <span 
            onClick={() => toggleTaskCompletion(task.id)}
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          >
            {task.text} - {task.date.toDateString()}
          </span>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
