import { useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from 'recharts';

// Sample data
const monthlyOrdersData = [
  { month: 'Jan', orders: 45, revenue: 12000 },
  { month: 'Feb', orders: 52, revenue: 15000 },
  { month: 'Mar', orders: 38, revenue: 11000 },
  { month: 'Apr', orders: 61, revenue: 18000 },
  { month: 'May', orders: 55, revenue: 16000 },
  { month: 'Jun', orders: 67, revenue: 22000 },
];

const categoryData = [
  { name: 'Electronics', value: 35, color: '#8884d8' },
  { name: 'Clothing', value: 25, color: '#82ca9d' },
  { name: 'Books', value: 20, color: '#ffc658' },
  { name: 'Home & Garden', value: 15, color: '#ff7300' },
  { name: 'Sports', value: 5, color: '#00ff00' },
];

const DashboardCharts = () => {
  const [activeChart, setActiveChart] = useState('orders');

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-semibold">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      
      {/* Orders & Revenue Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Monthly Performance</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveChart('orders')}
              className={`px-3 py-1 rounded-md text-sm ${
                activeChart === 'orders' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveChart('revenue')}
              className={`px-3 py-1 rounded-md text-sm ${
                activeChart === 'revenue' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Revenue
            </button>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          {activeChart === 'orders' ? (
            <BarChart data={monthlyOrdersData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="orders" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={monthlyOrdersData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Category Distribution */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Categories</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
