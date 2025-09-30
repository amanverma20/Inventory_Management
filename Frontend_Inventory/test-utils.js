// Test the API base function
import { getApiBase } from './src/utils/apiBase.js';

console.log('=== Testing getApiBase() ===');
console.log('Result:', getApiBase());

// Test environment variables
console.log('\n=== Environment Variables ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('REACT_APP_API_BASE_URL:', process.env.REACT_APP_API_BASE_URL);

// Test resolveAssetUrl
import { resolveAssetUrl } from './src/utils/assetUrl.js';

const testUrls = [
  '1742228421667-shopping.webp',
  '/uploads/1742228421667-shopping.webp',
  'uploads/1742228421667-shopping.webp',
  `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000'}/1742228421667-shopping.webp`
];

console.log('\n=== Testing resolveAssetUrl() ===');
testUrls.forEach(url => {
  console.log(`Input: "${url}" -> Output: "${resolveAssetUrl(url)}"`);
});