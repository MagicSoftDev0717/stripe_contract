// server.js
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: 'https://www.correctthecontract.com'
}));

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price: 'price_1Rka4DRU1fA8NXRMWKwM2fzT',
        quantity: 1,
      }],
      success_url: 'https://www.correctthecontract.com/artist-label',
      cancel_url: 'https://yourdomain.com/cancel',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Stripe checkout session creation failed' });
  }
});

app.listen(4242, () => console.log('Server running on port 4242'));
