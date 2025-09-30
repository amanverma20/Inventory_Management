#!/bin/bash
# Test script to verify environment variables are loaded correctly

echo "=== Environment Variables Test ==="
echo "NODE_ENV: $NODE_ENV"
echo "REACT_APP_API_BASE_URL: $REACT_APP_API_BASE_URL"
echo "REACT_APP_RZP_KEY_ID: $REACT_APP_RZP_KEY_ID"

echo ""
echo "=== Testing API Base Function ==="

# Create a temporary test file
cat > temp-test.js << 'EOF'
// Test the environment variable loading
console.log('=== Environment Variables ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('REACT_APP_API_BASE_URL:', process.env.REACT_APP_API_BASE_URL);
console.log('REACT_APP_RZP_KEY_ID:', process.env.REACT_APP_RZP_KEY_ID);

console.log('\n=== Available REACT_APP Variables ===');
Object.keys(process.env)
  .filter(key => key.startsWith('REACT_APP_'))
  .forEach(key => {
    console.log(`${key}: ${process.env[key]}`);
  });
EOF

node temp-test.js
rm temp-test.js

echo ""
echo "=== Next Steps ==="
echo "1. Stop your React server (Ctrl+C)"
echo "2. Run: npm start"
echo "3. Check browser console for '🔍 Environment Debug:' logs"