// Test script to verify image URL resolution
import { getApiBase } from './src/utils/apiBase.js';
import { resolveAssetUrl } from './src/utils/assetUrl.js';

console.log('=== Image URL Resolution Test ===');

// Test the API base first
const apiBase = getApiBase();
console.log('API Base URL:', apiBase);

// Test image URLs that are failing
// Test asset URL resolution
console.log('🔍 Testing resolveAssetUrl function...\n');

const testUrls = [
  'uploads/1742228421667-shopping.webp',
  '/uploads/1742228421667-shopping.webp',
  `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000'}/uploads/1742228421667-shopping.webp`
];

console.log('\n=== Image URL Transformations ===');
testImageUrls.forEach(url => {
  const resolved = resolveAssetUrl(url);
  console.log(`Input:  "${url}"`);
  console.log(`Output: "${resolved}"`);
  console.log('---');
});

console.log('\n=== Expected Results ===');
console.log('✅ All URLs should start with:', apiBase);
console.log('❌ No URLs should contain hardcoded localhost ports');

export { }; // Make this a module

