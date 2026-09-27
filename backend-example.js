// Backend Example for Stripe Payment Processing
// This is a Node.js/Express example - save this as a separate backend file

const express = require('express');
const stripe = require('stripe')('sk_test_...'); // Replace with your Stripe secret key
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Create Payment Intent endpoint
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency, service, customer_email, customer_name } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: currency || 'usd',
      metadata: {
        service: service,
        customer_email: customer_email,
        customer_name: customer_name
      },
      receipt_email: customer_email
    });

    res.send({
      client_secret: paymentIntent.client_secret
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(400).send({
      error: {
        message: error.message
      }
    });
  }
});

// Confirm Payment endpoint
app.post('/confirm-payment', async (req, res) => {
  try {
    const { payment_intent_id, service, amount, customer_email, customer_name } = req.body;
    
    // Retrieve the payment intent to verify it was successful
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);
    
    if (paymentIntent.status === 'succeeded') {
      // Payment was successful - save to database, send emails, etc.
      console.log('Payment successful:', {
        payment_intent_id,
        service,
        amount,
        customer_email,
        customer_name
      });
      
      // Here you would:
      // 1. Save transaction to database
      // 2. Send confirmation email to customer
      // 3. Send notification email to coach
      // 4. Create user account or update existing
      
      // Send confirmation email (example with nodemailer)
      await sendConfirmationEmail(customer_email, {
        service,
        amount,
        customer_name,
        payment_intent_id
      });
      
      res.send({ success: true });
    } else {
      res.status(400).send({ error: 'Payment not completed' });
    }
    
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(400).send({
      error: {
        message: error.message
      }
    });
  }
});

// Webhook endpoint for Stripe events
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = 'whsec_...'; // Replace with your webhook secret

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!', paymentIntent.id);
      // Handle successful payment
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!', paymentMethod.id);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({received: true});
});

// Email function example
async function sendConfirmationEmail(email, paymentData) {
  // Example with nodemailer (install with: npm install nodemailer)
  const nodemailer = require('nodemailer');
  
  const transporter = nodemailer.createTransporter({
    // Configure your email service here
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-app-password'
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: `Payment Confirmation - ${paymentData.service}`,
    html: `
      <h2>Payment Confirmation</h2>
      <p>Dear ${paymentData.customer_name},</p>
      <p>Thank you for your purchase! Your payment has been successfully processed.</p>
      <p><strong>Service:</strong> ${paymentData.service}</p>
      <p><strong>Amount:</strong> $${(paymentData.amount / 100).toFixed(2)}</p>
      <p><strong>Payment ID:</strong> ${paymentData.payment_intent_id}</p>
      <p>Saranya will contact you within 24 hours to schedule your sessions.</p>
      <p>Best regards,<br>Saranya Kolukuluri</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to:', email);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// To run this backend:
// 1. Install dependencies: npm install express stripe cors nodemailer
// 2. Replace the API keys with your actual Stripe keys
// 3. Configure email settings in sendConfirmationEmail function
// 4. Run with: node backend-example.js
// 5. Update the frontend fetch URLs to match your server URL