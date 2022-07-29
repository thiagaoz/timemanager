import React, { useEffect, useRef } from 'react'
import { Task } from '../model';
import "./EditPopUp.css";

interface Props {
    edit: boolean,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>,
    task: Task,
    handleEdit(newTaks: Task, oldTask?: Task): void

}
const EditPopUp = ({edit, setEdit, task, handleEdit}: Props) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const startDayRef = useRef<HTMLSelectElement>(null);
    const startTimeRef = useRef<HTMLInputElement>(null);
    const endDayRef = useRef<HTMLSelectElement>(null);
    const endTimeRef = useRef<HTMLInputElement>(null);

    
    const closeEdit = () => setEdit(false);
    
    const createTempTask = () => {

        const tempTask: Task =  new Task (inputRef.current!.value, parseInt(startDayRef.current!.value), 
            startTimeRef.current!.value, parseInt(endDayRef.current!.value), endTimeRef.current!.value );
        
        handleEdit(tempTask);
    };

    useEffect(() => {
        inputRef.current?.focus();
      }, [edit]);

    
  return (
    <div>
        <div className="modal">
            <div className="overlay">
                <div className="modal-content">
                    
                    <h1>Edit Task</h1>
                    <input className='input__field' type='text' defaultValue={task.title} ref={inputRef} required/> 
                    <br></br>
                    <select className='week_day' ref={startDayRef} defaultValue={task.start_day.toString()} required>
                        <option value='1'>Monday</option>
                        <option value='2'>Tuesday</option>
                        <option value='3'>Wednesday</option>
                        <option value='4'>Thursday</option>
                        <option value='5'>Friday</option>
                        <option value='6'>Saturday</option>
                        <option value='7'>Sunday</option>
                    </select>
                    <input className='start__field' type='time' step='60' defaultValue={task.start_time} ref={startTimeRef} required />

                    <br></br>
            
                    <select className='week_day' ref={endDayRef} defaultValue={task.original_end_day.toString()} required>
                        <option value='1'>Monday</option>
                        <option value='2'>Tuesday</option>
                        <option value='3'>Wednesday</option>
                        <option value='4'>Thursday</option>
                        <option value='5'>Friday</option>
                        <option value='6'>Saturday</option>
                        <option value='7'>Sunday</option>
                    </select>
                    <input className='end__field' type='time' step='60' ref={endTimeRef} defaultValue={task.original_end_time} required></input>
                    <br></br>
                    <button className='close-modal' onClick={closeEdit}>X</button>
                    <button className='edit__submit' type='button' onClick={() => createTempTask() }>SAVE CHANGES </button>
                
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditPopUp