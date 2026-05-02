import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'consumer', location: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(formData.name, formData.email, formData.password, formData.role, formData.location);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to register');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem 1rem', minHeight: 'calc(100vh - 200px)', background: 'var(--color-background)' }}>
            <div className="card" style={{ padding: '2rem', width: '100%', maxWidth: '500px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Sprout size={48} color="var(--color-primary)" style={{ margin: '0 auto' }} />
                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary-dark)' }}>Create an Account</h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>Join AgriLink AI and transform your agriculture experience.</p>
                </div>

                {error && <div style={{ background: '#ffebee', color: '#c62828', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="input-group">
                        <label>Full Name</label>
                        <input type="text" className="input" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    
                    <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" className="input" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="input-group">
                            <label>Password</label>
                            <input type="password" className="input" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                        </div>
                        <div className="input-group">
                            <label>Location/City</label>
                            <input type="text" className="input" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="e.g. Greenville" />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>I am a...</label>
                        <div className="flex gap-4">
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', flex: 1, padding: '1rem', border: formData.role === 'consumer' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                                <input type="radio" name="role" value="consumer" checked={formData.role === 'consumer'} onChange={e => setFormData({...formData, role: e.target.value})} />
                                Consumer / Buyer
                            </label>
                            
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', flex: 1, padding: '1rem', border: formData.role === 'farmer' ? '2px solid var(--color-secondary)' : '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                                <input type="radio" name="role" value="farmer" checked={formData.role === 'farmer'} onChange={e => setFormData({...formData, role: e.target.value})} />
                                Farmer / Seller
                            </label>
                        </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--color-text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Log in</Link>
                </div>
            </div>
        </div>
    );
}
