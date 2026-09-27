# Stripe Integration Setup Guide

## 🔧 Getting Started with Stripe

### 1. Create Stripe Account
- Go to https://stripe.com and create an account
- Complete verification process
- Access your dashboard

### 2. Get API Keys
In your Stripe Dashboard:
- Go to Developers > API keys
- Copy your **Publishable key** (starts with `pk_test_` for testing)
- Copy your **Secret key** (starts with `sk_test_` for testing)

### 3. Update Frontend Configuration
In `js/script.js`, replace this line:
```javascript
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51234567890abcdef...'; 
```
With your actual publishable key:
```javascript
const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_ACTUAL_KEY_HERE'; 
```

### 4. Backend Setup (Required for Real Payments)

#### Install Dependencies:
```bash
npm init -y
npm install express stripe cors nodemailer
```

#### Update backend-example.js:
Replace this line:
```javascript
const stripe = require('stripe')('sk_test_...'); 
```
With your secret key:
```javascript
const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY_HERE'); 
```

#### Run Backend:
```bash
node backend-example.js
```

### 5. Environment Variables (Recommended)
Create a `.env` file:
```
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 6. Testing

#### Test Card Numbers:
- **Visa**: 4242424242424242
- **Visa (debit)**: 4000056655665556
- **Mastercard**: 5555555555554444
- **Amex**: 378282246310005
- **Declined**: 4000000000000002

#### Test Details:
- **Expiry**: Any future date (e.g., 12/25)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP**: Any 5 digits (e.g., 12345)

### 7. Webhooks Setup
1. Go to Developers > Webhooks in Stripe Dashboard
2. Add endpoint: `https://your-domain.com/webhook`
3. Select events: `payment_intent.succeeded`
4. Copy webhook secret and add to backend

### 8. Go Live Checklist
- [ ] Replace test keys with live keys
- [ ] Enable live mode in Stripe Dashboard
- [ ] Set up SSL certificate (HTTPS required)
- [ ] Configure production database
- [ ] Set up email service for confirmations
- [ ] Test all payment flows
- [ ] Set up monitoring and logging

### 9. Current Status
✅ **Frontend Ready**: Stripe.js integrated, payment form created
✅ **Demo Mode**: Works without backend (shows demo messages)
⚠️ **Backend Required**: For real payments, deploy the backend code
⚠️ **API Keys**: Replace placeholder keys with your actual Stripe keys

### 10. Security Notes
- Never expose secret keys in frontend code
- Always validate payments on backend
- Use HTTPS in production
- Store sensitive data securely
- Implement proper error handling

---

## 🚀 Quick Start (Demo Mode)
The website currently works in demo mode - it shows the payment flow but doesn't charge real money. To enable real payments, you need to:

1. Replace the Stripe publishable key in `js/script.js`
2. Deploy the backend code with your secret key
3. Update the fetch URLs to point to your backend

## 📞 Support
- Stripe Documentation: https://stripe.com/docs
- Stripe API Reference: https://stripe.com/docs/api
- Test with confidence using Stripe's test mode!