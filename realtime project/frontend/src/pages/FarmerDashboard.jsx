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
        .catch(() => alert("Failed to update product"));
    } else {
      // 🔥 FIXED ADD PRODUCT
      axios.post(`${API_URL}/api/products`, {
        name: newProduct.name,
        category: newProduct.category,
        price: parseFloat(newProduct.price),
        quantity: parseInt(newProduct.quantity),
        unit: newProduct.unit,
        organic: newProduct.organic,
        farmer_id: user?.id || 1
      })
        .then(() => {
          setShowAddModal(false);
          fetchProducts();
          setNewProduct({ name: '', category: '', price: '', quantity: '', unit: 'kg', organic: false, image: '', cultivated_date: '' });
        })
        .catch(() => alert("Failed to add product"));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post(`${API_URL}/api/products/upload`, formData);
      setNewProduct({...newProduct, image: API_URL + res.data.imageUrl});
    } catch (err) {
      alert("Failed to upload image");
    }
  };

  // ⚠️ only small fix here (image preview)
  const getImageUrl = (img) => {
    if (!img) return '';
    if (img.startsWith('http')) return img;
    return API_URL + img;
  };

  return (
    <div style={{ background: '#f4f7f4', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container">
        <h1>{t.dashboard}</h1>

        {products.map(product => (
          <div key={product.id}>
            <img src={getImageUrl(product.image)} alt="" width="80" />
            {product.name}
          </div>
        ))}
      </div>
    </div>
  );
}