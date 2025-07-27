import Stripe from 'stripe';
import { NextResponse } from 'next/server'; // Import NextResponse for better Next.js App Router handling

// Check if the Stripe secret key is available in the environment.
// This check is crucial because Next.js API routes can be pre-rendered
// or processed during the build step, at which point environment variables
// might not be fully loaded or accessible if not explicitly handled.
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// Initialize the Stripe object conditionally.
// If the secret key is not found, 'stripe' will remain undefined,
// and the API route will return an error indicating that payment
// functionality is currently unavailable.
let stripe;
if (stripeSecretKey) {
  try {
    stripe = new Stripe(stripeSecretKey);
  } catch (error) {
    // Catch potential errors during Stripe initialization itself (e.g., invalid key format)
    console.error("Error initializing Stripe with provided key:", error);
    stripe = null; // Ensure stripe is null if initialization fails
  }
} else {
  console.warn("Stripe Secret Key (STRIPE_SECRET_KEY) is not set. Payment intent creation will be disabled.");
  stripe = null; // Explicitly set to null if key is missing
}

export async function POST(request) {
  // If Stripe was not initialized due to a missing or invalid key,
  // immediately return an error response. This prevents the build from failing
  // and clearly communicates that the service is unavailable.
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe payment functionality is currently unavailable due to missing configuration." },
      { status: 503 } // 503 Service Unavailable is appropriate here
    );
  }

  try {
    const { amount, clientId, description } = await request.json();

    // Validate required fields from the request body.
    if (!amount || !clientId || !description) {
      return NextResponse.json( // Use NextResponse.json
        { error: 'Missing required fields: amount, clientId, description' },
        { status: 400 } // Bad Request
      );
    }

    // Create payment intent using the initialized Stripe object.
    // Amount is converted to cents as required by Stripe.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        clientId,
        description,
      },
      // It's often good practice to include automatic_payment_methods for broader compatibility
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Return the client secret and payment intent ID upon successful creation.
    return NextResponse.json({ // Use NextResponse.json
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error) {
    // Log and return a generic error message for any issues during the API call.
    console.error('Stripe payment intent creation error:', error);
    return NextResponse.json( // Use NextResponse.json
      { error: 'Failed to create payment intent' },
      { status: 500 } // Internal Server Error
    );
  }
}




// THE FILE BELOW APPLIES AFTER STRIPE ACCOUNT HAS BEEN CREATED AND KEYS ARE AVAILABLE:

// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);




// export async function POST(request) {
//   try {
//     const { amount, clientId, description } = await request.json();

//     // Validate required fields
//     if (!amount || !clientId || !description) {
//       return Response.json(
//         { error: 'Missing required fields: amount, clientId, description' },
//         { status: 400 }
//       );
//     }

//     // Create payment intent
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(amount * 100), // Convert to cents
//       currency: 'usd',
//       metadata: {
//         clientId,
//         description,
//       },
//     });

//     return Response.json({
//       clientSecret: paymentIntent.client_secret,
//       paymentIntentId: paymentIntent.id,
//     });

//   } catch (error) {
//     console.error('Stripe payment intent creation error:', error);
//     return Response.json(
//       { error: 'Failed to create payment intent' },
//       { status: 500 }
//     );
//   }
// }