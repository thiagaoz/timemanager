import React from 'react'
import { Task } from '../model'

interface Props {
    task: Task
}

export const SingleTask = ({task}: Props) => {
  return (
    <div>{
      <span style={{ whiteSpace: 'pre' }}>
      {`${task.title}
${task.start_time} - ${task.end_time}`}
      </span> 
    }</div>
  )
}
