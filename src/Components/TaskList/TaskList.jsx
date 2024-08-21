import React from 'react'

import Task from '../Task/Task'

import './TaskList.css'

function TaskList({
  taskData,
  onDone,
  removeTask,
  flag,
  completedTask,
  changeTask,
  onSubmitTask,
  onPlayTimer,
  onPauseTimer,
}) {
  const renderList = (flag) => {
    if (flag === 'Completed') {
      return completedTask
    }
    return taskData
  }
  return (
    <ul className="todo-list">
      {renderList(flag).map(({ description, createdAt, className, id, edit, done, timeInSec }) => (
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
            onPlayTimer={onPlayTimer}
            onPauseTimer={onPauseTimer}
            timeInSec={timeInSec}
          />
        </li>
      ))}
    </ul>
  )
}

export default TaskList
