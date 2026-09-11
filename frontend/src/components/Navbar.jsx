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
        <nav style={{ padding: '10px 20px', background: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
            <h2><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>E-Learning</Link></h2>
            
            <div>
                {user ? (
                    <>
                        <span style={{ marginRight: '15px' }}>Hello, {user.name} ({user.role})</span>
                        <Link to="/dashboard" style={{ color: 'white', marginRight: '15px' }}>Dashboard</Link>
                        <button onClick={handleLogout} style={{ padding: '5px 10px', cursor: 'pointer' }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: 'white', marginRight: '15px' }}>Login</Link>
                        <Link to="/register" style={{ color: 'white' }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;