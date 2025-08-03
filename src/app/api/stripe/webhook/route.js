// ===================================================================================
// THE FILE BELOW APPLIES AFTER STRIPE ACCOUNT HAS BEEN CREATED AND KEYS ARE AVAILABLE:
// ===================================================================================

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






// import Stripe from 'stripe';
// import { NextResponse } from 'next/server'; // Import NextResponse

// // Check if the Stripe secret key is available in the environment.
// const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
// // Check if the Stripe webhook secret is available.
// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// // Initialize the Stripe object conditionally.
// let stripe;
// if (stripeSecretKey) {
//   try {
//     stripe = new Stripe(stripeSecretKey);
//   } catch (error) {
//     console.error("Error initializing Stripe with provided key for webhook:", error);
//     stripe = null;
//   }
// } else {
//   console.warn("Stripe Secret Key (STRIPE_SECRET_KEY) is not set for webhook. Webhook processing will be disabled.");
//   stripe = null;
// }

// export async function POST(request) {
//   // If Stripe is not initialized or webhook secret is missing,
//   // immediately return an error response to prevent build failures or runtime errors.
//   if (!stripe || !endpointSecret) {
//     console.warn("Webhook processing skipped due to missing Stripe configuration (secret key or webhook secret).");
//     return NextResponse.json(
//       { error: "Stripe webhook functionality is currently unavailable due to missing configuration." },
//       { status: 503 } // Service Unavailable
//     );
//   }

//   const body = await request.text();
//   const signature = request.headers.get('stripe-signature');

//   let event;

//   try {
//     // Construct the event using the initialized Stripe object and webhook secret.
//     event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
//   } catch (err) {
//     console.error(`Webhook signature verification failed: ${err.message}`);
//     return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 }); // Use NextResponse.json
//   }

//   // Handle the event based on its type.
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntent = event.data.object;
//       console.log('Payment succeeded:', {
//         id: paymentIntent.id,
//         amount: paymentIntent.amount,
//         clientId: paymentIntent.metadata.clientId,
//         description: paymentIntent.metadata.description,
//       });

//       // TODO: Update client payment status in your database
//       // TODO: Send confirmation email to client
//       // TODO: Update project milestones if needed

//       break;

//     case 'payment_intent.payment_failed':
//       const failedPayment = event.data.object;
//       console.log('Payment failed:', {
//         id: failedPayment.id,
//         clientId: failedPayment.metadata.clientId,
//         error: failedPayment.last_payment_error,
//       });

//       // TODO: Handle failed payment (notify admin, update status)

//       break;

//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Acknowledge receipt of the webhook event.
//   return NextResponse.json({ received: true }); // Use NextResponse.json
// }

