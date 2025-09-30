@echo off
echo === Environment Variables Test ===
echo NODE_ENV: %NODE_ENV%
echo REACT_APP_API_BASE_URL: %REACT_APP_API_BASE_URL%
echo REACT_APP_RZP_KEY_ID: %REACT_APP_RZP_KEY_ID%

echo.
echo === Testing Node Environment Variables ===

echo console.log('NODE_ENV:', process.env.NODE_ENV); > temp-test.js
echo console.log('REACT_APP_API_BASE_URL:', process.env.REACT_APP_API_BASE_URL); >> temp-test.js
echo console.log('REACT_APP_RZP_KEY_ID:', process.env.REACT_APP_RZP_KEY_ID); >> temp-test.js
echo Object.keys(process.env).filter(k =^> k.startsWith('REACT_APP_')).forEach(k =^> console.log(k + ':', process.env[k])); >> temp-test.js

node temp-test.js
del temp-test.js

echo.
echo === Next Steps ===
echo 1. Stop your React server (Ctrl+C)
echo 2. Run: npm start
echo 3. Check browser console for Environment Debug logs
pause