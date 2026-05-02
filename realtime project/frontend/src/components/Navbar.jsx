import { Link, useNavigate } from 'react-router-dom';
import { Sprout, ShoppingBasket, Search, MapPin, Phone, User, LogIn, Menu, LogOut, ChevronDown, Globe } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCatOpen, setIsCatOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { lang, setLang, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`/marketplace`);
    }
  };

  return (
    <nav className="glass animate-fade-in" style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 50, 
      width: '100%',
      borderRadius: 0,
      transition: 'all 0.3s ease'
    }}>
      {/* Top Utility Bar removed to drastically reduce height */}

      {/* Main Navbar */}
      <div className="container" style={{ padding: '0.4rem 1.5rem' }}>
        <div className="flex justify-between items-center gap-6">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
            <Sprout size={28} />
            <span style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.5px' }}>AgriLink<span style={{ color: 'var(--color-secondary)' }}>.AI</span></span>
          </Link>

          {/* Central Search Bar */}
          <div className="flex-1" style={{ display: 'none' }} id="desktop-search">
            <form onSubmit={handleSearch} className="flex w-full" style={{ border: '1px solid var(--color-primary-light)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <input 
                type="text" 
                placeholder={t.navSearch} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ flex: 1, padding: '0.4rem 1rem', border: 'none', outline: 'none', fontSize: '0.9rem' }} 
              />
              <button type="submit" style={{ background: 'var(--color-primary)', border: 'none', padding: '0 1.5rem', color: '#fff', cursor: 'pointer' }}>
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* User & Cart Actions */}
          <div className="flex items-center gap-6">

            {/* Global Language Selector */}
            <div className="flex items-center gap-2" style={{ background: '#f5f5f5', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-full)' }}>
              <Globe size={18} color="var(--color-primary)" />
              <select style={{ border: 'none', background: 'transparent', outline: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }} value={lang} onChange={(e) => setLang(e.target.value)}>
                <option value="en">EN</option>
                <option value="te">తెలుగు</option>
              </select>
            </div>

            {user ? (
              <div className="flex items-center gap-2 cursor-pointer" onClick={logout}>
                <User size={24} color="var(--color-text-muted)" />
                <div style={{ display: 'none' }} id="desktop-user">
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block' }}>Account</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Logout</span>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2">
                <User size={24} color="var(--color-text-muted)" />
                <div style={{ display: 'none' }} id="desktop-user">
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block' }}>Account</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Login</span>
                </div>
              </Link>
            )}

            <Link to="/cart" className="flex items-center gap-2 p-2 rounded" style={{ background: '#f5f5f5', textDecoration: 'none' }}>
              <div style={{ position: 'relative' }}>
                <ShoppingBasket size={28} color="var(--color-primary)" />
                {cartCount > 0 && (
                   <span style={{ position: 'absolute', top: '-5px', right: '-8px', background: 'var(--color-secondary)', color: 'white', borderRadius: '50%', padding: '0.1rem 0.4rem', fontSize: '0.75rem', fontWeight: 'bold' }}>{cartCount}</span>
                )}
              </div>
              <div style={{ display: 'none' }} id="desktop-cart">
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block' }}>{t.navBasket}</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{cartCount} {t.navItems}</span>
              </div>
            </Link>
            
            <button className="btn btn-secondary" style={{ padding: '0.5rem', display: 'flex' }} onClick={() => setIsOpen(!isOpen)} id="mobile-menu-btn">
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Category Tier (Desktop Only) */}
        <div style={{ display: 'none', borderTop: '1px solid #eee', marginTop: '0.4rem', paddingTop: '0.4rem', paddingBottom: '0.2rem' }} id="desktop-nav">
          <div className="flex gap-8 items-center">
            
            <div style={{ position: 'relative' }}>
              <button onClick={() => setIsCatOpen(!isCatOpen)} className="btn btn-primary" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
                {t.navShopCategory} <ChevronDown size={16} />
              </button>
              
              {isCatOpen && (
                <div className="glass" style={{ position: 'absolute', top: '100%', left: 0, marginTop: '0.5rem', minWidth: '220px', display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius-md)', overflow: 'hidden', zIndex: 100, boxShadow: 'var(--shadow-lg)' }}>
                  <Link to="/marketplace?category=all" onClick={() => setIsCatOpen(false)} style={{ padding: '0.8rem 1rem', borderBottom: '1px solid rgba(0,0,0,0.05)', color: 'var(--color-text-main)', textDecoration: 'none' }}>{t.navAll}</Link>
                  <Link to="/marketplace?category=vegetables" onClick={() => setIsCatOpen(false)} style={{ padding: '0.8rem 1rem', borderBottom: '1px solid rgba(0,0,0,0.05)', color: 'var(--color-text-main)', textDecoration: 'none' }}>{t.navVegetables}</Link>
                  <Link to="/marketplace?category=fruits" onClick={() => setIsCatOpen(false)} style={{ padding: '0.8rem 1rem', borderBottom: '1px solid rgba(0,0,0,0.05)', color: 'var(--color-text-main)', textDecoration: 'none' }}>{t.navFruits}</Link>
                  <Link to="/marketplace?category=grains" onClick={() => setIsCatOpen(false)} style={{ padding: '0.8rem 1rem', color: 'var(--color-text-main)', textDecoration: 'none' }}>{t.navGrains}</Link>
                </div>
              )}
            </div>

            <Link to="/marketplace" style={{ fontWeight: 500, fontSize: '0.95rem' }}>{t.navMarketplace}</Link>
            {user && user.role === 'farmer' && <Link to="/farmer-dashboard" style={{ fontWeight: 500, fontSize: '0.95rem' }}>{t.navFarmerDash}</Link>}
            {user && user.role === 'consumer' && <Link to="/consumer-dashboard" style={{ fontWeight: 500, fontSize: '0.95rem' }}>{t.navConsumerDash}</Link>}
            <Link to="/offers" style={{ fontWeight: 500, fontSize: '0.95rem', color: 'var(--color-secondary)' }}>{t.navOffers}</Link>
          </div>
        </div>

      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div style={{ padding: '1rem', background: '#fff', borderTop: '1px solid #eee' }}>
          <div className="flex flex-col gap-4">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/marketplace" onClick={() => setIsOpen(false)}>Marketplace</Link>
            {user && user.role === 'farmer' && <Link to="/farmer-dashboard" onClick={() => setIsOpen(false)}>Farmer Dashboard</Link>}
            {user && user.role === 'consumer' && <Link to="/consumer-dashboard" onClick={() => setIsOpen(false)}>Consumer Dashboard</Link>}
          </div>
        </div>
      )}

      <style>{`
        .text-muted { color: var(--color-text-muted); }
        @media (min-width: 768px) {
          #desktop-nav { display: block !important; }
          #desktop-search { display: block !important; }
          #desktop-user { display: block !important; }
          #desktop-cart { display: block !important; }
          #mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
