const crypto = require('crypto');
const Razorpay = require('razorpay');

function getRazorpayInstance() {
  const resolvedKeyId = process.env.RZP_KEY_ID;
  const resolvedKeySecret = process.env.RZP_KEY_SECRET || process.env.RZR_KEY_SECRET;
  return {
    instance: new Razorpay({ key_id: resolvedKeyId, key_secret: resolvedKeySecret }),
    resolvedKeyId,
    resolvedKeySecret,
  };
}

// Create an order
exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;

    // Validate Razorpay configuration
    const { instance, resolvedKeyId, resolvedKeySecret } = getRazorpayInstance();
    if (!resolvedKeyId || !resolvedKeySecret) {
      return res.status(500).json({
        success: false,
        error: 'Payment is not configured. Missing Razorpay keys on server.'
      });
    }

    // Validate amount (expecting rupees as number >= 1)
    const amountNumber = Number(amount);
    if (!Number.isFinite(amountNumber) || amountNumber < 1) {
      return res.status(400).json({
        success: false,
        error: 'Invalid amount. Minimum amount is ₹1.'
      });
    }

    const options = {
      amount: Math.round(amountNumber * 100), // Amount in paisa
      currency,
      receipt,
    };
    console.log('[RZP createOrder] options:', options);
    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    const description = error?.error?.description || error?.message || 'Unknown error creating order';
    console.error('[RZP createOrder] error:', description, 'raw:', error);
    res.status(500).json({ success: false, error: description });
  }
};

// Verify the payment
exports.verifyPayment = (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', (process.env.RZP_KEY_SECRET || process.env.RZR_KEY_SECRET))
      .update(body)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      res.status(200).json({ success: true, message: 'Payment verified successfully!' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
