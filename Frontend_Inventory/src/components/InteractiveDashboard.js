import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import DashboardCard from './DashboardCard';
import DashboardCharts from './DashboardCharts';

const InteractiveDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [kpis, setKpis] = useState({
    totalOrders: 7,
    lowStockItems: 3,
    totalCustomers: 125,
    revenue: 25000,
    growth: 15.5,
    bestSellingProduct: 'Laptop Pro',
    returnRate: 2.3
  });

  const [dateRange, setDateRange] = useState('7days');
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800">Inventory Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            {/* Date Range Selector */}
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="3months">Last 3 Months</option>
              <option value="1year">Last Year</option>
            </select>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
            
            {/* Notifications */}
            <div className="relative">
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                🔔
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Orders"
            value={kpis.totalOrders}
            icon="🛒"
            bgColor="bg-gradient-to-r from-blue-500 to-blue-600"
            textColor="text-white"
            onClick={() => handleCardClick('orders')}
          />
          
          <DashboardCard
            title="Low Stock Items"
            value={kpis.lowStockItems}
            icon="⚠️"
            bgColor="bg-gradient-to-r from-yellow-500 to-orange-500"
            textColor="text-white"
            onClick={() => handleCardClick('lowstock')}
          />
          
          <DashboardCard
            title="Total Customers"
            value={kpis.totalCustomers}
            icon="👥"
            bgColor="bg-gradient-to-r from-green-500 to-green-600"
            textColor="text-white"
            onClick={() => handleCardClick('customers')}
          />
          
          <DashboardCard
            title="Revenue"
            value={`$${kpis.revenue.toLocaleString()}`}
            icon="💰"
            bgColor="bg-gradient-to-r from-purple-500 to-purple-600"
            textColor="text-white"
            onClick={() => handleCardClick('revenue')}
          />
        </div>

        {/* Additional KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Growth Rate</h3>
            <div className="text-3xl font-bold text-green-600">
              +{kpis.growth}%
            </div>
            <p className="text-sm text-gray-600 mt-1">vs last month</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Best Selling</h3>
            <div className="text-xl font-bold text-blue-600">
              {kpis.bestSellingProduct}
            </div>
            <p className="text-sm text-gray-600 mt-1">Product of the month</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Return Rate</h3>
            <div className="text-3xl font-bold text-red-600">
              {kpis.returnRate}%
            </div>
            <p className="text-sm text-gray-600 mt-1">Quality indicator</p>
          </motion.div>
        </div>

        {/* Charts */}
        <DashboardCharts />
        
        {/* Notifications Panel */}
        <AnimatePresence>
          {notifications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm"
            >
              <h4 className="font-semibold text-gray-800 mb-2">Recent Activity</h4>
              {notifications.slice(0, 3).map(notification => (
                <div key={notification.id} className="mb-2 p-2 bg-gray-50 rounded text-sm">
                  {notification.message}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveDashboard;
