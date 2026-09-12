import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../utils/api';
import { GoogleLogin } from '@react-oauth/google'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/users/login', { email, password });
            login(data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-md border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Login
                </button>
            </form>

         
            <div className="mt-8 border-t border-gray-200 pt-6">
                <p className="text-center text-gray-500 mb-4 text-sm font-medium">Or continue with</p>
                <div className="flex justify-center">
                    <GoogleLogin
                        onSuccess={async (credentialResponse) => {
                            try {
                                const { data } = await api.post('/users/google', { 
                                    credential: credentialResponse.credential 
                                });
                                login(data);
                                navigate('/dashboard');
                            } catch (err) {
                                setError('Google Login Failed. Please try again.');
                            }
                        }}
                        onError={() => {
                            setError('Google Login Failed. Please check your connection.');
                        }}
                    />
                </div>
            </div>

            <p className="text-center text-gray-600 mt-8">
                Don't have an account? <Link to="/register" className="text-blue-600 hover:underline font-semibold">Register here</Link>
            </p>
        </div>
    );
};

export default Login;