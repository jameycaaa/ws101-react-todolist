import React, { useState, useEffect } from 'react';
import TodoList from './components/todolist.jsx';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (input.trim()) {
      const newTodo = { id: Date.now(), text: input, completed: false };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInput('');
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
  };

  const handleClearTodos = () => {
    setTodos([]);
    localStorage.removeItem('todos');
  };

  const handleEditTodo = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const handleToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <TodoList
        todos={todos}
        onDelete={handleDeleteTodo}
        onEdit={handleEditTodo}
        onToggleComplete={handleToggleComplete}
      />
      {todos.length > 0 && (
        <button className="clear-btn" onClick={handleClearTodos}>
          Clear Todos
        </button>
      )}
    </div>
  );
}

export default App;