import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

export default function Marketplace() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Fresh Tomatoes', price: 2.50, unit: 'kg', farmer_name: 'John Doe', farmer_location: 'Greenville', organic: true, category: 'vegetables', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400' },
    { id: 2, name: 'Organic Potatoes', price: 1.20, unit: 'kg', farmer_name: 'Sarah Smith', farmer_location: 'Valley Farm', organic: true, category: 'vegetables', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=400' },
    { id: 3, name: 'Sweet Corn', price: 0.80, unit: 'piece', farmer_name: 'Mike Johnson', farmer_location: 'Sunny Acres', organic: false, category: 'grains', image: 'https://images.unsplash.com/photo-1550828553-3b6d27464010?auto=format&fit=crop&q=80&w=400' },
    { id: 4, name: 'Crisp Lettuce', price: 1.50, unit: 'head', farmer_name: 'John Doe', farmer_location: 'Greenville', organic: true, category: 'vegetables', image: 'https://images.unsplash.com/photo-1622204555811-1dafb67e3a6a?auto=format&fit=crop&q=80&w=400' },
    { id: 5, name: 'Fresh Apples', price: 3.50, unit: 'kg', farmer_name: 'Alice Green', farmer_location: 'Orchard Hills', organic: true, category: 'fruits', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6faa6?auto=format&fit=crop&q=80&w=400' },
    { id: 6, name: 'Organic Carrots', price: 1.80, unit: 'kg', farmer_name: 'Dan Walker', farmer_location: 'Riverbed Farm', organic: true, category: 'vegetables', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400' },
  ]);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get('category') || 'all';
  const searchQuery = queryParams.get('search') || '';
  const [sortBy, setSortBy] = useState('popularity');
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    // Attempt to fetch from backend if running
    setLoading(true);

    // ✅ ONLY CHANGE DONE HERE
    axios.get('https://agrilink-project-proc.onrender.com/api/products')
      .then(res => {
        if(res.data && res.data.length > 0) {
          const uniqueProducts = [];
          const seenNames = new Set();
          res.data.forEach(p => {
            if (!seenNames.has(p.name.toLowerCase())) {
              seenNames.add(p.name.toLowerCase());
              uniqueProducts.push(p);
            }
          });
          setProducts(uniqueProducts);
        }
      })
      .catch(err => console.log("Using mock data, backend not populated yet:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter(p => {
    if (p.price > maxPrice) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;

    if (filter === 'all') return true;
    return p.category === filter || (p.category && p.category.toLowerCase() === filter);
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  return (
    <div style={{ background: 'var(--color-surface)', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="container">
        
        <div style={{ paddingBottom: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
            <h1 style={{ fontSize: '1.8rem', color: 'var(--color-text-main)' }}>{t.marketTitle}</h1>
            <p style={{ color: 'var(--color-text-muted)' }}>{t.marketSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <aside className="md:col-span-1" style={{ borderRight: '1px solid var(--color-border)', paddingRight: '1.5rem' }}>
             <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Price Range</h3>
             <input type="range" min="0" max="1000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--color-primary)' }} />
             <div className="flex justify-between" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.5rem', fontWeight: 'bold' }}>
               <span>₹0</span><span>₹{maxPrice}</span>
             </div>
          </aside>

          <div className="md:col-span-3">
              <div className="flex justify-between items-center mb-4">
                <span style={{ fontWeight: 500 }}>{filteredProducts.length} Items</span>
                <select className="input" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                   <option value="popularity">Sort By: Popularity</option>
                   <option value="price-asc">Price: Low to High</option>
                   <option value="price-desc">Price: High to Low</option>
                </select>
             </div>

             {loading ? (
                <div className="flex justify-center items-center" style={{ padding: '4rem 0', color: 'var(--color-primary)' }}>Loading fresh produce...</div>
             ) : (
                <div className="grid grid-cols-3 gap-6">
                  {sortedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
             )}
          </div>
          
        </div>
      </div>
    </div>
  );
}