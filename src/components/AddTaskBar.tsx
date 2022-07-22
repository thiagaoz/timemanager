import React, { useRef} from 'react'
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

    const handleMultDaysTaks = (parentTask: Task)  =>{
        if (parentTask.duration === 0) return parentTask;

        for (let i=1;i<=parentTask.duration;i++){
            
        }
    }

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        const newTask: Task =  new Task (inputRef.current!.value, parseInt(startDayRef.current!.value), 
            startTimeRef.current!.value, parseInt(endDayRef.current!.value), endTimeRef.current!.value );

        if (newTask.start_date === newTask.end_date){
            alert("Task with no duration");
            console.log(`ERRO: ${newTask.title} - START: ${week_days[newTask.start_day]} ${newTask.start_time} END: ${week_days[newTask.end_day]} ${newTask.end_time}`);
            return false;
        }
/*
        if (newTask.start_date > newTask.end_date){
            alert("End before Start");
            console.log(`ERRO: ${newTask.title} - START: ${week_days[newTask.start_day]} ${newTask.start_time} END: ${week_days[newTask.end_day]} ${newTask.end_time}`);
            return false;
        }
*/
        if(tasks.length === 0) {
            setTasks([newTask])
        }

        else{
            let conflit: Task[] = [];
            for (let task of tasks) {
                if (newTask.start_date < task.start_date && newTask.end_date <= task.start_date){
                    continue;
                }
                else if (newTask.start_date >= task.end_date && newTask.end_date > task.end_date){
                    continue;
                }
                else {
                    conflit.push(task);
                    console.log('Conflit with '+ task.title);
                }
            }
            if (conflit.length>0) {
                alert('Conflit with ' + conflit.length + ' tasks');
                return false;
            };
        }
        
        if (newTask.children.length > 0) newTask.end_time = '23:59'
        newTask.printTask();
        
        const sortedTasks = ([...tasks, newTask, ...newTask.children]);
        sortedTasks.sort((a,b) => a.start_date - b.start_date);
        setTasks(sortedTasks);
        
        //newTask.start.day = newTask.end.day= {num:'1', name: 'Monday'};  
        formRef.current?.reset();
        inputRef.current?.focus();
    }

  return (
    <div>
        <form ref={formRef} onSubmit={(e)=>{handleAdd(e)}}>
            <input type='input' placeholder='New task title' className='input__filed' ref={inputRef}
                autoFocus required></input>
                <br></br>
                START  
            <select className='week_day' ref={startDayRef} required>
                <option value='1'>Monday</option>
                <option value='2'>Tuesday</option>
                <option value='3'>Wednesday</option>
                <option value='4'>Thursday</option>
                <option value='5'>Friday</option>
                <option value='6'>Saturday</option>
                <option value='7'>Sunday</option>
            </select>

            <input className='start__field' type='time' step='60' ref={startTimeRef} required></input>
            <br></br>
            END  
            <select className='week_day' ref={endDayRef} required>
                <option value='1'>Monday</option>
                <option value='2'>Tuesday</option>
                <option value='3'>Wednesday</option>
                <option value='4'>Thursday</option>
                <option value='5'>Friday</option>
                <option value='6'>Saturday</option>
                <option value='7'>Sunday</option>
            </select>
            <input className='end__field' type='time' step='60' ref={endTimeRef} required></input>
            <br></br>
            <button className='input__submit' type='submit'>ADD</button>
        </form>



    </div>
  )
}

export default AddTaskBar