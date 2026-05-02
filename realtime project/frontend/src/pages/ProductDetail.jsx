import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { ShoppingCart, ArrowLeft, ShieldCheck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProductImage } from '../utils/imageHelper';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { t, translateProduct } = useLanguage();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Fetch product details
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => {
        console.log('Error fetching product, falling back to mock:', err);
        setProduct({
            id: id,
            name: 'Fresh Harvest ' + id,
            price: 2.50,
            unit: 'kg',
            farmer_name: 'Local Network Farm',
            farmer_location: 'Green Valley',
            organic: true,
            image: ''
        });
      })
      .finally(() => setLoading(false));

    // Fetch AI recommendations
    axios.get('http://localhost:5000/api/ai/recommendations/consumer/1')
      .then(res => {
        // Mock mapping since recommendations from AI might not have full product schemas
        const mockRecs = res.data.map((r, idx) => ({
          id: 100 + idx,
          name: r.name,
          price: r.price,
          unit: 'kg',
          farmer_name: 'Local Network',
          farmer_location: 'Nearby',
          organic: true,
          image: r.image
        }));
        setRecommendations(mockRecs);
      })
      .catch(err => console.log(err));
  }, [id]);

  if (loading) return <div className="container" style={{ padding: '4rem 0' }}>Loading...</div>;
  if (!product) return <div className="container" style={{ padding: '4rem 0' }}>Product not found.</div>;

  return (
    <div style={{ background: 'var(--color-surface)', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="container">
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary-dark)', marginBottom: '2rem', fontWeight: 'bold' }}>
          <ArrowLeft size={20} /> Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div style={{ borderRadius: '1rem', overflow: 'hidden', height: '400px', backgroundColor: '#eef6ec' }}>
            <img 
              src={getProductImage(product.name, product.image)} 
              alt={translateProduct(product.name)} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {product.organic && <span className="badge badge-green" style={{ alignSelf: 'flex-start', marginBottom: '1rem' }}>🌱 Certified Organic</span>}
            <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>{translateProduct(product.name)}</h1>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--color-secondary)', fontWeight: 'bold', marginBottom: '1rem' }}>
              ₹{product.price} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>/ {product.unit}</span>
            </h2>
            
            <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#333' }}>
                <ShieldCheck size={18} color="var(--color-primary)" /> 
                {t.farmerInfoSection}
              </h4>
              <p><strong>{t.farmerNameLabel}</strong> {product.farmer_name}</p>
              <p><strong>{t.farmerLocationLabel}</strong> {product.farmer_location}</p>
              {product.cultivated_date && <p><strong>{t.cultivatedDate}:</strong> {new Date(product.cultivated_date).toLocaleDateString()}</p>}
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{t.farmerDirectPriceInfo}</p>
            </div>

            {product.organic && (
              <div style={{ background: '#e8f5e9', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', border: '1px solid #c8e6c9' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#2e7d32' }}>
                  <ShieldCheck size={18} /> 
                  {t.ancientMethodsTitle}
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#388e3c', marginBottom: '0.5rem' }}>{t.ancientMethodsSub}</p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', fontSize: '0.85rem', color: '#2e7d32', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li><strong>{t.jeevamrutham}</strong> {t.jeevamruthamDesc}</li>
                  <li><strong>{t.panchagavya}</strong> {t.panchagavyaDesc}</li>
                  <li><strong>{t.cropRotation}</strong> {t.cropRotationDesc}</li>
                  <li><strong>{t.neemExtracts}</strong> {t.neemExtractsDesc}</li>
                </ul>
              </div>
            )}

            <button className="btn btn-primary" style={{ padding: '1rem', fontSize: '1.1rem' }} onClick={() => addToCart(product)}>
              <ShoppingCart size={20} style={{ marginRight: '0.5rem' }} /> Add to Cart
            </button>
          </div>
        </div>

        {/* AI Recommendations */}
        <div style={{ marginTop: '4rem' }}>
          <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             ✨ {t.aiSuggested}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map(rec => (
              <ProductCard key={rec.id} product={rec} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
