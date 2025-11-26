const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents (or paisa)
      currency: 'npr', // or 'usd' depending on your preference, user mentioned Khalti so NPR likely, but Stripe supports many. Let's stick to INR or USD if NPR not supported by Stripe test mode easily, but standard is usually USD for generic test. User didn't specify currency but Khalti implies Nepal. Stripe supports NPR.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
