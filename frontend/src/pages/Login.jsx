import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google'; 
import AuthLayout from '../components/AuthLayout';
import { Eye, EyeOff } from 'lucide-react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const { 
        email, setEmail, password, setPassword,
        showPassword, setShowPassword, error, setError,
        loginUser, handleGoogleLogin 
    } = useLogin();

    return (
        <AuthLayout 
            title="Welcome"
            subtitle="To Learnify"
            description="Join thousands of learners gaining new skills, advancing careers, and shaping a better tomorrow. Access top-tier courses and expert instructors all in one place."
        >
            <h2 className="auth-title">Sign in</h2>
            <p className="auth-subtitle">Please login to your account to continue</p>
            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={loginUser} className="space-y-5">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email Address" className="auth-input" />
                
                <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" className="auth-input pr-16" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} title={showPassword ? "Hide" : "Show"} className="password-toggle-btn">
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                </div>

                <button type="submit" className="auth-btn w-full">Sign In</button>
            </form>

            <div className="auth-google-wrapper">
                <GoogleLogin onSuccess={(res) => handleGoogleLogin(res.credential)} onError={() => setError('Google Login Failed.')} />
            </div>

            <p className="auth-footer-text">
                Don't have an account? <Link to="/register" className="auth-link">Sign up</Link>
            </p>
        </AuthLayout>
    );
};

export default Login;