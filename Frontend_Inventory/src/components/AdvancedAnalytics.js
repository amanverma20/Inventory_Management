import { useState } from 'react';
import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis, YAxis
} from 'recharts';

const AdvancedAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('sales');
  const [timeframe, setTimeframe] = useState('monthly');

  // Sample advanced analytics data
  const salesPerformanceData = [
    { period: 'Jan', sales: 12000, profit: 3000, customers: 45, conversion: 3.2 },
    { period: 'Feb', sales: 15000, profit: 4500, customers: 52, conversion: 3.8 },
    { period: 'Mar', sales: 11000, profit: 2800, customers: 38, conversion: 2.9 },
    { period: 'Apr', sales: 18000, profit: 5400, customers: 61, conversion: 4.1 },
    { period: 'May', sales: 16000, profit: 4200, customers: 55, conversion: 3.7 },
    { period: 'Jun', sales: 22000, profit: 6600, customers: 67, conversion: 4.5 },
  ];

  const productPerformanceData = [
    { name: 'Laptop Pro', sales: 15000, profit: 4500, units: 25, rating: 4.8 },
    { name: 'Smartphone X', sales: 12000, profit: 3000, units: 40, rating: 4.6 },
    { name: 'Tablet Air', sales: 8000, profit: 2400, units: 20, rating: 4.4 },
    { name: 'Headphones', sales: 6000, profit: 1800, units: 60, rating: 4.7 },
    { name: 'Smart Watch', sales: 10000, profit: 2500, units: 35, rating: 4.5 },
  ];

  const [heatmapData, setHeatmapData] = useState([
    { hour: '00', Monday: 2, Tuesday: 1, Wednesday: 3, Thursday: 2, Friday: 4, Saturday: 8, Sunday: 6 },
    { hour: '06', Monday: 5, Tuesday: 4, Wednesday: 6, Thursday: 5, Friday: 8, Saturday: 12, Sunday: 10 },
    { hour: '12', Monday: 15, Tuesday: 14, Wednesday: 18, Thursday: 16, Friday: 20, Saturday: 25, Sunday: 22 },
    { hour: '18', Monday: 12, Tuesday: 11, Wednesday: 14, Thursday: 13, Friday: 16, Saturday: 18, Sunday: 15 },
  ]);

  // Custom tooltip for advanced charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg border-gray-200">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      
      {/* Controls */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Advanced Analytics</h2>
          <div className="flex space-x-4">
            <select 
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="sales">Sales Analysis</option>
              <option value="profit">Profit Margins</option>
              <option value="customers">Customer Metrics</option>
              <option value="conversion">Conversion Rates</option>
            </select>
            
            <select 
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
      </div>

      {/* Combined Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales & Profit Trend</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={salesPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="period" />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar yAxisId="left" dataKey="sales" fill="#3b82f6" name="Sales ($)" />
            <Bar yAxisId="left" dataKey="profit" fill="#10b981" name="Profit ($)" />
            <Line yAxisId="right" type="monotone" dataKey="conversion" stroke="#f59e0b" strokeWidth={3} name="Conversion Rate (%)" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Product Performance Scatter Plot */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Performance Matrix</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart data={productPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="sales" name="Sales" />
            <YAxis dataKey="profit" name="Profit" />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              content={<CustomTooltip />}
            />
            <Scatter 
              name="Products" 
              dataKey="profit" 
              fill="#8884d8" 
              r={8}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100">Avg Order Value</p>
              <p className="text-2xl font-bold">$127.50</p>
            </div>
            <div className="text-3xl">📊</div>
          </div>
          <div className="mt-2 text-sm text-blue-100">
            +12% from last month
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-100">Customer Lifetime Value</p>
              <p className="text-2xl font-bold">$1,250</p>
            </div>
            <div className="text-3xl">👥</div>
          </div>
          <div className="mt-2 text-sm text-green-100">
            +8% from last month
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-purple-100">Inventory Turnover</p>
              <p className="text-2xl font-bold">5.2x</p>
            </div>
            <div className="text-3xl">🔄</div>
          </div>
          <div className="mt-2 text-sm text-purple-100">
            +15% from last month
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-xl text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-red-100">Churn Rate</p>
              <p className="text-2xl font-bold">2.3%</p>
            </div>
            <div className="text-3xl">⚠️</div>
          </div>
          <div className="mt-2 text-sm text-red-100">
            -5% from last month
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Export Reports</h3>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            📊 Export to Excel
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            📄 Export to PDF
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            📈 Schedule Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
