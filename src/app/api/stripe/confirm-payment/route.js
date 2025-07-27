import Stripe from 'stripe';
import { NextResponse } from 'next/server'; // Import NextResponse

// Check if the Stripe secret key is available in the environment.
// This is crucial for build-time and runtime stability when keys might be missing.
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// Initialize the Stripe object conditionally.
// If the secret key is not found, 'stripe' will be null, and the API route
// will return an error indicating that payment functionality is unavailable.
let stripe;
if (stripeSecretKey) {
  try {
    stripe = new Stripe(stripeSecretKey);
  } catch (error) {
    console.error("Error initializing Stripe with provided key for confirm-payment:", error);
    stripe = null; // Ensure stripe is null if initialization fails
  }
} else {
  console.warn("Stripe Secret Key (STRIPE_SECRET_KEY) is not set for confirm-payment. Confirmation functionality will be disabled.");
  stripe = null; // Explicitly set to null if key is missing
}

export async function POST(request) {
  // If Stripe was not initialized due to a missing or invalid key,
  // immediately return an error response to prevent build failures.
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe payment confirmation functionality is currently unavailable due to missing configuration." },
      { status: 503 } // Service Unavailable
    );
  }

  try {
    const { paymentIntentId } = await request.json();

    // Validate required fields from the request body.
    if (!paymentIntentId) {
      return NextResponse.json( // Use NextResponse.json
        { error: 'Payment intent ID is required' },
        { status: 400 } // Bad Request
      );
    }

    // Retrieve payment intent to get current status using the initialized Stripe object.
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Return the payment intent status, client secret, and metadata.
    return NextResponse.json({ // Use NextResponse.json
      status: paymentIntent.status,
      clientSecret: paymentIntent.client_secret,
      metadata: paymentIntent.metadata,
    });

  } catch (error) {
    // Log and return a generic error message for any issues during the API call.
    console.error('Stripe payment confirmation error:', error);
    return NextResponse.json( // Use NextResponse.json
      { error: 'Failed to confirm payment' },
      { status: 500 } // Internal Server Error
    );
  }
}


// ===================================================================================
// THE FILE BELOW APPLIES AFTER STRIPE ACCOUNT HAS BEEN CREATED AND KEYS ARE AVAILABLE:
// ===================================================================================

// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function POST(request) {
//   try {
//     const { paymentIntentId } = await request.json();

//     if (!paymentIntentId) {
//       return Response.json(
//         { error: 'Payment intent ID is required' },
//         { status: 400 }
//       );
//     }

//     // Retrieve payment intent to get current status
//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//     return Response.json({
//       status: paymentIntent.status,
//       clientSecret: paymentIntent.client_secret,
//       metadata: paymentIntent.metadata,
//     });

//   } catch (error) {
//     console.error('Stripe payment confirmation error:', error);
//     return Response.json(
//       { error: 'Failed to confirm payment' },
//       { status: 500 }
//     );
//   }
// }