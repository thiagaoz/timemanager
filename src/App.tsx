import React, { useState, useEffect } from 'react';
import './App.css';
import AddTaskBar from './components/AddTaskBar';
import TasksDisplay from './components/TasksDisplay';
import { Task } from './model';
import {testArr} from './components/CustomFunctions';



function App() {

  const [tasks, setTasks] = useState<Task[]>(testArr);
  const [mondayTasks, setMondayTasks] = useState<Task[]>([]);
  const [tuesdayTasks, setTuesdayTasks] = useState<Task[]>([]);
  const [wednesdayTasks, setWednesdayTasks] = useState<Task[]>([]);
  const [thursdayTasks, setThursdayTasks] = useState<Task[]>([]);
  const [fridayTasks, setFridayTasks] = useState<Task[]>([]);
  const [saturdayTasks, setSaturdayTasks] = useState<Task[]>([]);
  const [sundayTasks, setSundayTasks] = useState<Task[]>([]);

  useEffect(() => {
    setMondayTasks(tasks.filter(task => task.start_day === 1))
    setTuesdayTasks(tasks.filter(task => task.start_day === 2))
    setWednesdayTasks(tasks.filter(task => task.start_day === 3))
    setThursdayTasks(tasks.filter(task => task.start_day === 4))
    setFridayTasks(tasks.filter(task => task.start_day === 5))
    setSaturdayTasks(tasks.filter(task => task.start_day=== 6))
    setSundayTasks(tasks.filter(task => task.start_day === 7))
    console.log('TASKS: ' + tasks.length);
  }, [tasks])
  

  return (
    <div className="App">
      Hello World
      <AddTaskBar tasks={tasks} setTasks={setTasks} ></AddTaskBar>

      {tasks.length === 0 ? 
        <h1>No tasks</h1>
         : 
         (<div className='week-container' >
         <div className='day-container'>MONDAY    <TasksDisplay tasks={tasks} dayTasks={mondayTasks} setTasks={setTasks} ></TasksDisplay></div>
         <div className='day-container'>TUESDAY   <TasksDisplay tasks={tasks} dayTasks={tuesdayTasks} setTasks={setTasks}></TasksDisplay></div>
         <div className='day-container'>WEDNESDAY <TasksDisplay tasks={tasks} dayTasks={wednesdayTasks} setTasks={setTasks}></TasksDisplay></div>
         <div className='day-container'>THURSDAY  <TasksDisplay tasks={tasks} dayTasks={thursdayTasks} setTasks={setTasks}></TasksDisplay> </div>
         <div className='day-container'>FRIDAY    <TasksDisplay tasks={tasks} dayTasks={fridayTasks} setTasks={setTasks}></TasksDisplay> </div>
         <div className='day-container'>SATURDAY  <TasksDisplay tasks={tasks} dayTasks={saturdayTasks} setTasks={setTasks}></TasksDisplay> </div>
         <div className='day-container'>SUNDAY    <TasksDisplay tasks={tasks} dayTasks={sundayTasks} setTasks={setTasks}></TasksDisplay> </div>
         </div>)
        }

    </div>
  );
}

export default App;
