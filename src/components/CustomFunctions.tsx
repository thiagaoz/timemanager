import { Task } from "../model";

export function checkConflict  (newTask: Task, tasks: Task[]) : void | boolean  {
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
        return true; //returns false to break the add logic
    };
};

export function sortTasks  (newTask: Task, tasks: Task[]) : Task[] {
    const sortedTasks = ([...tasks, newTask, ...newTask.children]);
    sortedTasks.sort((a,b) => a.start_date - b.start_date);
    return sortedTasks;
};

export function setChildrenTask (task: Task): void  {
    const childArr: Task[] = [];
    if (task.duration !== 0) {
        let child_start_day: number = 0;
        let child_start_time: string = '';
        let child_end_day: number = 0;
        let child_end_time: string = '';
        for (let i=1; i <= task.duration; i++){
            
            child_start_day = task.start_day + i;
            if (child_start_day > 7) child_start_day-=7;
            child_start_time = '00:00';

            if (child_start_day === task.end_day) {
                child_end_day = task.end_day;
                child_end_time = task.end_time
            }
            else {
                child_end_day = child_start_day;
                child_end_time = '23:59'
            }

            let childTask = new Task (task.title, child_start_day, child_start_time, child_end_day, child_end_time);
            childTask.id = task.id+i;
            childTask.parent_id = task.id;
            childArr.push(childTask);
        }
        task.end_time = '23:59'    
    }
    task.children = childArr;
}

export function deleteTask(id: number, taskArray:Task[]): Task[] {
    const filteredTasks: Task[] = [];
    const deletedTasks: Task[] = [];

    for (let task of taskArray){
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
    console.log('--- DELETED LIST---');
    for (let task of deletedTasks) {
      if (!task.parent_id) task.printTask();
    }
    console.log('--------');
    return(filteredTasks);
};

const lunch: Task = new Task('Lunch', 2, '12:00', 2, '13:00')
lunch.id = 1;
const dinner: Task = new Task('Dinner', 5, '18:00', 5, '19:00')
dinner.id = 2;
const arr = [lunch, dinner]
const trip: Task = new Task('Car trip', 2, '22:00', 3, '06:00')
setChildrenTask(trip);
export var testArr = sortTasks(trip, arr)