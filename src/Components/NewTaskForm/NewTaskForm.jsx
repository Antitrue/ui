import React, { useRef, useState } from 'react'

function NewTaskForm({ onAdd }) {
  const inpRef = useRef()
  const [text, setText] = useState('')

  return (
    <form onSubmit={(e) => onAdd(text, e, setText)}>
      <input
        className="new-todo"
        value={text}
        autoFocus
        ref={inpRef}
        onChange={() => setText(inpRef.current.value)}
        placeholder="What needs to be done?"
      />
    </form>
  )
}

export default NewTaskForm
