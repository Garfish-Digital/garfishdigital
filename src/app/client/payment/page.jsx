"use client";

import { motion } from "framer-motion";
import Navigation from "../../../components/Navigation";
import { useClientAuth } from "../../../hooks/useClientAuth";
import "./payment.css";

export default function Payment() {
  const { isClientAuthenticated } = useClientAuth();
  
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
        <div className="w-full max-w-2xl payment-content-container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* <h1 className="text-4xl font-bold mb-8 font-primary">
              Payment Portal
            </h1> */}
            <p className="text-lg mb-12 text-gray-600 font-primary">
              Secure payment processing and invoicing system
            </p>

            <div className="rounded-lg p-8 payment-card">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-6 font-primary">
                  Coming Soon
                </h2>
                <p className="text-gray-600 mb-8 font-primary">
                  Stripe payment gateway integration and invoicing system will
                  be available here.
                </p>

                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div className="payment-feature">
                    <h3 className="text-lg font-semibold mb-2 font-primary">
                      Secure Payments
                    </h3>
                    <p className="text-sm text-gray-600 font-primary">
                      Industry-standard encryption and PCI compliance
                    </p>
                  </div>
                  <div className="payment-feature">
                    <h3 className="text-lg font-semibold mb-2 font-primary">
                      Automated Invoicing
                    </h3>
                    <p className="text-sm text-gray-600 font-primary">
                      Professional invoices sent automatically
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Logo - Upper Left */}
      {/* <motion.div
        className="fixed top-4 left-8 z-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="back-text logo-base logo-large">garfish</div>
        <div className="back-text logo-base logo-large">digital</div>
      </motion.div> */}

      {/* Navigation Icons - Bottom Right */}
      <Navigation currentPage="payment" isClientAuthenticated={isClientAuthenticated} />
    </div>
  );
}
