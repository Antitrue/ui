import React, { useState } from 'react'

import './TaskFilter.css'

function TasksFilter({ filterItems, getFlag }) {
  const [filter, setFilter] = useState('All')
  const filters = [
    { name: 'All', id: 1 },
    { name: 'Active', id: 2 },
    { name: 'Completed', id: 3 },
  ]
  const changeFilter = (item) => {
    setFilter(item)
    filterItems(item)
  }
  return (
    <ul className="filters">
      {filters.map(({ name, id }) => (
        <li key={id}>
          <button
            className={name === filter ? 'selected' : null}
            onClick={() => {
              getFlag(name)
              changeFilter(name)
            }}
          >
            {name}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TasksFilter
