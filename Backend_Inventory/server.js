require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./database/db');
const userRoutes = require('./routers/userRoutes');
const productRoutes = require('./routers/productRoutes'); // Import product routes
const orderRoutes = require('./routers/orderRoutes');
const paymentRoutes = require('./routers/paymentRoutes');
const countRoutes = require('./routers/countRoutes');



const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;
const allowedOrigin = process.env.CORS_ORIGIN || '*';

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
if (allowedOrigin === '*') {
  app.use(cors());
} else {
  app.use(cors({ origin: allowedOrigin }));
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads')); // Serve images from the uploads folder

// Connect to MongoDB
connectDB();

// Health check endpoints (place before other routes to avoid conflicts)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    port: port
  });
});

// Sample API route for frontend
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Use Routers
app.use('/user', userRoutes);
app.use('/admin', productRoutes); // Add product routes for admin portal
app.use('/', productRoutes);
app.use('/api', orderRoutes);
app.use('/api/payment', paymentRoutes); // rzp routes
app.use('/', countRoutes);

// Health check for payment configuration
app.get('/api/payment/health', (req, res) => {
  const hasKeyId = !!process.env.RZP_KEY_ID;
  const hasKeySecret = !!(process.env.RZP_KEY_SECRET || process.env.RZR_KEY_SECRET);
  res.json({
    ok: hasKeyId && hasKeySecret,
    rzpKeyId: hasKeyId ? 'present' : 'missing',
    rzpKeySecret: hasKeySecret ? 'present' : 'missing'
  });
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(port, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
  console.log(`🚀 Server running on port ${port}`);
  console.log(`🌐 API Base URL: http://localhost:${port}`);
  console.log(`📊 Health check: http://localhost:${port}/api/health`);
});
