"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Navigation from "../../../components/Navigation";
import PaymentForm from "../../../components/PaymentForm";
import { useClientAuth } from "../../../contexts/ClientAuthContext";
import "./payment.css";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Payment() {
  const { isClientAuthenticated, authenticatedClient } = useClientAuth();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  // Sample invoices for demo - replace with real client data
  const invoices = [
    {
      id: "inv_001",
      description: "Phase 1 - Structural & Functional",
      amount: 2500,
      dueDate: "2025-02-15",
      status: "pending",
    },
    {
      id: "inv_002",
      description: "Phase 2 - Branding, SEO, & Deployment",
      amount: 1500,
      dueDate: "2025-03-01",
      status: "pending",
    },
  ];

  const handlePaymentSuccess = (paymentIntent) => {
    setPaymentSuccess(true);
    setSelectedInvoice(null);
    console.log("Payment successful:", paymentIntent);
  };

  const handlePaymentError = (error) => {
    setPaymentError(error.message);
    console.error("Payment error:", error);
  };

  if (!isClientAuthenticated) {
    return (
      <div className="h-screen overflow-hidden text-black payment-page-container">
        <motion.div
          className="fixed top-8 left-8 z-20"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-[color:var(--color-black)] font-mono text-3xl font-bold text-left">
            Garfish Digital
          </div>
        </motion.div>
        <div className="flex items-center justify-center h-screen px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 font-primary">
              Access Denied
            </h2>
            <p className="text-gray-600 font-primary">
              Please log in to access the payment portal.
            </p>
          </div>
        </div>
        <Navigation
          currentPage="payment"
          isClientAuthenticated={isClientAuthenticated}
        />
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="h-screen overflow-hidden text-black payment-page-container">
        <motion.div
          className="fixed top-8 left-8 z-20"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-[color:var(--color-black)] font-mono text-3xl font-bold text-left">
            Garfish Digital
          </div>
        </motion.div>
        <div className="flex items-center justify-center h-screen px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-8">✓</div>
            <h2 className="text-3xl font-bold mb-4 font-primary">
              Payment Successful
            </h2>
            <p className="text-gray-600 mb-8 font-primary">
              Your payment has been processed successfully. You'll receive a
              confirmation email shortly.
            </p>
            <button
              onClick={() => setPaymentSuccess(false)}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-primary"
            >
              Return to Payments
            </button>
          </motion.div>
        </div>
        <Navigation
          currentPage="payment"
          isClientAuthenticated={isClientAuthenticated}
        />
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden text-black payment-page-container">
      <motion.div
        className="fixed top-8 left-8 z-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-[color:var(--color-black)] font-mono text-3xl font-bold text-left">
          Garfish Digital
        </div>
      </motion.div>
      <div className="flex items-start justify-center h-screen px-4 pt-24">
        <div className="w-full max-w-2xl payment-content-container">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h2 className="text-lg font-bold mb-4 text-[color:var(--color-gray-shadow)] font-arial">
                  Payment Gateway for{" "}
                  <strong className="text-[var(--color-gray-dark)]">
                    {authenticatedClient?.project || "your project"}
                  </strong>.
                </h2>
              </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* <h1 className="text-4xl font-bold mb-8 font-primary">
              Payment Portal
            </h1> */}

            {/* {authenticatedClient && (
              <p className="text-lg mb-8 text-gray-600 font-primary">
                Welcome back, {authenticatedClient.clientName}
              </p>
            )} */}

            {!selectedInvoice ? (
              // Invoice List
              <div className="space-y-6">
                {authenticatedClient && (
                    // <>
                  <h3 className="text-lg font-bold mt-6 mb-6 font-arial text-[var(--color-gray-dark)]">
                    Pending Invoices
                  </h3>
                //   <h3 className="font-bold">{authenticatedClient.project} Project</h3>
                //     </>
                )}
                {invoices.map((invoice) => (
                  <motion.div
                    key={invoice.id}
                    className="payment-card p-6 cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    onClick={() => setSelectedInvoice(invoice)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold mb-2 font-arial">
                          {invoice.description}
                        </h3>
                        <p className="text-left text-sm text-gray-600 font-arial">
                          Due: {invoice.dueDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold font-mono">
                          ${invoice.amount.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600 uppercase tracking-wide">
                          {invoice.status}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {invoices.length === 0 && (
                  <div className="payment-card p-8 text-center">
                    <p className="text-gray-600 font-arial">
                      No pending invoices at this time.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              // Payment Form
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold font-arial">
                    Complete Payment
                  </h2>
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    className="garfish-button font-arial"
                  >
                    ← Back to Invoices
                  </button>
                </div>

                <Elements stripe={stripePromise}>
                  <PaymentForm
                    amount={selectedInvoice.amount}
                    description={selectedInvoice.description}
                    clientId={authenticatedClient?.id || "guest"}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </Elements>

                {paymentError && (
                  <motion.div
                    className="bg-red-50 border border-red-200 rounded-lg p-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-red-600 text-sm font-arial">
                      {paymentError}
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Navigation Icons - Bottom Right */}
      <Navigation
        currentPage="payment"
        isClientAuthenticated={isClientAuthenticated}
      />
    </div>
  );
}
