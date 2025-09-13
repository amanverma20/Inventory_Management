import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import DashboardCard from './DashboardCard';
import DashboardCharts from './DashboardCharts';

const InteractiveDashboard = ({ data, isDarkMode }) => {
  const [notifications, setNotifications] = useState([]);
  const [kpis, setKpis] = useState({
    totalOrders: data?.totalOrders || 7,
    lowStockItems: data?.lowStockItems || 3,
    totalCustomers: data?.totalCustomers || 125,
    revenue: data?.revenue || 25000,
    growth: 15.5,
    bestSellingProduct: 'Laptop Pro',
    returnRate: 2.3
  });

  const [dateRange, setDateRange] = useState('7days');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random updates
      if (Math.random() > 0.8) {
        setKpis(prev => ({
          ...prev,
          totalOrders: prev.totalOrders + 1,
          revenue: prev.revenue + Math.floor(Math.random() * 1000)
        }));
        
        // Add notification
        const newNotification = {
          id: Date.now(),
          type: 'info',
          message: 'New order received!',
          timestamp: new Date()
        };
        setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (type) => {
    // Handle card clicks - navigate to detailed view
    console.log(`Clicked on ${type} card`);
    // You can implement navigation logic here
  };

  return (
    <div className={`dashboard-container main-content fade-in ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Interactive Dashboard Header */}
      <div className="chart-container mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-600">Interactive Dashboard</h2>
          <div className="flex items-center space-x-4">
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
            </select>
            <button className="btn-primary">
              📊 Export Data
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="dashboard-grid">
        <DashboardCard
          title="Total Orders"
          value={kpis.totalOrders}
          change={12.5}
          icon="🛒"
          color="blue"
          onClick={() => handleCardClick('orders')}
          isDarkMode={isDarkMode}
        />
        
        <DashboardCard
          title="Low Stock Items"
          value={kpis.lowStockItems}
          change={-5.2}
          icon="⚠️"
          color="yellow"
          onClick={() => handleCardClick('lowstock')}
          isDarkMode={isDarkMode}
        />
        
        <DashboardCard
          title="Total Customers"
          value={kpis.totalCustomers}
          change={8.7}
          icon="👥"
          color="green"
          onClick={() => handleCardClick('customers')}
          isDarkMode={isDarkMode}
        />
        
        <DashboardCard
          title="Revenue"
          value={`$${kpis.revenue.toLocaleString()}`}
          change={15.3}
          icon="💰"
          color="purple"
          onClick={() => handleCardClick('revenue')}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Additional KPI Cards */}
      <div className="dashboard-grid">
        <motion.div
          className={`dashboard-card ${isDarkMode ? 'dark' : ''}`}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="card-header">
            <h3 className={`card-title text-blue-600 ${isDarkMode ? 'dark' : ''}`}>Growth Rate</h3>
            <div className="card-icon">📈</div>
          </div>
          <div className="card-value" style={{ color: '#10b981' }}>
            +{kpis.growth}%
          </div>
          <p className={`card-change ${isDarkMode ? 'dark' : ''}`}>vs last month</p>
        </motion.div>

        <motion.div
          className={`dashboard-card ${isDarkMode ? 'dark' : ''}`}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="card-header">
            <h3 className={`card-title text-blue-600 ${isDarkMode ? 'dark' : ''}`}>Best Selling</h3>
            <div className="card-icon">🏆</div>
          </div>
          <div className="card-value" style={{ color: '#3b82f6', fontSize: '20px' }}>
            {kpis.bestSellingProduct}
          </div>
          <p className={`card-change ${isDarkMode ? 'dark' : ''}`}>Product of the month</p>
        </motion.div>

        <motion.div
          className={`dashboard-card ${isDarkMode ? 'dark' : ''}`}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="card-header">
            <h3 className={`card-title text-blue-600 ${isDarkMode ? 'dark' : ''}`}>Return Rate</h3>
            <div className="card-icon">🔄</div>
          </div>
          <div className="card-value" style={{ color: '#ef4444' }}>
            {kpis.returnRate}%
          </div>
          <p className={`card-change ${isDarkMode ? 'dark' : ''}`}>Returns this month</p>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="chart-container">
        <h3 className="text-xl font-bold mb-4 text-blue-600">Analytics Charts</h3>
        <DashboardCharts isDarkMode={isDarkMode} />
      </div>

      {/* Notifications */}
      <AnimatePresence>
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="notification"
            style={{
              position: 'fixed',
              top: `${20 + index * 80}px`,
              right: '20px',
              zIndex: 1000,
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              borderLeft: '4px solid #3b82f6',
              minWidth: '300px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '600', color: '#1f2937' }}>
                {notification.message}
              </span>
              <button
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  color: '#6b7280',
                  fontSize: '18px'
                }}
              >
                ×
              </button>
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
              {notification.timestamp.toLocaleTimeString()}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveDashboard;
