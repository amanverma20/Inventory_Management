import { useNavigate } from 'react-router-dom';
import '../CustomerPages_css/CategorySection.css';
import { useUser } from '../Login _signup_pages/UserContext';

const CategorySection = ({ isVisible }) => {
  const { userData } = useUser();
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: 'Electronics',
      icon: '📱',
      description: 'Latest gadgets and electronics',
      color: '#4f46e5'
    },
    {
      id: 2,
      name: 'Clothing',
      icon: '👕',
      description: 'Fashion and apparel',
      color: '#ef4444'
    },
    {
      id: 3,
      name: 'Home & Garden',
      icon: '🏠',
      description: 'Home improvement and garden',
      color: '#10b981'
    },
    {
      id: 4,
      name: 'Sports',
      icon: '⚽',
      description: 'Sports equipment and gear',
      color: '#f59e0b'
    },
    {
      id: 5,
      name: 'Books',
      icon: '📚',
      description: 'Books and educational materials',
      color: '#8b5cf6'
    },
    {
      id: 6,
      name: 'Food & Beverages',
      icon: '🍕',
      description: 'Groceries and beverages',
      color: '#06b6d4'
    }
  ];

  const handleCategoryClick = (category) => {
    navigate(`/customer/${userData.id}/product`, {
      state: { category: category.name }
    });
  };

  return (
    <section className={`category-section ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Explore our wide range of product categories</p>
        </div>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => handleCategoryClick(category)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                className="category-icon"
                style={{ backgroundColor: category.color }}
              >
                <span>{category.icon}</span>
              </div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <div className="category-arrow">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
