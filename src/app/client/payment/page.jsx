"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Navigation from "../../../components/Navigation";
import PaymentForm from "../../../components/PaymentForm";
import Logo from "../../../components/Logo";
import { useClientAuth } from "../../../contexts/ClientAuthContext";
import "./payment.css";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY 
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

export default function Payment() {
  const { isClientAuthenticated, authenticatedClient } = useClientAuth();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  // Client-specific invoices from clients.json
  const [invoices, setInvoices] = useState([]);

  // Load client-specific payment data
  useEffect(() => {
    if (authenticatedClient && authenticatedClient.payments) {
      setInvoices(authenticatedClient.payments);
    }
  }, [authenticatedClient]);

  const handlePaymentSuccess = async (paymentIntent) => {
    const paidDate = new Date().toISOString().split('T')[0];
    
    // Update invoice status locally first for immediate UI feedback
    setInvoices(prevInvoices => 
      prevInvoices.map(invoice => 
        invoice.id === selectedInvoice.id 
          ? { ...invoice, status: "paid", paidDate }
          : invoice
      )
    );
    
    // Persist the update to clients.json
    try {
      await fetch('/api/stripe/update-invoice-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: authenticatedClient?.id,
          invoiceId: selectedInvoice.id,
          status: 'paid',
          paidDate,
        }),
      });
    } catch (error) {
      console.error('Failed to persist invoice status update:', error);
      // Note: UI still shows as paid due to local state update
    }
    
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
        <Logo />
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
        <Logo />
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
      <Logo />
      <div className="flex items-start justify-center h-screen px-4 pt-24">
        <div className="w-full max-w-2xl payment-content-container">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h2 className="text-lg font-bold mt-4 mb-8 text-[color:var(--color-gray-shadow)] font-primary">
                  Pending Invoices for{" "}
                  <strong className="text-[var(--color-gray-shadow)]">
                    {authenticatedClient?.project || "your project"}
                  </strong>
                </h2>
              </motion.div>

          <div className="payment-content overflow-y-auto max-h-[calc(100vh-12rem)] scrollbar-hide">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
         

            {!selectedInvoice ? (
              // Invoice List
              <div className="space-y-6">
                {invoices.map((invoice) => (
                  <motion.div
                    key={invoice.id}
                    className={`payment-card p-6 ${
                      invoice.status === 'pending' ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    onClick={() => invoice.status === 'pending' && setSelectedInvoice(invoice)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold mb-2 font-primary">
                          {invoice.description}
                        </h3>
                        <p className="text-left text-sm text-gray-600 font-primary">
                          Due: {invoice.dueDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl ${
                            invoice.status === 'paid'
                                ? 'text-[color:var(--color-gray-light)] font-normal'
                                : 'text-[color:var(--color-green-dark)] font-bold'
                        } font-bold font-primary`}>
                          ${invoice.amount.toFixed(2)}
                        </div>
                        {/* <div className="text-2xl font-bold font-primary">
                          <span className="text-[color:var(--color-black)]">$</span>
                          <span className="text-[color:var(--color-gray-dark)]">{invoice.amount.toFixed(2)}</span>
                        </div> */}
                        <div className={`text-sm uppercase tracking-wide ${
                          invoice.status === 'paid' 
                            ? 'text-[color:var(--color-green-dark)] font-bold' 
                            : 'text-gray-600'
                        }`}>
                          {invoice.status === 'paid' ? 'PAID' : 'PENDING'}
                        </div>
                        {invoice.status === 'paid' && invoice.paidDate && (
                          <div className="text-xs text-[color:var(--color-gray-shadow)] mt-1">
                            Paid: {invoice.paidDate}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {invoices.filter(inv => inv.status === 'pending').length === 0 && (
                  <div className="payment-card p-8 text-center">
                    <p className="text-gray-600 font-primary">
                      No pending invoices at this time.
                    </p>
                  </div>
                )}
                
                {/* Stripe Attribution */}
                <motion.div
                  className="text-center mt-8 pt-4 border-t border-[color:var(--color-gray-light)] mb-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <p className="text-sm text-[color:var(--color-gray-shadow)] pb-2 font-primary">
                    🔒 Payments powered by <span className="font-bold">Stripe</span>
                  </p>
                </motion.div>
              </div>
            ) : (
              // Payment Form
              <div className="space-y-6 mb-16">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold font-primary">
                    Complete Payment
                  </h2>
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    className="garfish-button font-primary"
                  >
                    ← Back to Invoices
                  </button>
                </div>

                {stripePromise ? (
                  <Elements stripe={stripePromise}>
                    <PaymentForm
                      amount={selectedInvoice.amount}
                      description={selectedInvoice.description}
                      clientId={authenticatedClient?.id || "guest"}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  </Elements>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-600 font-primary mb-2">
                      ⚠️ Payment Processing Unavailable
                    </p>
                    <p className="text-sm text-red-500 font-primary">
                      Stripe payment configuration is missing. Please contact support.
                    </p>
                  </div>
                )}

                {paymentError && (
                  <motion.div
                    className="bg-red-50 border border-red-200 rounded-lg p-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-red-600 text-sm font-primary">
                      {paymentError}
                    </p>
                  </motion.div>
                )}
              </div>
            )}
            </motion.div>
          </div>
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
