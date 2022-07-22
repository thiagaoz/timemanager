
import { Task } from '../model';
import { SingleTask } from './SingleTask';

interface Props {
    tasks: Task[]
}

const TasksDisplay = ({tasks}: Props) => {

    return <div>
        {tasks.map( task =>
            <SingleTask task={task} key={task.id}></SingleTask>
        )}
        
    </div>
}

export default TasksDisplay;