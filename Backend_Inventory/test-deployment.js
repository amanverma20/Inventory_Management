// Quick deployment test script using Node.js built-in fetch
const BASE_URL = 'https://inventory-management-1-y5ch.onrender.com'; // Your Render deployment URL

const endpoints = [
  '/api/health',
  '/products/count',
  '/orders/count',
  '/users/count',
  '/products/low-stock',
  '/orders/recent-count',
  '/api/payment/health'
];

async function testDeployment() {
  console.log('🔍 Testing Backend Deployment...\n');
  console.log(`📍 Base URL: ${BASE_URL}\n`);

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      const data = await response.json();
      
      if (response.ok) {
        console.log(`✅ ${endpoint} - Status: ${response.status}`);
        console.log(`   Response: ${JSON.stringify(data)}\n`);
      } else {
        console.log(`❌ ${endpoint} - Status: ${response.status}`);
        console.log(`   Error: ${JSON.stringify(data)}\n`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint} - Network Error: ${error.message}\n`);
    }
  }
}

testDeployment();