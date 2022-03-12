import nc from 'next-connect';
import Stripe from 'stripe';

const handler = nc();

const stripe = new Stripe(
  'sk_test_51KbJNXIz4lM6WZrx3ddP3fzJkjUBcBvSXBGRNK0niHmDJpmCLJlfvmk1lcoQW7feFXN8BaTbfV12x4tKtB7hoaQa00fj01pYOH'
);

const endpointSecret =
  'whsec_abe4221ee2f96ffa048997d463f6dfcbf46ed93fe6de7693dbfb9eb46ffffa83';

handler.post('/webhook', (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send('payment succeeded');
});

export default handler;
