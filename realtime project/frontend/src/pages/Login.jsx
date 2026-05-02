import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await login(formData.email, formData.password);
            if (data.user.role === 'farmer') {
                navigate('/farmer-dashboard');
            } else {
                navigate('/consumer-dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to login');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)', background: 'var(--color-background)' }}>
            <div className="card" style={{ padding: '2rem', width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Sprout size={48} color="var(--color-primary)" style={{ margin: '0 auto' }} />
                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary-dark)' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>Sign in to continue to AgriLink AI</p>
                </div>

                {error && <div style={{ background: '#ffebee', color: '#c62828', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" className="input" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" className="input" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                    </div>
                    
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Login</button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--color-text-muted)' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Create one</Link>
                </div>
            </div>
        </div>
    );
}
