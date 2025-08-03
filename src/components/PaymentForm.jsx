"use client";

import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";

// const CARD_ELEMENT_OPTIONS = {
//   style: {
//     base: {
//       fontSize: "16px",
//       color: "#424770",
//       fontFamily: '"Cutive Mono", "Courier New", monospace',
//       "::placeholder": {
//         color: "#aab7c4",
//       },
//       //   padding: '12px',
//     },
//     invalid: {
//       color: "#9e2146",
//     },
//   },
//   hidePostalCode: false,
// };
const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        fontSize: "16px", // Keep for accessibility
        color: "var(--color-gray-dark)", // --color-gray-dark
        fontFamily: '"Courier Prime", "Courier New", monospace',
        "::placeholder": {
          color: "var(--color-gray-light)", // --color-gray-light
        },
        padding: '12px',
      },
      invalid: {
        color: "#dc2626",
      },
    },
    hidePostalCode: false, // Keep for fraud protection
  };

export default function PaymentForm({
  amount,
  description,
  clientId,
  onSuccess,
  onError,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    try {
      // Create payment intent
      const response = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          clientId,
          description,
        }),
      });

      const responseData = await response.json();

      if (responseData.error) {
        throw new Error(responseData.error);
      }

      const { clientSecret } = responseData;

      // Confirm payment
      const cardElement = elements.getElement(CardElement);
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent.status === "succeeded") {
        onSuccess(paymentIntent);
      }
    } catch (error) {
      setErrorMessage(error.message);
      onError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Payment Details */}
      <div className="bg-white/5 rounded-lg p-6 border border-black/10">
        <h3 className="text-lg font-semibold mb-4 font-primary">
          Payment Details
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Description:</span>
            <span className="font-mono">{description}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-mono text-lg font-bold">
              ${amount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Card Element */}
      <div className="bg-[var(--color-gray-faint)] rounded-lg border border-black/20 p-4">
        <label className="block text-sm font-medium mb-2 font-primary">
          Card Information
        </label>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>

      {/* Error Message */}
      {errorMessage && (
        <motion.div
          className="bg-red-50 border border-red-200 rounded-lg p-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-red-600 text-sm font-primary">{errorMessage}</p>
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full garfish-button transition-all duration-300 ${
          isProcessing ? "cursor-not-allowed" : "transform"
        }`}
        whileTap={{ scale: 0.98 }}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            <span>Processing...</span>
          </div>
        ) : (
          `Pay $${amount.toFixed(2)}`
        )}
      </motion.button>

      {/* Security Notice */}
      <p className="text-xs text-gray-500 text-center font-primary">
        Your payment information is secure and encrypted. We never store your
        card details.
      </p>
    </motion.form>
  );
}
