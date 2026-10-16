import { useState } from 'react';
import LoginPage from './components/LoginPage';
import TodoPage from './components/TodoPage';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('todo_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (email) => {
    const userData = { email };
    localStorage.setItem('todo_user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('todo_user');
    setUser(null);
  };

  return user ? (
    <TodoPage user={user} onLogout={handleLogout} />
  ) : (
    <LoginPage onLogin={handleLogin} />
  );
}

export default App;
