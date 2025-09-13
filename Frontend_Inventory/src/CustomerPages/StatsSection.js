import { useContext, useEffect, useState } from 'react';
import { CountsContext } from '../ContextApi/CountsContext';
import '../CustomerPages_css/StatsSection.css';

const StatsSection = ({ isVisible }) => {
  const { counts } = useContext(CountsContext);
  const [animatedCounts, setAnimatedCounts] = useState({
    products: 0,
    orders: 0,
    customers: 0,
    revenue: 0
  });

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 frames
      const stepDuration = duration / steps;

      const animate = (target, current, setter) => {
        const increment = target / steps;
        let currentValue = 0;
        
        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= target) {
            setter(target);
            clearInterval(timer);
          } else {
            setter(Math.floor(currentValue));
          }
        }, stepDuration);
      };

      animate(counts.totalProducts || 150, 0, (value) => 
        setAnimatedCounts(prev => ({ ...prev, products: value }))
      );
      animate(counts.totalOrders || 89, 0, (value) => 
        setAnimatedCounts(prev => ({ ...prev, orders: value }))
      );
      animate(counts.totalCustomers || 1200, 0, (value) => 
        setAnimatedCounts(prev => ({ ...prev, customers: value }))
      );
      animate(250000, 0, (value) => 
        setAnimatedCounts(prev => ({ ...prev, revenue: value }))
      );
    }
  }, [isVisible, counts]);

  const stats = [
    {
      id: 1,
      title: 'Products',
      value: animatedCounts.products,
      suffix: '+',
      icon: '📦',
      color: '#4f46e5'
    },
    {
      id: 2,
      title: 'Orders',
      value: animatedCounts.orders,
      suffix: '+',
      icon: '🛒',
      color: '#10b981'
    },
    {
      id: 3,
      title: 'Happy Customers',
      value: animatedCounts.customers,
      suffix: '+',
      icon: '👥',
      color: '#f59e0b'
    },
    {
      id: 4,
      title: 'Revenue',
      value: animatedCounts.revenue,
      prefix: '₹',
      suffix: '+',
      icon: '💰',
      color: '#ef4444'
    }
  ];

  return (
    <section className={`stats-section ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <div className="section-header">
          <h2>Our Achievement</h2>
          <p>Numbers that speak for our success</p>
        </div>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="stat-card"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div 
                className="stat-icon"
                style={{ backgroundColor: stat.color }}
              >
                <span>{stat.icon}</span>
              </div>
              <div className="stat-content">
                <h3>
                  {stat.prefix}
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </h3>
                <p>{stat.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
