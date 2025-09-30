## Smart Inventory - Deployment Guide

### 1) Environment Variables

Create two .env files. Never commit them.

Backend: `Inventory_Management/Backend_Inventory/.env`

```
PORT=4000
MONGO_URI=your_mongodb_atlas_uri
RZP_KEY_ID=rzp_test_or_live_key
RZP_KEY_SECRET=matching_secret
# Optional legacy fallback
RZR_KEY_SECRET=matching_secret
# Optional CORS restriction (set to your frontend domain in prod)
CORS_ORIGIN=https://your-frontend-domain
```

Frontend: `Inventory_Management/Frontend_Inventory/.env`

```
# Razorpay public key for the browser
REACT_APP_RZP_KEY_ID=rzp_test_or_live_key

# In production set your backend URL, e.g.
# REACT_APP_API_BASE_URL=https://your-backend-domain

# In local development, leave this unset and rely on CRA proxy
```

### 2) Local Development

Backend

```
cd Inventory_Management/Backend_Inventory
npm install
npm run dev
# Server on http://localhost:4000
# Health: http://localhost:4000/api/payment/health
```

Frontend

```
cd Inventory_Management/Frontend_Inventory
npm install
npm start
# App on http://localhost:3000
```

### 3) Production Build

Frontend build

```
cd Inventory_Management/Frontend_Inventory
npm run build
# Output: Inventory_Management/Frontend_Inventory/build
```

### 4) Deployment Steps

Backend (Render)

1. Push code to GitHub
2. Create a Render Web Service
   - Root Directory: `Inventory_Management/Backend_Inventory`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: set PORT, MONGO_URI, RZP_KEY_ID, RZP_KEY_SECRET (and optional CORS_ORIGIN)
3. After deploy, verify `https://your-backend/api/payment/health` returns ok: true

Frontend (Vercel or Netlify)

Vercel
 - Import GitHub repo
 - Root Directory: `Inventory_Management/Frontend_Inventory`
 - Build Command: `npm run build`
 - Output Directory: `build`
 - Environment: `REACT_APP_RZP_KEY_ID`, `REACT_APP_API_BASE_URL=https://your-backend`

Netlify
 - New site from Git
 - Base directory: `Inventory_Management/Frontend_Inventory`
 - Build command: `npm run build`
 - Publish directory: `build`
 - Environment: same as above

### 5) Post-Deploy Checklist

- Frontend loads at your domain
- Payment health endpoint ok
- Login works (saved credentials on prod origin)
- Product flows work
- Payment completes; order saved (MongoDB Atlas)

### 6) Troubleshooting

- Payment “Authentication failed”: check backend env keys match Razorpay mode and health endpoint reports keys present
- 500 on `/api/order`: backend logs will show validation errors; ensure Order payload includes required fields per `Backend_Inventory/models/OrderSchema.js`
- CORS issues: set `CORS_ORIGIN` to your exact frontend URL


