import '../CustomerPages_css/FeaturesSection.css';

const FeaturesSection = ({ isVisible }) => {
  const features = [
    {
      id: 1,
      icon: '📱',
      title: 'Smart Inventory',
      description: 'Advanced inventory management with real-time tracking and automated alerts.',
      color: '#4f46e5'
    },
    {
      id: 2,
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery service with real-time order tracking.',
      color: '#10b981'
    },
    {
      id: 3,
      icon: '🔒',
      title: 'Secure Payments',
      description: 'Bank-grade security with multiple payment options for your convenience.',
      color: '#f59e0b'
    },
    {
      id: 4,
      icon: '🎯',
      title: 'Quality Products',
      description: 'Curated selection of high-quality products from trusted suppliers.',
      color: '#ef4444'
    },
    {
      id: 5,
      icon: '📊',
      title: 'Analytics',
      description: 'Comprehensive analytics and reporting for better business decisions.',
      color: '#8b5cf6'
    },
    {
      id: 6,
      icon: '🌟',
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you whenever you need.',
      color: '#06b6d4'
    }
  ];

  return (
    <section className={`features-section ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <div className="section-header">
          <h2>Why Choose InventoryPro?</h2>
          <p>Discover the features that make us the preferred choice for inventory management</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="feature-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                className="feature-icon"
                style={{ backgroundColor: feature.color }}
              >
                <span>{feature.icon}</span>
              </div>
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
              <div className="feature-hover-effect"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;