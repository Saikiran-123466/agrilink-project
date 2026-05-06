import { useState, useEffect } from 'react';
import { ShoppingBag, Clock, Heart, Truck, Package } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';
import { getProductImage } from '../utils/imageHelper';

export default function ConsumerDashboard() {
  const { t, translateProduct } = useLanguage();
  const [recommendations, setRecommendations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeView, setActiveView] = useState('orders');
  const { user } = useAuth();
  const { favorites } = useFavorites();

  useEffect(() => {
    // Fetch mock AI recommendations
    axios.get('https://agrilink-project-proc.onrender.com/api/ai/recommendations/consumer/1')
      .then(res => setRecommendations(res.data))
      .catch(err => console.log(err));

    if (user) {
      axios.get(`https://agrilink-project-proc.onrender.com/api/orders/consumer/${user.id}`)
        .then(res => setOrders(res.data))
        .catch(err => console.log('Error fetching orders:', err));
    }
  }, [user]);

  return (
    <div style={{ background: '#f4f7f4', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container">
        <div className="mb-8">
          <h1 style={{ fontSize: '2rem', color: 'var(--color-primary-dark)' }}>{t.consDashWelcome}, {user ? user.name : 'Guest'}!</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>{t.consDashSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <ActionCard 
             icon={<ShoppingBag />} 
             title={t.orders}
             subtitle={`${orders.length} ${t.pastOrders}`} 
             isActive={activeView === 'orders'}
             onClick={() => { setActiveView('orders'); document.getElementById('dashboard-content')?.scrollIntoView({ behavior: 'smooth' }); }} 
          />
          <ActionCard 
             icon={<Truck />} 
             title={t.tracking} 
             subtitle={t.activeDel} 
             isActive={activeView === 'tracking'}
             onClick={() => { setActiveView('tracking'); document.getElementById('dashboard-content')?.scrollIntoView({ behavior: 'smooth' }); }}
          />
          <ActionCard 
             icon={<Heart />} 
             title={t.favorites} 
             subtitle={`${favorites.length} ${t.savedItems}`} 
             isActive={activeView === 'favorites'} 
             onClick={() => { setActiveView('favorites'); document.getElementById('dashboard-content')?.scrollIntoView({ behavior: 'smooth' }); }}
          />
          <ActionCard icon={<Clock />} title={t.subscriptions} subtitle={t.manageRecur} isActive={false} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="dashboard-content" style={{ scrollMarginTop: '100px' }}>
          
          {activeView === 'orders' ? (
            <div className="card" style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>{t.orderHistory}</h2>
            
            {orders.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)' }}>{t.noConsOrders}</p>
            ) : (
              <div className="flex flex-col gap-4">
                {orders.map(order => (
                  <div key={order.id} style={{ background: '#f8fcf5', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`badge ${order.status === 'pending' ? 'badge-yellow' : 'badge-green'}`} style={{ textTransform: 'capitalize' }}>
                        {order.status}
                      </span>
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                        {new Date(order.order_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div style={{ padding: '0.5rem', background: '#e0e0e0', borderRadius: '50%' }}>
                          <Package size={20} color="var(--color-primary-dark)" />
                        </div>
                        <div>
                        <p style={{ fontWeight: 600, color: 'var(--color-primary-dark)' }}>{translateProduct(order.product_name)}</p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontWeight: 'bold', color: 'var(--color-secondary)' }}>₹{order.total_price.toFixed(2)}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{t.qtyParam}: {order.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        ) : activeView === 'tracking' ? (
          <div className="card" style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>{t.tracking}</h2>
            
            {orders.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)' }}>{t.noTracking}</p>
            ) : (
              <div style={{ background: '#f8fcf5', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
                 <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary-dark)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   <Package size={22} color="var(--color-secondary)" /> {translateProduct(orders[0].product_name)}
                 </h3>
                 
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '0.5rem' }}>
                    <div style={{ background: 'var(--color-primary)', color: 'white', padding: '0.6rem', borderRadius: '50%' }}>
                       <Truck size={24} />
                    </div>
                    <div>
                       <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--color-text-main)' }}>{t.orderPlaced}</p>
                       <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{t.preparingGoods}</p>
                    </div>
                 </div>
              </div>
            )}
          </div>
        ) : activeView === 'favorites' ? (
          <div className="card" style={{ padding: '1.5rem', gridColumn: '1 / -1' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>{t.yourFavs}</h2>
            
            {favorites.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)' }}>{t.noFavs}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {favorites.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        ) : null}

        {/* AI Recommended for You */}
        <div className="card ai-glow" style={{ padding: '1.5rem', border: '1px solid var(--color-primary-light)' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)' }}>{t.aiSuggested}</h2>
            <span style={{ fontSize: '0.8rem', background: 'var(--color-primary)', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>{t.personalized}</span>
          </div>
            
            <div className="flex flex-col gap-4">
              {recommendations.length > 0 ? recommendations.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-3" style={{ border: '1px solid #ebebeb', borderRadius: 'var(--radius-md)', background: '#fff' }}>
                  <div style={{ width: '60px', height: '60px', background: '#eee', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                    <img src={getProductImage(item.name, item.image)} alt={translateProduct(item.name)} style={{width:'100%', height:'100%', objectFit: 'cover'}}/>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{translateProduct(item.name)} <span style={{ color: 'var(--color-secondary)' }}>₹{item.price.toFixed(2)}</span></h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{item.reasoning}</p>
                  </div>
                </div>
              )) : (
                <p>Loading AI recommendations...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon, title, subtitle, isActive, onClick }) {
  return (
    <div className="card flex items-center gap-4" style={{ padding: '1.5rem', cursor: 'pointer', border: isActive ? '2px solid var(--color-primary)' : '' }} onClick={onClick}>
      <div style={{ background: isActive ? 'var(--color-primary)' : '#e8f5e9', color: isActive ? '#fff' : 'var(--color-primary)', padding: '1rem', borderRadius: '50%' }}>
        {icon}
      </div>
      <div>
        <h3 style={{ fontSize: '1.1rem' }}>{title}</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{subtitle}</p>
      </div>
    </div>
  )
}
