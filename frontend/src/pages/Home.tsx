import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-container">
      <h2>Welcome!</h2>
      {user && <p>You are logged in as: {user.email}</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
