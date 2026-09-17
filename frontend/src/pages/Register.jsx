import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google'; 
import AuthLayout from '../components/AuthLayout';
import { Eye, EyeOff } from 'lucide-react';
import { useRegister } from '../hooks/useRegister';

const Register = () => {
    const { 
        name, setName, email, setEmail, password, setPassword,
        role, setRole,
        showPassword, setShowPassword, error, setError,
        registerUser, handleGoogleLogin 
    } = useRegister();

    return (
        <AuthLayout 
            title="Join Us"
            subtitle="Create An Account"
            description="Unlock premium courses, interact with expert instructors, and take control of your learning journey today."
        >
            <h2 className="auth-title">Sign up</h2>
            <p className="auth-subtitle">Enter your details to create an account</p>
            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={registerUser} className="space-y-4">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Full Name" className="auth-input" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email Address" className="auth-input" />
                
                <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" className="auth-input pr-16" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} title={showPassword ? "Hide Password" : "Show Password"} className="password-toggle-btn absolute right-4 top-1/2 -translate-y-1/2">
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                </div>

                <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                        type="button"
                        onClick={() => setRole('student')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${role === 'student' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Student
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole('instructor')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${role === 'instructor' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Instructor
                    </button>
                </div>

                <button type="submit" className="auth-btn w-full mt-2">Sign Up</button>
            </form>

            <div className="auth-google-wrapper">
                <GoogleLogin onSuccess={(res) => handleGoogleLogin(res.credential)} onError={() => setError('Google Login Failed.')} />
            </div>

            <p className="auth-footer-text">
                Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
            </p>
        </AuthLayout>
    );
};

export default Register;