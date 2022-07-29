import React, { useState } from 'react'
import { Task } from '../model'
import {AiFillEdit, AiFillDelete} from 'react-icons/ai';
import EditPopUp from './EditPopUp';
import { checkConflict, setChildrenTask, sortTasks, deleteTask } from './CustomFunctions';


interface Props {
    task: Task,
    tasks: Task[],
    setTasks:  React.Dispatch<React.SetStateAction<Array<Task>>>
};

export const SingleTask = ({task, tasks, setTasks}: Props) => {

  const [edit, setEdit] = useState<boolean>(false);

  const handleEdit = (newTask: Task, oldTask: Task = task): boolean => {
    const newArray: Task[] = deleteTask(oldTask.id, tasks);
    if (checkConflict(newTask, newArray)) {
      return false;
    }
    else{
      newTask.id = oldTask.id;
      setChildrenTask(newTask);
      setTasks(sortTasks(newTask, newArray));
      setEdit(false);
      return true;
    }
  };

  const handleDelete = (id: number): void =>{

    const filteredTasks: Task[] = [];
    const deletedTasks: Task[] = [];

    for (let task of tasks){
      if (task.id === id || task.parent_id===id) {
        console.log(task.title+ ' ID: ' + task.id + ' = DELETE');
        deletedTasks.push(task);
      }
      else {
        console.log(task.title+ ' ID: ' + task.id + ' = OK');
        filteredTasks.push(task);
      }
    }
    console.log('End of testing')
    setTasks(filteredTasks);
    console.log('--- DELETED LIST---');
    for (let task of deletedTasks) {
      if (!task.parent_id) task.printTask();
    }
    console.log('--------');
  };

  return (
    <form className='single__task'>
    {edit?(
      <EditPopUp edit={edit} setEdit={setEdit} task={task} handleEdit={handleEdit} />
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
    {task.parent_id ? null : //Only allows edit and delete buttons to tasks without parent
      <div>
      <span className="icon" onClick={(e)=> setEdit(true)}>
        <AiFillEdit />
      </span>
      <span className="icon" onClick={()=>handleDelete(task.id)}>
        <AiFillDelete />
      </span>
      </div>
    }
    </form>
  )
}
