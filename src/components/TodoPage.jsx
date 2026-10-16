import { useState, useEffect, useRef } from 'react';
import TodoItem from './TodoItem';

const STORAGE_KEY = 'todo_items';

function loadTodos() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function TodoPage({ user, onLogout }) {
  const [todos, setTodos] = useState(loadTodos);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'
  const inputRef = useRef(null);

  // Persist todos whenever they change
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // Auto-focus the input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setInputValue('');
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const remaining = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="todo-container">
      {/* Header */}
      <header className="todo-header">
        <div className="header-left">
          <h1>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 10, verticalAlign: 'middle' }}>
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            My Todos
          </h1>
        </div>
        <div className="header-right">
          <span className="user-email">{user.email}</span>
          <button className="btn-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Add Todo */}
      <form className="add-todo-form" onSubmit={addTodo}>
        <input
          ref={inputRef}
          type="text"
          className="add-todo-input"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="btn-add">
          Add
        </button>
      </form>

      {/* Filters */}
      <div className="filters-bar">
        <div className="filter-buttons">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <span className="remaining-count">
          {remaining} {remaining === 1 ? 'item' : 'items'} left
        </span>
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {filteredTodos.length === 0 && (
          <li className="empty-state">
            {filter === 'all'
              ? '🎉  No todos yet — add one above!'
              : filter === 'active'
              ? '✅  All caught up!'
              : '📝  Nothing completed yet.'}
          </li>
        )}
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))}
      </ul>

      {/* Footer */}
      {completedCount > 0 && (
        <div className="todo-footer">
          <button className="btn-clear" onClick={clearCompleted}>
            Clear completed ({completedCount})
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoPage;
