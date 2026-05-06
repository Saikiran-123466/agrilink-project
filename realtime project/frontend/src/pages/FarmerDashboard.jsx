import { useState, useEffect } from 'react';
import { Package, TrendingUp, DollarSign, Brain, Plus, X, Globe } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { getProductImage } from '../utils/imageHelper';

const API_URL = "https://agrilink-project-proc.onrender.com";

export default function FarmerDashboard() {
  const { t, translateProduct } = useLanguage();
  const [insights, setInsights] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [profileViews, setProfileViews] = useState(342);
  const { user } = useAuth();

  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', quantity: '', unit: 'kg', organic: false, image: '', cultivated_date: '' });

  useEffect(() => {
    axios.get(`${API_URL}/api/ai/insights/farmer/1`)
      .then(res => setInsights(res.data))
      .catch(err => console.log(err));

    if (user) {
      fetchProducts();
      fetchOrders();
    }

    const interval = setInterval(() => {
      setProfileViews(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => clearInterval(interval);
  }, [user]);

  const fetchOrders = () => {
    axios.get(`${API_URL}/api/orders/farmer/${user?.id || 1}`)
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  };

  const fetchProducts = () => {
    axios.get(`${API_URL}/api/products/farmer/${user?.id || 1}`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  };

  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setNewProduct({
      name: translateProduct(product.name),
      category: product.category,
      price: product.price,
      quantity: product.quantity,
      unit: product.unit,
      organic: product.organic ? true : false,
      image: product.image || '',
      cultivated_date: product.cultivated_date || ''
    });
    setShowAddModal(true);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (editingProductId) {
      axios.put(`${API_URL}/api/products/${editingProductId}`, { ...newProduct })
        .then(() => {
          setShowAddModal(false);
          fetchProducts();
          setNewProduct({ name: '', category: '', price: '', quantity: '', unit: 'kg', organic: false, image: '', cultivated_date: '' });
          setEditingProductId(null);
        })
        .catch(err => alert("Failed to update product"));
    } else {
      axios.post(`${API_URL}/api/products`, { ...newProduct, farmer_id: user?.id || 1 })
        .then(() => {
          setShowAddModal(false);
          fetchProducts();
          setNewProduct({ name: '', category: '', price: '', quantity: '', unit: 'kg', organic: false, image: '', cultivated_date: '' });
        })
        .catch(err => alert("Failed to add product"));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const res = await axios.post(`${API_URL}/api/products/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setNewProduct({
        ...newProduct,
        image: API_URL + res.data.imageUrl
      });

    } catch (err) {
      alert("Failed to upload image");
      console.error(err);
    }
  };

  return (
    <div style={{ background: '#f4f7f4', minHeight: '100vh', padding: '2rem 0', position: 'relative' }}>
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 style={{ fontSize: '2rem', color: 'var(--color-primary-dark)' }}>{t.dashboard}</h1>
            <p style={{ color: 'var(--color-text-muted)' }}>{t.dashboardDesc}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="btn btn-primary flex items-center gap-2" onClick={() => {
              setEditingProductId(null);
              setNewProduct({ name: '', category: '', price: '', quantity: '', unit: 'kg', organic: false, image: '', cultivated_date: '' });
              setShowAddModal(true);
            }}>
              <Plus size={18} /> {t.addProduct}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard icon={<DollarSign size={24} />} title={t.totalSales} value={`₹${orders.reduce((sum, order) => sum + order.total_price, 0).toFixed(2)}`} trend="Realtime" color="var(--color-primary)" />
          <StatCard icon={<Package size={24} />} title={t.activeProducts} value={products.length.toString()} trend="Live" color="var(--color-secondary)" />
          <StatCard icon={<TrendingUp size={24} />} title={t.profileViews} value={profileViews.toString()} trend="Live Updates" color="#0288d1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6 flex flex-col gap-6">
            <div className="card" style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>{t.apiListings}</h2>
              
              {products.length === 0 ? (
                <p style={{ color: 'var(--color-text-muted)' }}>{t.noProducts}</p>
              ) : (
                products.map(product => (
                  <div key={product.id} className="flex justify-between items-center py-4" style={{ borderBottom: '1px solid #eee' }}>
                    <div className="flex items-center gap-4">
                      <div style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)', background: '#eee', overflow: 'hidden' }}>
                        <img 
                          src={getProductImage(product.name, product.image)} 
                          alt={product.name} 
                          style={{width:'100%', height:'100%', objectFit:'cover'}}
                        />
                      </div>
                      <div>
                        <h4 style={{ fontWeight: 600 }}>{translateProduct(product.name)} {product.organic ? '🌱' : ''}</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>₹{product.price} / {t[product.unit] || product.unit} • {product.quantity} {t[product.unit] || product.unit} {t.stock}</p>
                      </div>
                    </div>
                    <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }} onClick={() => handleEditClick(product)}>{t.edit}</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '1rem', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)' }}>{editingProductId ? t.editProductParam : t.addNewProductParam}</h2>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            
            <form onSubmit={handleAddProduct} className="flex flex-col gap-4">

              <div className="input-group">
                <label>{t.prodName}</label>
                <input type="text" className="input" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
              </div>

              <div className="input-group">
                <label>{t.image}</label>

                <input
                  type="file"
                  accept="image/*"
                  className="input"
                  onChange={handleImageUpload}
                />

                {newProduct.image && (
                  <img
                    src={newProduct.image}
                    alt="preview"
                    style={{
                      width: '100px',
                      marginTop: '10px',
                      borderRadius: '10px'
                    }}
                  />
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                {editingProductId ? t.saveChanges : t.publishProduct}
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, title, value, trend, color }) {
  return (
    <div className="card" style={{ padding: '1.5rem' }}>
      <div className="flex justify-between items-start mb-4">
        <div style={{ background: `${color}20`, padding: '0.75rem', borderRadius: 'var(--radius-md)', color: color }}>
          {icon}
        </div>
        <span style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem' }}>{trend}</span>
      </div>
      <div>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{title}</p>
        <h3 style={{ fontSize: '1.8rem', color: 'var(--color-text-main)' }}>{value}</h3>
      </div>
    </div>
  )
}