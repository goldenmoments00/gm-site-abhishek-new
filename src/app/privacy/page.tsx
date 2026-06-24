"use client";

import React from "react";
import { motion } from "framer-motion";
import SmartHeader from "@/components/SmartHeader";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#1A1A1A]">
      <SmartHeader />
      
      <main className="max-w-4xl mx-auto px-6 py-32 md:py-48">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-serif text-center mb-16 text-[#B97385]">Privacy Policy</h1>
          
          <div className="space-y-12 text-lg leading-relaxed">
            <section>
              <h2 className="text-2xl font-serif mb-4 text-[#1A1A1A]">Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Name</li>
                <li>Email</li>
                <li>Phone Number</li>
                <li>Event Details</li>
                <li>Website Analytics Data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4 text-[#1A1A1A]">How We Use Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Client communication</li>
                <li>Service delivery</li>
                <li>Website improvement</li>
                <li>Marketing updates (with consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4 text-[#1A1A1A]">Data Protection</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Secure storage of client information.</li>
                <li>No sale of personal information to third parties.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4 text-[#1A1A1A]">Cookies</h2>
              <p className="text-slate-700">
                Website uses cookies for analytics and user experience improvements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4 text-[#1A1A1A]">Third-Party Services</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Google Analytics</li>
                <li>Meta Pixel</li>
                <li>WhatsApp Business</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4 text-[#1A1A1A]">User Rights</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Request data access.</li>
                <li>Request correction of information.</li>
                <li>Request deletion of personal data.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4 text-[#1A1A1A]">Contact</h2>
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
