import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { paymentIntentId } = await request.json();

    if (!paymentIntentId) {
      return Response.json(
        { error: 'Payment intent ID is required' },
        { status: 400 }
      );
    }

    // Retrieve payment intent to get current status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return Response.json({
      status: paymentIntent.status,
      clientSecret: paymentIntent.client_secret,
      metadata: paymentIntent.metadata,
    });

  } catch (error) {
    console.error('Stripe payment confirmation error:', error);
    return Response.json(
      { error: 'Failed to confirm payment' },
      { status: 500 }
    );
  }
}