import React, { useEffect, useRef, useState } from 'react'
import { Task } from '../model';
import "./EditPopUp.css";

interface Props {
    edit: boolean,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>,
    task: Task

}
const EditPopUp = ({edit, setEdit, task}: Props) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const startTimeRef = useRef<HTMLInputElement>(null);

    
    const closeEdit = () => setEdit(false);
    
    useEffect(() => {
        inputRef.current?.focus();
      }, [edit]);

    
  return (
    <div>
        <div className="modal">
            <div className="overlay">
                <div className="modal-content">
                    <h2>Edit Task</h2>
                    <input className='input__field' type='text' defaultValue={task.title} ref={inputRef} required/> 
                    <input className='start__field' type='time' step='60' defaultValue={task.start_time} ref={startTimeRef} required>

                    </input>
                    <button className='close-modal' onClick={closeEdit}>CLOSE</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditPopUp