import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../utils/api';
import { GoogleLogin } from '@react-oauth/google'; 
import AuthLayout from '../components/AuthLayout';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/users/register', { name, email, password, role });
            login(data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <AuthLayout 
            title="Join Us"
            subtitle="Create An Account"
            description="Unlock premium courses, interact with expert instructors, and take control of your learning journey today."
        >
            <h2 className="text-3xl font-extrabold text-[#1256ae] mb-2">Sign up</h2>
            <p className="text-[11px] text-gray-400 mb-6 font-medium">Enter your details to create an account</p>
            
            {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-xs text-center mb-4 border border-red-100">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    placeholder="Full Name"
                    className="w-full p-4 bg-transparent border border-gray-200 rounded-xl focus:outline-none focus:border-[#1256ae] text-sm text-gray-800 placeholder-gray-400 transition-colors"
                />

                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    placeholder="Email Address"
                    className="w-full p-4 bg-transparent border border-gray-200 rounded-xl focus:outline-none focus:border-[#1256ae] text-sm text-gray-800 placeholder-gray-400 transition-colors"
                />
                
                <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        placeholder="Password"
                        className="w-full p-4 bg-transparent border border-gray-200 rounded-xl focus:outline-none focus:border-[#1256ae] text-sm text-gray-800 placeholder-gray-400 pr-16 transition-colors"
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#1256ae] hover:text-blue-800 tracking-wider"
                    >
                        {showPassword ? "HIDE" : "SHOW"}
                    </button>
                </div>

                <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                    className="w-full p-4 bg-transparent border border-gray-200 rounded-xl focus:outline-none focus:border-[#1256ae] text-sm text-gray-600 transition-colors appearance-none"
                >
                    <option value="student">Join as a Student</option>
                    <option value="instructor">Join as an Instructor</option>
                </select>

                <button type="submit" className="w-full bg-[#1256ae] text-white font-bold py-4 rounded-xl hover:bg-[#0c3977] hover:shadow-lg transition-all mt-4 text-sm">
                    Sign Up
                </button>
            </form>

            <div className="mt-6 flex justify-center hover:scale-105 transition-transform duration-300">
                <GoogleLogin
                    onSuccess={async (res) => {
                        try {
                            const { data } = await api.post('/users/google', { credential: res.credential });
                            login(data);
                            navigate('/dashboard');
                        } catch (err) { setError('Google Login Failed.'); }
                    }}
                    onError={() => setError('Google Login Failed.')}
                />
            </div>

            <p className="text-center text-gray-400 mt-6 text-[11px] font-medium">
                Already have an account? <Link to="/login" className="text-[#1256ae] font-bold hover:underline">Sign in</Link>
            </p>
        </AuthLayout>
    );
};

export default Register;