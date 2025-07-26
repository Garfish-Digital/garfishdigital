import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return Response.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        clientId: paymentIntent.metadata.clientId,
        description: paymentIntent.metadata.description,
      });
      
      // TODO: Update client payment status in your database
      // TODO: Send confirmation email to client
      // TODO: Update project milestones if needed
      
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', {
        id: failedPayment.id,
        clientId: failedPayment.metadata.clientId,
        error: failedPayment.last_payment_error,
      });
      
      // TODO: Handle failed payment (notify admin, update status)
      
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return Response.json({ received: true });
}