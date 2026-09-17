import { useState, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/users/verify-email`, { email, code });
            login(data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Verification failed');
            setLoading(false);
        }
    };

    if (!email) {
        return <div style={{textAlign: 'center', padding: '50px'}}>Invalid verification link</div>;
    }

    return (
        <div className="verify-container">
            <div className="verify-card">
                <h2 className="verify-title">Verify Email</h2>
                <p className="verify-desc">We sent a 6-digit code to <strong>{email}</strong>. Enter it below to continue.</p>
                
                {error && <div style={{ color: '#ef4444', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '5px', marginBottom: '20px', fontSize: '14px', fontWeight: 'bold' }}>{error}</div>}

                <form onSubmit={handleVerify}>
                    <input 
                        type="text" 
                        maxLength={6} 
                        className="verify-input" 
                        placeholder="000000"
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                        required
                    />
                    <button type="submit" className="verify-btn" disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify Account'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyEmail;
