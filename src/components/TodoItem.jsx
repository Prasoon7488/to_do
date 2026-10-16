function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <button
        className="todo-checkbox"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
      >
        {todo.completed ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
          </svg>
        )}
      </button>

      <span className="todo-text">{todo.text}</span>

      <button
        className="btn-delete"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete todo"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </li>
  );
}

export default TodoItem;
