import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../utils/api';
import { GoogleLogin } from '@react-oauth/google'; 
import AuthLayout from '../components/AuthLayout';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role] = useState('student');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return setError('Please enter a valid email address');
        }

        if (name.trim().length < 3) {
            return setError('Name must be at least 3 characters long');
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return setError('Password must be at least 6 characters, with 1 simple letter & 1 symbol');
        }

        try {
            const { data } = await api.post('/users/register', { name, email, password, role });
            if (data.needsVerification) {
                navigate(`/verify-email?email=${encodeURIComponent(email)}`);
            } else {
                login(data);
                navigate('/dashboard');
            }
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
            <h2 className="text-3xl font-extrabold text-primary mb-2">Sign up</h2>
            <p className="text-[11px] text-gray-400 mb-6 font-medium">Enter your details to create an account</p>
            {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-xs text-center mb-4 border border-red-100">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Full Name" className="auth-input" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email Address" className="auth-input" />
                
                <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" className="auth-input pr-16" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} title={showPassword ? "Hide Password" : "Show Password"} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                </div>

                <button type="submit" className="auth-btn w-full">
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
                        } catch { setError('Google Login Failed.'); }
                    }}
                    onError={() => setError('Google Login Failed.')}
                />
            </div>

            <p className="text-center text-gray-400 mt-6 text-[11px] font-medium">
                Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign in</Link>
            </p>
        </AuthLayout>
    );
};

export default Register;