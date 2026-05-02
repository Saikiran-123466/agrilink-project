import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Trash2, CreditCard } from 'lucide-react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductImage } from '../utils/imageHelper';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { t, translateProduct } = useLanguage();
  const navigate = useNavigate();
  const [placingOrder, setPlacingOrder] = useState(false);

  const DELIVERY_FEE = 2.00; // Flat transparent fee

  const handleCheckout = () => {
    if (!user) {
      alert("Please login to place an order");
      navigate('/login');
      return;
    }
    
    setPlacingOrder(true);
    const orderPayload = {
      consumer_id: user.id,
      items: cart.map(item => ({ product_id: item.id, quantity: item.quantity, price: item.price })),
      total_price: cartTotal + DELIVERY_FEE
    };

    axios.post('http://localhost:5000/api/orders', orderPayload)
      .then(res => {
        alert("Order successfully placed!");
        clearCart();
        navigate('/consumer-dashboard');
      })
      .catch(err => {
        alert("Failed to place order.");
        console.error(err);
      })
      .finally(() => setPlacingOrder(false));
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>Your Cart is Empty</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>Browse the marketplace to support local farmers.</p>
        <button className="btn btn-primary" style={{ marginTop: '2rem' }} onClick={() => navigate('/marketplace')}>Go to Marketplace</button>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--color-surface)', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="container">
        <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary-dark)', marginBottom: '2rem' }}>Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2">
            <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                  <img src={getProductImage(item.name, item.image)} alt={translateProduct(item.name)} style={{ width: '80px', height: '80px', borderRadius: '0.5rem', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>{translateProduct(item.name)}</h3>
                    <p style={{ color: 'var(--color-secondary)', fontWeight: 'bold' }}>₹{item.price} / {item.unit}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>From: {item.farmer_name}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input 
                      type="number" 
                      className="input" 
                      style={{ width: '70px', padding: '0.5rem' }} 
                      value={item.quantity} 
                      min="1" 
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} 
                    />
                    <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#ff5252', cursor: 'pointer', padding: '0.5rem' }}>
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Summary */}
          <div>
            <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Transparent Summary</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Products Total</span>
                <span style={{ fontWeight: 'bold' }}>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--color-secondary)' }}>
                <span>Farmers' Share (100%)</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1.5rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Platform & Delivery Fee</span>
                <span style={{ fontWeight: 'bold' }}>₹{DELIVERY_FEE.toFixed(2)}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>
                <span>Total to Pay</span>
                <span>₹{(cartTotal + DELIVERY_FEE).toFixed(2)}</span>
              </div>

              <button 
                className="btn btn-primary" 
                style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', padding: '1rem' }}
                onClick={handleCheckout}
                disabled={placingOrder}
              >
                <CreditCard size={20} /> {placingOrder ? 'Processing...' : 'Place Secure Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
