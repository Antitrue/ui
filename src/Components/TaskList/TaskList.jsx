import React from 'react'

import Task from '../Task/Task'

import './TaskList.css'

function TaskList({ taskData, onDone, removeTask, flag, completedTask, changeTask, onSubmitTask }) {
  const renderList = (flag) => {
    if (flag === 'Completed') {
      return completedTask
    }
    return taskData
  }
  return (
    <ul className="todo-list">
      {renderList(flag).map(({ description, createdAt, className, id, edit, done }) => (
        <li key={id} className={done ? 'completed' : className}>
          <Task
            id={id}
            description={description}
            createdAt={createdAt}
            edit={edit}
            onDone={onDone}
            done={done}
            removeTask={removeTask}
            taskData={taskData}
            changeTask={changeTask}
            onSubmitTask={onSubmitTask}
          />
        </li>
      ))}
    </ul>
  )
}

export default TaskList
