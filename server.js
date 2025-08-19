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
    const { email } = req.body;
    const customer = await stripe.customers.create({ email });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer: customer.id,
      mode: 'payment',
      line_items: [{
       //price: 'price_1Rka4DRU1fA8NXRMWKwM2fzT',
       price: 'price_1RxgWmDy6JnWBXURjMGpqAmE',
        quantity: 1,
      }],
      success_url: 'https://www.correctthecontract.com/artist-label?payment=success',
      cancel_url: 'https://yourdomain.com/cancel',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Stripe checkout session creation failed' });
  }
});

app.post('/create-checkout-session_independent', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
       price: 'price_1Rka4DRU1fA8NXRMWKwM2fzT',
       //price: 'price_1RtYZGRc6cDcGXxsuCW33pnW',
        quantity: 1,
      }],
      success_url: 'https://www.correctthecontract.com/independent-contractor?payment=success',
      cancel_url: 'https://yourdomain.com/cancel',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Stripe checkout session creation failed' });
  }
});

app.post('/create-checkout-session_video', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
       price: 'price_1Rka4DRU1fA8NXRMWKwM2fzT',
       //price: 'price_1RtYZGRc6cDcGXxsuCW33pnW',
        quantity: 1,
      }],
      success_url: 'https://www.correctthecontract.com/video-film?payment=success',
      cancel_url: 'https://yourdomain.com/cancel',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Stripe checkout session creation failed' });
  }
});

app.post('/create-checkout-session_ms', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
       //price: 'price_1Ruk6fRU1fA8NXRMUIO1nJPd',
       price: 'price_1RxhVnDy6JnWBXUR72EXYTR8',
        quantity: 1,
      }],
      success_url: 'https://www.correctthecontract.com/artist-label?mailstream_payment=success',
      cancel_url: 'https://yourdomain.com/cancel',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Stripe checkout session creation failed' });
  }
});

app.post('/create-subscription-session', async (req, res) => {
  try {

    const { email, redirectPath } = req.body;

    const successUrl = `https://www.correctthecontract.com${redirectPath}?subscription=success`;

    const customer = await stripe.customers.create({ email });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer: customer.id,
      mode: 'subscription',
      line_items: [{
       //price: 'price_1Rka5XRU1fA8NXRMv5k4BZOw',
       price: 'price_1RxhTwDy6JnWBXURtya1d5bu',
       quantity: 1,
      }],
      success_url: successUrl,
      cancel_url: 'https://yourdomain.com/cancel',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Stripe checkout session creation failed' });
  }
});

app.listen(4242, () => console.log('Server running on port 4242'));
