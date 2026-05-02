import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import FarmerDashboard from './pages/FarmerDashboard';
import ConsumerDashboard from './pages/ConsumerDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Chatbot from './components/Chatbot';
import './index.css';

function OffersView() {
  const { t } = useLanguage();
  return (
    <div className="container" style={{ paddingTop: '5rem', paddingBottom: '10rem', textAlign: 'center' }}>
      <div className="glass animate-fade-in hover-glow" style={{ display: 'inline-block', padding: '3rem 4rem', borderRadius: 'var(--radius-lg)' }}>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>{t.offersEmptyTitle}</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem' }}>{t.offersEmptySub}</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <FavoritesProvider>
          <CartProvider>
            <Router>
              <div className="flex flex-col" style={{ minHeight: '100vh' }}>
                <Navbar />
                <main style={{ flex: 1 }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
                    <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
                    <Route path="/about" element={<div className="container" style={{paddingTop: '2rem'}}><h2>About Us</h2><p>Bridging the gap between farmers and consumers using AI.</p></div>} />
                    <Route path="/contact" element={<div className="container" style={{paddingTop: '2rem'}}><h2>Contact</h2><p>Support contact information.</p></div>} />
                    <Route path="/offers" element={<OffersView />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </Routes>
                </main>
                <Footer />
              </div>
              <Chatbot />
            </Router>
          </CartProvider>
        </FavoritesProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
