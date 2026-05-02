import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getProductImage } from '../utils/imageHelper';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const { t, translateProduct } = useLanguage();

  return (
    <div className="card flex flex-col" style={{ height: '100%', cursor: 'pointer', transition: 'transform 0.2s ease', '&:hover': { transform: 'translateY(-5px)' } }} onClick={() => navigate(`/product/${product.id}`)}>
      <div style={{ position: 'relative', height: '200px', backgroundColor: '#eef6ec' }}>
        <img 
          src={getProductImage(product.name, product.image)} 
          alt={translateProduct(product.name)} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <button 
           onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }}
           style={{ position: 'absolute', top: '10px', right: '10px', background: 'white', border: 'none', borderRadius: '50%', padding: '0.5rem', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
        >
           <Heart size={20} color={isFavorite(product.id) ? 'var(--color-secondary)' : '#666'} fill={isFavorite(product.id) ? 'var(--color-secondary)' : 'none'} />
        </button>
      </div>
      
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="flex justify-between items-center mb-2">
          <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-dark)' }}>{translateProduct(product.name)}</h3>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-secondary)' }}>₹{product.price}/{t[product.unit] || product.unit}</span>
        </div>
        
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem', flex: 1 }}>
          {t.fromParam}: {product.farmer_name} • {product.farmer_location}
        </p>
        
        <button 
          className="btn btn-primary" 
          style={{ width: '100%', marginTop: 'auto' }} 
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
        >
          <ShoppingCart size={18} style={{ marginRight: '0.5rem' }} /> {t.addCart}
        </button>
      </div>
    </div>
  );
}
