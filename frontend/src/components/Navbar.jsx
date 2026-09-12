import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="flex justify-between items-center bg-gray-900 text-white py-4 px-8 shadow-md">
            <h2 className="text-2xl font-bold tracking-wider">
                <Link to="/" className="text-white hover:text-blue-400 transition duration-300">
                    E-Learning
                </Link>
            </h2>
            
            <div className="flex items-center gap-6">
                {user ? (
                    <>
                        <span className="text-gray-300">Hello, <span className="font-semibold text-white">{user.name}</span> ({user.role})</span>
                        <Link to="/dashboard" className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md transition duration-300">
                            Dashboard
                        </Link>
                        <button 
                            onClick={handleLogout} 
                            className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md transition duration-300"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-blue-400 transition duration-300">Login</Link>
                        <Link to="/register" className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-md transition duration-300">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;