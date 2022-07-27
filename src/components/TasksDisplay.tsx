
import { Task } from '../model';
import { SingleTask } from './SingleTask';

interface Props {
    tasks: Task[],
    setTasks:  React.Dispatch<React.SetStateAction<Task[]>>
}

const TasksDisplay = ({tasks, setTasks}: Props) => {

    return <div>
        {tasks.map( task =>
            <SingleTask task={task} key={task.id} tasks={tasks} setTasks={setTasks}></SingleTask>
        )}
        
    </div>
}

export default TasksDisplay;