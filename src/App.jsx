import { useState } from 'react';

function App() {
  const [ todos , setTodos ] = useState(window.localStorage.getItem("todos").split(",").filter(item => item !== "") || [])
  const [ newTodo, setNewTodo ] = useState("")
  const [ modifiedTodo, setModifiedTodo ] = useState("")
  const [ isModifying, setIsModifying ] = useState(false)
  const [ modifiedIndex, setModifiedIndex ] = useState(null);

  // 새로운 할일 생성
  const handleNewTodoSubmit = (e) => {
    e.preventDefault()
    if(newTodo !== ""){
      const newTodos = [...todos, newTodo]
      setTodos(newTodos)
      window.localStorage.setItem("todos", newTodos)
    }
    setNewTodo("")
  }

  const handleModifyTodoSubmit = (e) => {
    e.preventDefault()
    if(modifiedTodo !== ""){
      const modifiedTodos = todos.map((todo, index) => {
        return index === modifiedIndex ? modifiedTodo : todo
      })
      setTodos(modifiedTodos)
      window.localStorage.setItem("todos", modifiedTodo)
    }
    setIsModifying(false)
    setModifiedIndex(null)
    setModifiedTodo("")
  }

  const handleModify = (index) => {
    setIsModifying(true)
    setModifiedIndex(index)
    setModifiedTodo(todos[index])
  }

  const handleDelete = (index) => {
    const filteredTodos = todos.filter((_, idx) => idx !== index)
    setTodos(filteredTodos)
    window.localStorage.setItem("todos", filteredTodos)
  }

  return (
    <div className="App">
      <h1>todo</h1>
      <form className='new-form' onSubmit={handleNewTodoSubmit}>
        <input type='text' placeholder='할 일을 입력해주세요' value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/>
        <button type='submit'>+</button>
      </form>
      {isModifying && <form className='modify-form' onSubmit={handleModifyTodoSubmit}>
          <input type='text' placeholder='수정할 내용을 입력해주세요' value={modifiedTodo} onChange={(e) => setModifiedTodo(e.target.value)}/>
          <button type='submit'>저장</button>
          <button onClick={() => setIsModifying(false)}>취소</button>
        </form>}
      <section className='todo-container'>
        {todos && todos.map((todo, index) => ( 
          <div key={index}>
            <input id={index} type="checkbox" />
            <label htmlFor={index}>{todo}</label>
            <button onClick={() => handleModify(index)}>수정</button>
            <button onClick={() => handleDelete(index)}>삭제</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;