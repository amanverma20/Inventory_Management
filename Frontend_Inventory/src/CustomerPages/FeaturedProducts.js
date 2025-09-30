import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CustomerPages_css/FeaturedProducts.css';
import { useUser } from '../Login _signup_pages/UserContext';
import { getApiBase } from '../utils/apiBase';

const FeaturedProducts = ({ isVisible }) => {
  const { userData } = useUser();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch(`${getApiBase()}/newproduct`);
        if (response.ok) {
          const allProducts = await response.json();
          // Get first 6 products as featured
          const featuredProducts = allProducts.slice(0, 6);
          setProducts(featuredProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/customer/${userData.id}/singleproduct/${productId}`);
  };

  const handleViewAll = () => {
    navigate(`/customer/${userData.id}/product`);
  };

  if (loading) {
    return (
      <section className="featured-products">
        <div className="container">
          <div className="loading">Loading featured products...</div>
        </div>
      </section>
    );
  }

  return (
    <section className={`featured-products ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Discover our handpicked selection of amazing products</p>
        </div>
        <div className="products-grid">
          {products.map((product, index) => (
            <div
              key={product._id}
              className="product-card"
              onClick={() => handleProductClick(product._id)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="product-image">
                <img 
                  src={product.imageUrls?.[0] || '/placeholder-image.jpg'} 
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
                <div className="product-overlay">
                  <button className="quick-view-btn">Quick View</button>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <div className="product-price">
                  <span className="current-price">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="original-price">₹{product.originalPrice}</span>
                  )}
                </div>
                <div className="product-rating">
                  <span className="stars">★★★★☆</span>
                  <span className="rating-count">(4.2)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all-container">
          <button className="view-all-btn" onClick={handleViewAll}>
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
