import React, { useState } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Todo.css';

let Todo = () => {
  let [tasks, setTasks] = useState([]);
  let [filter, setFilter] = useState('all');
  let [searchTerm, setSearchTerm] = useState('');
  let [zoomLevel, setZoomLevel] = useState(1);
  let [showCalendar, setShowCalendar] = useState(false);
  let [date, setDate] = useState(new Date());

  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), text: task, completed: false, date }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filterTasks = () => {
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    } else if (filter === 'incomplete') {
      return tasks.filter(task => !task.completed);
    }
    return tasks;
  };

  const searchTasks = (tasks) => {
    return tasks.filter(task => task.text.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const displayedTasks = searchTasks(filterTasks());

  const zoomIn = () => {
    setZoomLevel(prevZoom => Math.min(prevZoom + 0.1, 2)); 
  };

  const zoomOut = () => {
    setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 0.5)); 
  };

  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar);
  };

  const onDateChange = (newDate) => {
    setDate(newDate);
    setShowCalendar(false);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const taskForDate = tasks.find(task => new Date(task.date).toDateString() === date.toDateString());
      if (taskForDate) {
        return (
          <div className="task-indicator" title={taskForDate.text}></div>
        );
      }
    }
    return null;
  };

  return (

  <section> 
    <button className="zoom-btn zoom-in" onClick={zoomIn}>+</button>
    <button className="zoom-btn zoom-out" onClick={zoomOut}>-</button> 
    <div className="todo-container" style={{ transform: `scale(${zoomLevel})` }}>
      <div className="todo-header">
        <h1>To-Do List</h1>
      </div>
      <TaskForm addTask={addTask} date={date} />
      <div className="filter-buttons">
        <button onClick={() => setFilter('completed')}>✔</button>
        <button onClick={() => setFilter('incomplete')}>X</button>
      </div>
      <input 
        type="text"
        placeholder="Search tasks"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TaskList 
        tasks={displayedTasks} 
        deleteTask={deleteTask} 
        toggleTaskCompletion={toggleTaskCompletion} 
      />
    </div>
    <button className="calendar-btn" onClick={handleCalendarClick}>📅{showCalendar && (
      <Calendar 
        onChange={onDateChange} 
        value={date} 
        tileContent={tileContent}
      />
    )}
    </button>
    
    </section> 
  );
};

export default Todo;
