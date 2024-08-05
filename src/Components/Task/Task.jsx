import React, { useRef, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import './Task.css'

function Task({ description, createdAt, edit, done, onDone, id, removeTask, changeTask, onSubmitTask }) {
  const [text, setText] = useState(description)
  const [flag, setFlag] = useState(false)
  const inpRef = useRef()

  const getText = () => {
    if (inpRef.current.value.trim() !== '') {
      setText(inpRef.current.value)
    }
  }

  const saveTask = (e) => {
    changeTask(text, id)
    onSubmitTask(e, id)
    setFlag(false)
  }

  return (
    <>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={() => {
            onDone(id, done)
          }}
          checked={done}
        />
        <label>
          <span className="description">{description}</span>
          <span className="created">{`created ${formatDistanceToNow(createdAt, { includeSeconds: true })} ago`}</span>
        </label>
        <button
          className="icon icon-edit"
          onClick={() => {
            changeTask(text, id)
            setFlag(true)
          }}
        />
        <button
          className="icon icon-destroy"
          onClick={() => {
            removeTask(id)
          }}
        />
      </div>
      {edit && (
        <form
          onSubmit={(e) => {
            saveTask(e)
          }}
        >
          <input
            type="text"
            className="edit"
            ref={inpRef}
            value={text}
            onChange={getText}
            autoFocus={flag}
            onBlur={(e) => saveTask(e)}
          />
        </form>
      )}
    </>
  )
}

export default Task
