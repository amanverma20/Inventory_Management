import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import '../CustomerPages_css/Dashboard.css';
import homeImage from '../images/homeimage.png';
import { useUser } from '../Login _signup_pages/UserContext';
import AdvancedAnalytics from './AdvancedAnalytics';
import DashboardCharts from './DashboardCharts';
import InteractiveDashboard from './InteractiveDashboard_New';

const MainDashboard = () => {
  const { userData } = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sample data for the dashboard
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 7,
    lowStockItems: 0,
    totalCustomers: 5,
    revenue: 25000,
    pendingOrders: 0,
    totalProducts: 6
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setDashboardData(prev => ({
          ...prev,
          totalOrders: prev.totalOrders + Math.floor(Math.random() * 2),
          revenue: prev.revenue + Math.floor(Math.random() * 500)
        }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'interactive', label: 'Interactive', icon: '🎛️' },
    { id: 'charts', label: 'Charts', icon: '📉' }
  ];

  const handleCardClick = (type) => {
    console.log(`Navigating to ${type} details`);
    // Add navigation logic here
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">INVENTORY MANAGEMENT SYSTEM</h1>
      </header>

      <main className="dashboard-welcome">
        <div className="welcome-text">
          <h1>
            <span>Welcome {userData?.name || 'aman'}</span> to your <b>Inventory Management Dashboard!</b>
          </h1>
        </div>
        <div className="welcome-image">
          <img src={homeImage} alt="Dashboard illustration" />
        </div>
      </main>

      {/* Navigation Tabs */}
      <div className="flex justify-center space-x-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <section className="dashboard-cards">
            <div className="dashboard-card">
              <i className="fas fa-shopping-cart card-icon"></i>
              <h3 className="card-title">Total Orders</h3>
              <p className="card-number">{dashboardData.totalOrders}</p>
            </div>

            <div className="dashboard-card">
              <i className="fas fa-boxes card-icon"></i>
              <h3 className="card-title">Total Products</h3>
              <p className="card-number">{dashboardData.totalProducts}</p>
            </div>

            <div className="dashboard-card">
              <i className="fas fa-users card-icon"></i>
              <h3 className="card-title">Total Customers</h3>
              <p className="card-number">{dashboardData.totalCustomers}</p>
            </div>

            <div className="dashboard-card">
              <i className="fas fa-exclamation-triangle card-icon"></i>
              <h3 className="card-title">Low Stock</h3>
              <p className="card-number">{dashboardData.lowStockItems}</p>
            </div>

            <div className="dashboard-card">
              <i className="fas fa-clock card-icon"></i>
              <h3 className="card-title">Recent Orders</h3>
              <p className="card-number">{dashboardData.pendingOrders}</p>
            </div>
          </section>
        )}

        {activeTab === 'analytics' && <AdvancedAnalytics />}
        {activeTab === 'interactive' && <InteractiveDashboard data={dashboardData} isDarkMode={isDarkMode} />}
        {activeTab === 'charts' && <DashboardCharts />}
      </motion.div>
    </div>
  );
};

export default MainDashboard;
