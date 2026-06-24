"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { Special_Elite } from "next/font/google";

const typewriter = Special_Elite({
  subsets: ["latin"],
  weight: "400",
});
import PillNavbar from "@/components/PillNavbar";
import { Plus, MessageCircle, Phone, Mail, Instagram, Heart, Sparkles, Camera, Film } from "lucide-react";

// --- Types ---
interface FAQ {
  id: number;
  question: string;
  answer: string;
}

// --- Data ---
const faqs: FAQ[] = [
  { id: 1, question: "How far in advance should we book our wedding date?", answer: "We recommend booking as early as possible, especially for peak wedding seasons. Popular dates are often reserved months in advance." },
  { id: 2, question: "Do you travel for destination weddings?", answer: "Absolutely. We love documenting celebrations all across India. Whether you're planning a wedding in the mountains, by the beach, or in a grand city venue, we're always ready to travel wherever your story takes us." },
  { id: 3, question: "What services do you offer?", answer: "We offer wedding photography, cinematic wedding films, pre-wedding sessions, engagement shoots, bridal portraits, traditional ceremonies, and complete wedding coverage." },
  { id: 4, question: "What is your photography style?", answer: "Our style combines authentic storytelling, candid emotions, timeless portraits, and artistic details. We focus on capturing real moments as they naturally unfold." },
  { id: 5, question: "Can we customize our wedding package?", answer: "Absolutely. Every wedding is unique, and we create personalized collections based on your events, vision, and coverage requirements." },
  { id: 6, question: "How many photographs will we receive?", answer: "The final gallery size depends on the scale and duration of your celebration. Every delivered image is carefully selected and professionally edited to maintain our signature quality." },
  { id: 7, question: "When will we receive our photographs?", answer: "Your photographs will be delivered within approximately 45 days after you complete your final photo selection process." },
  { id: 8, question: "Do you provide cinematic wedding films?", answer: "Yes. We create cinematic wedding films that beautifully preserve the emotions, energy, and unforgettable moments of your celebration." },
  { id: 9, question: "Will all photos be edited?", answer: "Yes. Every image delivered by Golden Moments undergoes professional editing, color correction, and refinement to ensure a timeless and consistent visual style." },
  { id: 10, question: "Do you offer drone coverage?", answer: "Yes, drone coverage is available for eligible venues, weather conditions, and local permissions." },
  { id: 11, question: "How do we reserve our wedding date?", answer: "Your wedding date is officially secured once the booking agreement is completed and the required advance payment is received." },
  { id: 12, question: "Do you cover traditional Bengali weddings?", answer: "Absolutely. We have extensive experience documenting Bengali weddings and understand the emotions, rituals, traditions, and cultural details that make each celebration special." },
  { id: 13, question: "What makes Golden Moments different?", answer: "We believe wedding photography is about preserving emotions, not just creating images. Our approach focuses on genuine moments, meaningful storytelling, and timeless memories that you will cherish for generations." },
];

const timelineSteps = [
  { step: "01", title: "Tell Us Your Story", description: "Share your wedding vision, traditions, dreams, and the moments that matter most to you.", icon: Heart },
  { step: "02", title: "We Curate The Experience", description: "Every celebration is unique. We thoughtfully design a photography and film experience around your journey.", icon: Sparkles },
  { step: "03", title: "Live Every Moment", description: "Be fully present with your loved ones while we capture every emotion, detail, and beautiful in-between moment.", icon: Camera },
  { step: "04", title: "Relive It Forever", description: "Receive timeless photographs and cinematic films crafted to preserve your memories for generations.", icon: Film },
];

// --- Components ---

