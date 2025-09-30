import { createContext, useEffect, useMemo, useState } from 'react';
import { getApiBase } from '../utils/apiBase';

export const CountsContext = createContext();

export const CountsProvider = ({ children }) => {
  const [counts, setCounts] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    lowStock: 0, // Add low stock count here
    recentOrders: 0, // Add recent orders count here
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetching the counts for products, orders, customers, low stock, and recent orders
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetching counts from backend endpoints
        const productsRes = await fetch(`${getApiBase()}/products/count`);
        const ordersRes = await fetch(`${getApiBase()}/orders/count`);
        const customersRes = await fetch(`${getApiBase()}/users/count`);
        const lowStockRes = await fetch(`${getApiBase()}/products/low-stock`); // Endpoint for low stock
        const recentOrdersRes = await fetch(`${getApiBase()}/orders/recent-count`); // Endpoint for recent orders

        // Check if all the responses are OK
        if (!productsRes.ok) {
          throw new Error(`Failed to fetch products count: ${productsRes.status}`);
        }
        if (!ordersRes.ok) {
          throw new Error(`Failed to fetch orders count: ${ordersRes.status}`);
        }
        if (!customersRes.ok) {
          throw new Error(`Failed to fetch customers count: ${customersRes.status}`);
        }
        if (!lowStockRes.ok) {
          throw new Error(`Failed to fetch low stock count: ${lowStockRes.status}`);
        }
        if (!recentOrdersRes.ok) {
          throw new Error(`Failed to fetch recent orders count: ${recentOrdersRes.status}`);
        }

        // Parsing the JSON response from each endpoint
        const productsData = await productsRes.json();
        const ordersData = await ordersRes.json();
        const customersData = await customersRes.json();
        const lowStockData = await lowStockRes.json(); // Get low stock count
        const recentOrdersData = await recentOrdersRes.json(); // Get recent orders count

        // Setting the fetched counts into state
        setCounts({
          totalProducts: productsData.count,
          totalOrders: ordersData.count,
          totalCustomers: customersData.count,
          lowStock: lowStockData.count, // Set low stock count
          recentOrders: recentOrdersData.count, // Set recent orders count
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []); // Empty dependency array means this effect runs only once after initial render

  const contextValue = useMemo(() => ({
    counts,
    loading,
    error
  }), [counts, loading, error]);

  return (
    <CountsContext.Provider value={contextValue}>
      {children}
    </CountsContext.Provider>
  );
};
