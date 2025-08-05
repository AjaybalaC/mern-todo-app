import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="max-w-2xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">To-Do App</h1>
        {localStorage.getItem('token') && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;