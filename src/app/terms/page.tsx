"use client";

import React from "react";
import { motion } from "framer-motion";
import SmartHeader from "@/components/SmartHeader";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#1A1A1A]">
      <SmartHeader />
      
      <main className="max-w-4xl mx-auto px-6 py-32 md:py-48">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-serif text-center mb-16 text-[#B97385]">Terms & Conditions</h1>
          
          <div className="space-y-12 text-lg leading-relaxed">
            <section>
              <h2 className="text-2xl font-serif mb-4 text-[#1A1A1A]">1. Booking & Advance Payment</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Booking is confirmed only after advance payment.</li>
                <li>Advance amount is non-refundable.</li>
                <li>Remaining payment must be completed before final delivery.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4 text-[#1A1A1A]">2. Cancellation Policy</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Client cancellation may result in forfeiture of advance payment.</li>
                <li>Golden Moments reserves the right to cancel due to unforeseen circumstances.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4 text-[#1A1A1A]">3. Photography & Videography Rights</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Golden Moments retains copyright of all photographs and films.</li>
                <li>Clients receive personal usage rights.</li>
                <li>Commercial usage requires written permission.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4 text-[#1A1A1A]">4. Delivery Timeline</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Photo delivery within agreed timeframe.</li>
                <li>Wedding films delivered as per package agreement.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4 text-[#1A1A1A]">5. Force Majeure</h2>
              <p className="text-slate-700">
                Golden Moments shall not be liable for delays caused by natural disasters, government restrictions, strikes, accidents, or emergencies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4 text-[#1A1A1A]">6. Limitation of Liability</h2>
              <p className="text-slate-700">
                Maximum liability shall not exceed the total amount paid by the client.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4 text-[#1A1A1A]">7. Contact Information</h2>
              <p className="text-slate-700">
                Email: <a href="mailto:hello@goldenmoment.in" className="text-[#B97385] hover:underline">hello@goldenmoment.in</a>
              </p>
            </section>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
