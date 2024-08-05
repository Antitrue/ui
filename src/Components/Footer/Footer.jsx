import React from 'react'

import TasksFilter from '../TasksFilter/TasksFilter'
import './Footer.css'

function Footer({ filterItems, inProgressCount, clearComplitedTasks, getFlag }) {
  return (
    <footer className="footer">
      <span className="todo-count">{inProgressCount} items left</span>
      <TasksFilter filterItems={filterItems} getFlag={getFlag} />
      <button className="clear-completed" onClick={clearComplitedTasks}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
