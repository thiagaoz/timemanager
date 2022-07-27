import React, { useEffect, useRef, useState } from 'react'
import { Task } from '../model'
import {AiFillEdit, AiFillDelete} from 'react-icons/ai';
import EditPopUp from './EditPopUp';

interface Props {
    task: Task,
    tasks: Task[],
    setTasks:  React.Dispatch<React.SetStateAction<Array<Task>>>
}

export const SingleTask = ({task, tasks, setTasks}: Props) => {

  const [edit, setEdit] = useState<boolean>(false);
  

   const handleEdit = (e: React.FormEvent, id: number) =>{
    e.preventDefault();
    /*
    setTasks(tasks.map( task => (
        task.id === id ? Object.assign(task, {title: editedTask}): task
    )));
    */
    setEdit(false);
    };

  const handleDelete = (id: number) =>{

    console.log('ID == ' + id);
    setTasks(tasks.filter(task => task.id !== id));
    
  };

  return (
    <form className='single__task' onSubmit={(e) => handleEdit(e, task.id)}>
    {edit?(
      <EditPopUp edit={edit} setEdit={setEdit} task={task} />
    )
    :
    (
      <div>{
        <span style={{ whiteSpace: 'pre' }}>
        {`${task.title}
  ${task.start_time} - ${task.end_time}`}
        </span> 
      }</div>
    )}
      <div>
      <span className="icon" onClick={(e)=> edit? handleEdit(e, task.id) : setEdit(true)}>
        <AiFillEdit />
      </span>
      <span className="icon" onClick={()=>handleDelete(task.id)}>
        <AiFillDelete />
      </span>
      </div>
    
    </form>
  )
}
