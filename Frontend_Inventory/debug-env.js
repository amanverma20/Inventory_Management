// Debug script to check environment variables
console.log('=== Environment Variables Debug ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('REACT_APP_API_BASE_URL:', process.env.REACT_APP_API_BASE_URL);
console.log('All REACT_APP_ variables:');
Object.keys(process.env).filter(key => key.startsWith('REACT_APP_')).forEach(key => {
  console.log(`  ${key}:`, process.env[key]);
});

// Test getApiBase function
import { getApiBase } from './src/utils/apiBase.js';
console.log('=== getApiBase() Result ===');
console.log('API Base URL:', getApiBase());
console.log('Expected: https://inventory-management-1-y5ch.onrender.com');