const MagneticButton = ({ children, onClick, type = "button", className = "" }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set((mouseX - width / 2) * 0.4);
    y.set((mouseY - height / 2) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative px-10 py-5 rounded-full bg-[#1A1A1A] text-[#FFF6E5] font-medium text-lg tracking-wider overflow-hidden group shadow-xl inline-flex items-center justify-center ${className}`}
    >
      <div className="absolute inset-0 bg-[#8A1212] transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 z-0"></div>
      <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
        {children}
      </span>
    </motion.button>
  );
};

const MagneticLink = ({ children, href, className = "" }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set((mouseX - width / 2) * 0.4);
    y.set((mouseY - height / 2) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative px-10 py-5 rounded-full bg-[#1A1A1A] text-[#FFF6E5] font-medium text-lg tracking-wider overflow-hidden group shadow-xl inline-flex items-center justify-center ${className}`}
    >
      <div className="absolute inset-0 bg-[#8A1212] transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 z-0"></div>
      <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
        {children}
      </span>
    </motion.a>
  );
};

const FAQItem = ({ faq, isOpen, onToggle }: { faq: FAQ, isOpen: boolean, onToggle: () => void }) => {
  return (
    <div className="border-b border-[#1A1A1A]/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-8 text-left focus:outline-none group"
      >
        <span className="text-xl md:text-2xl font-serif text-[#1A1A1A] group-hover:text-[#8A1212] transition-colors pr-8">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0 w-10 h-10 rounded-full border border-[#1A1A1A]/20 flex items-center justify-center text-[#1A1A1A] group-hover:border-[#8A1212] group-hover:text-[#8A1212] transition-colors"
        >
          <Plus size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-slate-600 text-lg leading-relaxed pr-12 max-w-3xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Page ---

export default function ConnectPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setFormSubmitted(true), 1000);
  };

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      id="main-content"
      className="min-h-screen overflow-x-clip bg-[#FFF6E5] text-[#1a1a1a]"
    >
      <PillNavbar />

      <main className="flex-grow pb-12">
        
        {/* SECTION 1 — HERO */}
        <section className="pt-32 lg:pt-40 pb-12 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8A1212]/5 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none"></div>
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 leading-[1.1]"
            >
              Every Great Love Story<br/>Starts With A Conversation
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Tell us about your celebration, your dreams, and the moments you never want to forget. We're here to turn them into timeless memories.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <MagneticButton onClick={scrollToForm}>
                Start Your Journey
              </MagneticButton>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 — WHY CONNECT WITH US */}
        <section className="py-12 px-6 relative">
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#8A1212]/[0.03] backdrop-blur-xl border border-[#8A1212]/10 rounded-[40px] p-8 md:p-12 text-center shadow-lg relative overflow-hidden">
              
              {/* Subtle decorative glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#8A1212]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl font-serif text-[#8A1212] mb-10 relative z-10"
              >
                More Than Photographers.<br/>Storytellers Of Your Forever.
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6 text-xl md:text-2xl font-light text-slate-700 leading-relaxed max-w-3xl mx-auto relative z-10"
              >
                <p>
                  We believe wedding photography is not about poses. It's about emotions, laughter, tears, traditions, and the beautiful moments in between.
                </p>
                <p className="text-[#8A1212] italic font-serif text-2xl md:text-3xl mt-8">
                  "We don't just document weddings. We preserve feelings."
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — QUICK CONNECT (Moved up for better flow before the form) */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-serif text-center mb-8"
            >
              Choose Your Preferred Way To Connect
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: MessageCircle, label: "WhatsApp", sub: "Fastest response", link: "https://wa.me/919436012345" },
                { icon: Phone, label: "Phone Call", sub: "+91 94360 12345", link: "tel:+919436012345" },
                { icon: Mail, label: "Email", sub: "hello@goldenmoment.in", link: "mailto:hello@goldenmoment.in" },
                { icon: Instagram, label: "Instagram", sub: "@goldenmoment.in", link: "https://instagram.com/goldenmoment.in" },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/40 backdrop-blur-md border border-white p-8 rounded-3xl text-center group hover:bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="w-16 h-16 rounded-full bg-[#FFF6E5] mx-auto flex items-center justify-center mb-6 group-hover:bg-[#8A1212] group-hover:text-white transition-colors duration-300">
                    <item.icon size={24} className="text-[#1A1A1A] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{item.label}</h3>
                  <p className="text-slate-500 text-sm">{item.sub}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 — CONTACT FORM */}
        <section id="contact-form" className="py-12 px-6 relative">
          <div className="max-w-4xl mx-auto bg-white rounded-[40px] p-6 md:p-10 shadow-2xl border border-black/5 relative overflow-hidden">
            
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-2 h-full bg-[#8A1212]"></div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif mb-8"
            >
              Let's Hear Your Story
            </motion.h2>

            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 text-center"
                >
                  <div className="w-20 h-20 bg-[#8A1212]/10 rounded-full flex items-center justify-center mx-auto mb-8 text-[#8A1212]">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-3xl font-serif mb-4">Thank you for reaching out.</h3>
                  <p className="text-xl text-slate-600 italic">Your story is already becoming a Golden Moment.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleFormSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Bride & Groom Name</label>
                      <input required type="text" className="w-full bg-[#FFF6E5]/50 border-b-2 border-black/10 px-4 py-3 focus:outline-none focus:border-[#8A1212] transition-colors rounded-t-md" placeholder="e.g. Sarah & Michael" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Phone Number</label>
                      <input required type="tel" className="w-full bg-[#FFF6E5]/50 border-b-2 border-black/10 px-4 py-3 focus:outline-none focus:border-[#8A1212] transition-colors rounded-t-md" placeholder="+91 00000 00000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Email Address</label>
                      <input required type="email" className="w-full bg-[#FFF6E5]/50 border-b-2 border-black/10 px-4 py-3 focus:outline-none focus:border-[#8A1212] transition-colors rounded-t-md" placeholder="hello@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Wedding Date</label>
                      <input required type="date" className="w-full bg-[#FFF6E5]/50 border-b-2 border-black/10 px-4 py-3 focus:outline-none focus:border-[#8A1212] transition-colors rounded-t-md" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Wedding Location</label>
                      <input required type="text" className="w-full bg-[#FFF6E5]/50 border-b-2 border-black/10 px-4 py-3 focus:outline-none focus:border-[#8A1212] transition-colors rounded-t-md" placeholder="City, Venue" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Preferred Package</label>
                      <select className="w-full bg-[#FFF6E5]/50 border-b-2 border-black/10 px-4 py-3 focus:outline-none focus:border-[#8A1212] transition-colors rounded-t-md">
                        <option value="">Select an option</option>
                        <option value="cinematic">Cinematic Wedding Experience</option>
                        <option value="traditional">Traditional Elegance</option>
                        <option value="destination">Destination Wedding</option>
                        <option value="custom">Not sure yet / Custom</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Instagram Handle (Optional)</label>
                    <input type="text" className="w-full bg-[#FFF6E5]/50 border-b-2 border-black/10 px-4 py-3 focus:outline-none focus:border-[#8A1212] transition-colors rounded-t-md" placeholder="@yourhandle" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Tell Us About Your Wedding</label>
                    <textarea required rows={4} className="w-full bg-[#FFF6E5]/50 border-b-2 border-black/10 px-4 py-3 focus:outline-none focus:border-[#8A1212] transition-colors rounded-t-md resize-none" placeholder="Share your vision, themes, important traditions, or how you met..."></textarea>
                  </div>

                  <div className="pt-8">
                    <MagneticButton type="submit" className="w-full md:w-auto">
                      Reserve Your Date
                    </MagneticButton>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* SECTION 5 — THE GOLDEN MOMENTS EXPERIENCE */}
        <section className="py-24 px-6 overflow-hidden bg-white/50 border-t border-black/5">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-10"
            >
              <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-6 leading-tight">
                From A Simple Conversation<br/>To A Lifetime Of Memories
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Every unforgettable wedding begins with a story. Here's how we transform yours into timeless memories.
              </p>
            </motion.div>

            <div ref={timelineRef} className="relative">
              {/* Base Vertical line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-black/5 md:-translate-x-1/2 z-0"></div>
              
              {/* Scroll-animated highlight line */}
              <motion.div 
                style={{ height: lineHeight }}
                className="absolute left-8 md:left-1/2 top-0 w-[2px] bg-[#8A1212] md:-translate-x-1/2 origin-top z-0"
              ></motion.div>
              
              <div className="flex flex-col gap-12 md:gap-4 mt-8">
                {timelineSteps.map((item, index) => {
                  const isEven = index % 2 !== 0;
                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false, margin: "-100px" }}
                      transition={{ duration: 0.5 }}
                      className={`flex flex-col md:flex-row items-center relative py-4 ${isEven ? 'md:flex-row-reverse' : ''}`}
                    >
                      <div className={`md:w-1/2 w-full pl-20 pr-4 md:px-0 ${isEven ? 'md:pl-12 lg:pl-20 md:pr-0' : 'md:pr-12 lg:pr-20 md:pl-0'} text-left ${isEven ? 'md:text-left' : 'md:text-right'} mb-6 md:mb-0`}>
                        <div className={`flex flex-col items-start ${isEven ? 'md:items-start' : 'md:items-end'}`}>
                          <motion.span 
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-slate-400 font-serif text-xl block mb-2"
                          >{item.step}</motion.span>
                          
                          <motion.h3 
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-2xl md:text-3xl font-serif text-[#8A1212] mb-3 leading-tight"
                          >{item.title}</motion.h3>
                          
                          <motion.p 
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className={`${typewriter.className} text-[#4A4A4A] leading-relaxed max-w-xs text-sm md:text-base`}
                          >{item.description}</motion.p>
                        </div>
                      </div>
                      
                      {/* Responsive Node with Icon */}
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="absolute left-8 md:left-1/2 top-4 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl ring-1 ring-black/5 flex items-center justify-center text-[#8A1212] z-10"
                      >
                        <item.icon className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={1.5} />
                      </motion.div>
                      
                      <div className="md:w-1/2 w-full hidden md:block"></div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7 — FREQUENTLY ASKED QUESTIONS */}
        <section className="py-16 px-6 bg-white border-y border-black/5">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-6">
                Questions Before The Celebration
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Everything you need to know before beginning your Golden Moments journey.
              </p>
            </motion.div>
            
            <div className="border-t border-[#1A1A1A]/10 mb-10">
              {faqs.map((faq) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openFAQ === faq.id}
                  onToggle={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                />
              ))}
            </div>

            {/* FINAL FAQ CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#FFF6E5] rounded-3xl p-10 md:p-16 text-center shadow-lg border border-black/5"
            >
              <h3 className="text-3xl font-serif mb-4">Still Have Questions?</h3>
              <p className="text-slate-600 mb-8 max-w-lg mx-auto">Let's talk about your celebration and create something unforgettable together.</p>
              <MagneticLink href="https://booking.goldenmoment.in/">
                Start Your Journey
              </MagneticLink>
            </motion.div>
          </div>
        </section>

        {/* SECTION 6 — FINAL CTA */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#8A1212]/5 rounded-full blur-[100px] -ml-40 -mt-40 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight text-[#1A1A1A]"
            >
              Your Wedding Will Last A Day.<br/>
              <span className="text-[#8A1212]">Your Memories Should Last Forever.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-600 italic mb-12 font-serif"
            >
              "Let's create something you'll cherish for a lifetime."
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <MagneticLink href="https://booking.goldenmoment.in/">
                Begin Your Journey
              </MagneticLink>
            </motion.div>
          </div>
        </section>

      </main>
    </div>
  );
}
