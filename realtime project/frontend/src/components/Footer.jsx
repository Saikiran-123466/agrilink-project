import { Link } from 'react-router-dom';
import { Sprout, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-primary-dark)', color: '#fff', paddingTop: '4rem', paddingBottom: '2rem', marginTop: 'auto' }}>
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 mb-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4" style={{ color: '#fff' }}>
            <Sprout size={32} color="var(--color-secondary)" />
            <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.5px' }}>AgriLink<span style={{ color: 'var(--color-secondary)' }}>.AI</span></span>
          </Link>
          <p style={{ color: '#e8f5e9', marginBottom: '1.5rem' }}>Empowering farmers and consumers through AI-driven direct market access.</p>
        </div>
        
        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--color-secondary)' }}>Quick Links</h4>
          <ul className="flex flex-col gap-2">
            <li><Link to="/marketplace" style={{ color: '#e8f5e9' }}>Marketplace</Link></li>
            <li><Link to="/farmer-dashboard" style={{ color: '#e8f5e9' }}>For Farmers</Link></li>
            <li><Link to="/about" style={{ color: '#e8f5e9' }}>About Us</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--color-secondary)' }}>Contact</h4>
          <ul className="flex flex-col gap-4" style={{ color: '#e8f5e9' }}>
            <li className="flex items-center gap-2"><Mail size={16} /> support@agrilink.ai</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +1 (800) 123-4567</li>
            <li className="flex items-center gap-2"><MapPin size={16} /> 123 Green Valley Tech Park</li>
          </ul>
        </div>
      </div>
      
      <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', textAlign: 'center', color: '#e8f5e9', fontSize: '0.9rem' }}>
        &copy; {new Date().getFullYear()} AgriLink AI. All rights reserved.
      </div>
    </footer>
  );
}
