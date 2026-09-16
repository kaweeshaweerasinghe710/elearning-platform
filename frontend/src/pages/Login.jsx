import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../utils/api';
import { GoogleLogin } from '@react-oauth/google'; 
import AuthLayout from '../components/AuthLayout';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
        <AuthLayout 
            title="Welcome"
            subtitle="To Learnify"
            description="Join thousands of learners gaining new skills, advancing careers, and shaping a better tomorrow. Access top-tier courses and expert instructors all in one place."
        >
            <h2 className="text-3xl font-extrabold text-primary mb-2">Sign in</h2>
            <p className="text-[11px] text-gray-400 mb-8 font-medium">Please login to your account to continue</p>
            {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-xs text-center mb-5 border border-red-100">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email Address" className="auth-input" />
                
                <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" className="auth-input pr-16" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} title={showPassword ? "Hide Password" : "Show Password"} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                </div>

                <div className="flex justify-between items-center px-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 text-primary focus:ring-primary" />
                    </label>
                </div>

                <button type="submit" className="auth-btn w-full">
                    Sign In
                </button>
            </form>

            <div className="mt-6 flex justify-center hover:scale-105 transition-transform duration-300">
                <GoogleLogin
                    onSuccess={async (res) => {
                        try {
                            const { data } = await api.post('/users/google', { credential: res.credential });
                            login(data);
                            navigate('/dashboard');
                        } catch { setError('Google Login Failed.'); }
                    }}
                    onError={() => setError('Google Login Failed.')}
                />
            </div>

            <p className="text-center text-gray-400 mt-8 text-[11px] font-medium">
                Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Sign up</Link>
            </p>
        </AuthLayout>
    );
};

export default Login;