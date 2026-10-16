import { useState, useRef, useEffect } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const editInputRef = useRef(null);

  // Focus the input when entering edit mode
  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }
  }, [isEditing]);

  const startEditing = () => {
    if (todo.completed) return; // don't edit completed todos
    setEditValue(todo.text);
    setIsEditing(true);
  };

  const saveEdit = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditValue(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
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

      {isEditing ? (
        <div className="edit-wrapper">
          <input
            ref={editInputRef}
            className="edit-input"
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={saveEdit}
          />
        </div>
      ) : (
        <span className="todo-text" onDoubleClick={startEditing}>
          {todo.text}
        </span>
      )}

      {!isEditing && (
        <div className="todo-actions">
          {/* Edit button */}
          {!todo.completed && (
            <button
              className="btn-edit"
              onClick={startEditing}
              aria-label="Edit todo"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          )}

          {/* Delete button */}
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
        </div>
      )}
    </li>
  );
}

export default TodoItem;
