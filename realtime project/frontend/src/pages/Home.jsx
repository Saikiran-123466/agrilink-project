import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, ShieldCheck, Sun } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';

export default function Home() {
  const { t } = useLanguage();
  const categories = [
    { name: 'Vegetables', img: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=200' },
    { name: 'Fruits', img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=200' },
    { name: 'Dairy & Eggs', img: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=200' },
    { name: 'Bakery', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=200' },
    { name: 'Foodgrains', img: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?auto=format&fit=crop&q=80&w=200' },
    { name: 'Meat', img: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=200' }
  ];

  const [bestSellers, setBestSellers] = useState([
    { id: 1, name: 'Fresh Tomatoes', price: 2.50, unit: 'kg', farmer_name: 'John Doe', organic: true },
    { id: 2, name: 'Organic Potatoes', price: 1.20, unit: 'kg', farmer_name: 'Sarah Smith', organic: true },
    { id: 3, name: 'Crisp Lettuce', price: 1.50, unit: 'head', farmer_name: 'John', organic: false },
    { id: 4, name: 'Sweet Corn', price: 0.80, unit: 'piece', farmer_name: 'Mike', organic: false },
    { id: 5, name: 'Fresh Apples', price: 3.50, unit: 'kg', farmer_name: 'Alice', organic: true },
    { id: 6, name: 'Organic Carrots', price: 1.80, unit: 'kg', farmer_name: 'Dan', organic: true }
  ]);

  useEffect(() => {
    // Fetch products from backend to display real farmer products and their images in Best Sellers
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        if(res.data && res.data.length > 0) {
          // Remove duplicate products by name to prevent cloned listings
          const uniqueProducts = [];
          const seenNames = new Set();
          res.data.forEach(p => {
            if (!seenNames.has(p.name.toLowerCase())) {
              seenNames.add(p.name.toLowerCase());
              uniqueProducts.push(p);
            }
          });
          setBestSellers(uniqueProducts.slice(0, 6));
        }
      })
      .catch(err => console.log("Using mock data, backend not populated yet:", err));
  }, []);

  return (
    <div style={{ background: 'var(--color-background)', minHeight: '100vh', paddingBottom: '2rem' }}>
      
      {/* Banner Section */}
      <section className="container mt-4 mb-8 animate-fade-in" style={{ marginTop: '2rem' }}>
        <div className="hover-glow" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '400px', position: 'relative', boxShadow: 'var(--shadow-lg)' }}>
           <img 
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2000" 
              alt="Grocery Promo Banner" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
           />
           <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, rgba(0,0,0,0.7), transparent)', display: 'flex', alignItems: 'center', padding: '0 4rem' }}>
             <div className="glass" style={{ padding: '3rem', borderRadius: 'var(--radius-md)', maxWidth: '500px', border: '1px solid rgba(255,255,255,0.2)' }}>
                <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: 1.1, color: '#fff' }}>{t.homeBannerTitle}</h1>
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#eee' }}>{t.homeBannerSub}</p>
                <Link to="/marketplace" className="btn btn-primary hover-glow" style={{ padding: '1rem 2.5rem', borderRadius: 'var(--radius-full)' }}>{t.homeBannerBtn}</Link>
             </div>
           </div>
        </div>
      </section>



      {/* Best Sellers Sections */}
      <section className="container mb-12 animate-fade-in animate-delay-2">
         <div className="flex justify-between items-end mb-6" style={{ borderBottom: '2px solid var(--color-border)', paddingBottom: '0.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>{t.homeBestSellers}</h2>
            <Link to="/marketplace" className="hover-glow" style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{t.homeViewAll} <ArrowRight size={18} /></Link>
         </div>
         <div className="grid grid-cols-3 gap-6">
            {bestSellers.map(product => (
               <div key={product.id} className="hover-glow">
                 <ProductCard product={product} />
               </div>
            ))}
         </div>
      </section>

      {/* Promotional / Info Cards */}
      <section className="container mb-12 animate-fade-in animate-delay-3">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="card glass hover-glow" style={{ padding: '2.5rem', textAlign: 'center', background: 'rgba(232, 245, 233, 0.4)' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(132,194,37,0.2)' }}>
                 <Brain size={36} color="var(--color-primary-dark)" />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', fontWeight: 700 }}>{t.homeAIPricing}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.5 }}>{t.homeAIPricingSub}</p>
           </div>
           
           <div className="card glass hover-glow" style={{ padding: '2.5rem', textAlign: 'center', background: 'rgba(255, 243, 224, 0.4)' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(245,124,0,0.2)' }}>
                 <ShieldCheck size={36} color="#f57c00" />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', fontWeight: 700 }}>{t.homeVerified}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.5 }}>{t.homeVerifiedSub}</p>
           </div>

           <div className="card glass hover-glow" style={{ padding: '2.5rem', textAlign: 'center', background: 'rgba(227, 242, 253, 0.4)' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(2,136,209,0.2)' }}>
                 <Sun size={36} color="#0288d1" />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', fontWeight: 700 }}>{t.homeOrganic}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.5 }}>{t.homeOrganicSub}</p>
           </div>
         </div>
      </section>

    </div>
  );
}
