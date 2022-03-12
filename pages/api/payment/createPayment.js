import nc from 'next-connect';

import Stripe from 'stripe';

const stripe = new Stripe(
  'sk_test_51KbJNXIz4lM6WZrx3ddP3fzJkjUBcBvSXBGRNK0niHmDJpmCLJlfvmk1lcoQW7feFXN8BaTbfV12x4tKtB7hoaQa00fj01pYOH',
  {
    apiVersion: '2020-08-27',
  }
);

//webhook sign in secret = 'whsec_abe4221ee2f96ffa048997d463f6dfcbf46ed93fe6de7693dbfb9eb46ffffa83'

const handler = nc();

handler.post(async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price: 'price_1KbKkFIz4lM6WZrxKv0tbArn',
          quantity: 12,
        },
      ],
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
    res.json({ url: session.url });
  } catch (err) {
    console.log({ err });
    res.status(500).send(err.message);
  }
});

export default handler;
