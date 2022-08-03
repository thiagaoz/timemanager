import React, { useRef} from 'react'
import { checkConflict, setChildrenTask, sortTasks } from './CustomFunctions';
import { Task } from '../model';

interface Props {
    tasks: Task[],
    setTasks:  React.Dispatch<React.SetStateAction<Task[]>>,
}

const AddTaskBar = ({tasks, setTasks}: Props) => {

    const week_days = ['Monday','Tuesday','Wednesday','Thursday','Friday', 'Saturday', 'Sunday'];
    const inputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const startDayRef = useRef<HTMLSelectElement>(null);
    const startTimeRef = useRef<HTMLInputElement>(null);
    const endDayRef = useRef<HTMLSelectElement>(null);
    const endTimeRef = useRef<HTMLInputElement>(null);

    const changeEndDay = (e: React.FormEvent)  => {
        e.preventDefault();

        if(startDayRef.current)  endDayRef.current!.value = startDayRef.current.value 
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        const newTask: Task =  new Task (inputRef.current!.value, parseInt(startDayRef.current!.value), 
            startTimeRef.current!.value, parseInt(endDayRef.current!.value), endTimeRef.current!.value );

        if (newTask.start_date === newTask.end_date){
            alert("Task with no duration");
            console.log(`ERRO: ${newTask.title} - START: ${week_days[newTask.start_day]} ${newTask.start_time} END: ${week_days[newTask.end_day]} ${newTask.end_time}`);
            return false;
        }

        if(tasks.length === 0) {
            setTasks([newTask])
        }

        if(checkConflict(newTask, tasks)) {
            return false;
        }
        
        setChildrenTask(newTask);
        //newTask.printTask();
        
        setTasks(sortTasks(newTask, tasks));
        
        formRef.current?.reset();
        inputRef.current?.focus();
    }

  return (
    <div className='addtask-container'>
        <form ref={formRef} onSubmit={(e)=>{handleAdd(e)}}>
            <input type='input' defaultValue='Breakfast' className='input__filed' ref={inputRef}
                autoFocus required></input>
                <br></br>
            <div className="time-settings-container">
                <div className="start-container">
                    <div>
                        <label htmlFor='week-day-start'>START</label> 
                    </div>
                    <div>
                        <select className='week_day' ref={startDayRef} onChange={(e) => changeEndDay(e)} required>
                            <option value='1'>Monday</option>
                            <option value='2'>Tuesday</option>
                            <option value='3'>Wednesday</option>
                            <option value='4'>Thursday</option>
                            <option value='5'>Friday</option>
                            <option value='6'>Saturday</option>
                            <option value='7'>Sunday</option>
                        </select>
                    </div>

                    <div>
                        <input className='start__field' type='time' step='60' defaultValue='06:00' ref={startTimeRef} required></input>
                    </div>
                </div>
                <div className="end-container">
                    <div>
                        <label htmlFor='week-day-end'>END</label> 
                    </div>
                    <div>
                        <select id='week-day-end' className='week_day' ref={endDayRef} required>
                            <option value='1'>Monday</option>
                            <option value='2'>Tuesday</option>
                            <option value='3'>Wednesday</option>
                            <option value='4'>Thursday</option>
                            <option value='5'>Friday</option>
                            <option value='6'>Saturday</option>
                            <option value='7'>Sunday</option>
                        </select>
                    </div>
                    <div>
                        <input className='end__field' type='time' step='60' ref={endTimeRef} defaultValue='08:00' required></input>
                    </div>
                </div>
            </div>
            <button className='input__submit' type='submit'>ADD</button>
        </form>
    </div>
  )
}

export default AddTaskBar