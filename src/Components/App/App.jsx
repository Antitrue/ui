import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import TaskList from '../TaskList/TaskList'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'
import data from '../../data/data'

import './App.css'

function App() {
  const [tasks, setTasks] = useState(data)
  const [filteredTasks, setFilteredTasks] = useState(tasks)
  const [completedTask, setComplitedTask] = useState([])
  const [flag, setFlag] = useState('all')

  useEffect(() => {
    setFilteredTasks(tasks)
    setComplitedTask(tasks.filter((item) => item.done))
  }, [tasks])

  const addDone = (id) => {
    setTasks((state) => {
      const newState = state.map((item) => {
        if (item.id === id) {
          item.done = !item.done
          clearInterval(item.timerId)
        }
        if (item.className === 'completed') item.className = null
        return item
      })
      return newState
    })
  }

  const changeTask = (description, id) => {
    setTasks(
      tasks.map((item) => {
        if (item.edit) {
          item.edit = false
        }

        if (item.id === id) {
          item.description = description
          item.edit = true
          item.className = 'editing'
          item.done = false
          onPauseTimer(id)
        }
        return item
      })
    )
  }

  const onSubmitTask = (e, id) => {
    e.preventDefault()
    setTasks(
      tasks.filter((item) => {
        if (item.id === id) {
          item.edit = false
          item.className = null
        }
        return item
      })
    )
  }

  const removeTask = (id) => {
    setTasks((state) => {
      const newState = state.filter((item) => {
        if (item.id !== id) {
          return item
        }
        clearInterval(item.timerId)
      })
      return newState
    })
  }

  const addTask = (description, timeInSec, event) => {
    event.preventDefault()
    if (description.trim() !== '') {
      setTasks((state) => [
        ...state,
        {
          description,
          createdAt: new Date(),
          className: null,
          edit: false,
          done: false,
          timeInSec,
          id: uuid(),
        },
      ])
    }
  }

  const filterItems = (filter) => {
    switch (filter) {
      case 'Active':
        setFilteredTasks(tasks.filter((item) => !item.done))
        break
      case 'Completed':
        setFilteredTasks(completedTask)
        setFlag('Completed')
        break
      default:
        setFilteredTasks(tasks)
        break
    }
  }

  const clearComplitedTasks = () => {
    setComplitedTask([])
    setTasks(tasks.filter((item) => !item.done))
  }

  const getFlag = (value) => {
    setFlag(value)
  }

  const tick = (id) => {
    setFilteredTasks((prevState) =>
      prevState.map((todo) => {
        if (todo.id === id) {
          todo.timerStarted = true
          todo.timeInSec -= 1
        }
        return todo
      })
    )
  }

  const onPlayTimer = (id) => {
    setFilteredTasks((prevState) =>
      prevState.map((todo) => {
        if (todo.timerStarted) {
          clearInterval(todo.timerId)
        }
        if (todo.id === id) {
          const newTimer = setInterval(() => tick(id), 1000)
          todo.timerId = newTimer
        }
        return todo
      })
    )
  }

  const onPauseTimer = (id) => {
    setFilteredTasks((prevState) =>
      prevState.map((todo) => {
        if (todo.id === id) {
          clearInterval(todo.timerId)
          todo.timerId = null
          todo.timerStarted = false
        }
        return todo
      })
    )
  }

  const doneCount = tasks.filter((item) => item.done)
  const inProgressCount = tasks.length - doneCount.length

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAdd={addTask} />
      </header>
      <section className="main">
        <TaskList
          taskData={filteredTasks}
          onDone={addDone}
          removeTask={removeTask}
          flag={flag}
          completedTask={completedTask}
          changeTask={changeTask}
          onSubmitTask={onSubmitTask}
          onPlayTimer={onPlayTimer}
          onPauseTimer={onPauseTimer}
        />
        <Footer
          filterItems={filterItems}
          clearComplitedTasks={clearComplitedTasks}
          inProgressCount={inProgressCount}
          getFlag={getFlag}
        />
      </section>
    </section>
  )
}
export default App
