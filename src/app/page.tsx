
"use client"

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Optimized component imports with loading states
const Navbar = dynamic(() => import("./Components/navbar"), {
  loading: () => <div className="h-16 bg-white/80 backdrop-blur-sm animate-pulse" />
});

const Footer = dynamic(() => import("./Components/footer"), {
  loading: () => <div className="h-16 bg-white/80 backdrop-blur-sm animate-pulse" />
});

// Dynamically import all sections with loading states
const Hero = dynamic(() => import("./Components/Hero"), {
  loading: () => <div className="min-h-screen bg-gray-100 animate-pulse" />
});

const LogoSection = dynamic(() => import("./Components/logosection"), {
  loading: () => <div className="py-24 bg-gray-50 animate-pulse" />
});

const WhyUs = dynamic(() => import("./Components/whyus"), {
  loading: () => <div className="py-24 bg-white animate-pulse" />
});

const UseCases = dynamic(() => import("./Components/usecase"), {
  loading: () => <div className="py-24 bg-gray-50 animate-pulse" />
});

const WhyRubicr = dynamic(() => import("./Components/whyrubicr"), {
  loading: () => <div className="py-24 bg-white animate-pulse" />
});

const ImageToggler = dynamic(() => import("./Components/imagetoggle"), {
  loading: () => <div className="py-24 bg-black animate-pulse" />
});

const OurReach = dynamic(() => import("./Components/ourreach"), {
  loading: () => <div className="py-24 bg-black animate-pulse" />
});

const Feedback = dynamic(() => import("./Components/feedback"), {
  loading: () => <div className="py-24 bg-black animate-pulse" />
});



// Page component
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="h-16 bg-white/80 backdrop-blur-sm animate-pulse" />}>
        <Navbar className="fixed top-0 left-0 right-0 z-50" />
      </Suspense>

      <main className="relative">
        <Suspense fallback={<div className="min-h-screen bg-gray-100 animate-pulse" />}>
          <Hero />
        </Suspense>

        <Suspense fallback={<div className="py-24 bg-gray-50 animate-pulse" />}>
          <LogoSection />
        </Suspense>

        <Suspense fallback={<div className="py-24 bg-white animate-pulse" />}>
          <WhyUs />
        </Suspense>

        <Suspense fallback={<div className="py-24 bg-gray-50 animate-pulse" />}>
          <UseCases />
        </Suspense>

        <Suspense fallback={<div className="py-24 bg-white animate-pulse" />}>
          <WhyRubicr />
        </Suspense>


        <Suspense fallback={<div className="py-24 bg-white animate-pulse" />}>
        <Feedback />
        </Suspense>
        

        <Suspense fallback={<div className="py-24 bg-gray-50 animate-pulse" />}>
          <ImageToggler />
        </Suspense>

        <Suspense fallback={<div className="py-24 bg-black animate-pulse" />}>
          <OurReach />
        </Suspense>

        <section className="bg-gradient-to-r from-yellow-500 to-yellow-700 py-20 mx-8 md:mx-20 rounded-3xl mb-20 shadow-2xl mt-12">
          <div className="max-w-screen-xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Get Started Today
            </h2>
            <hr className="border-t-2 border-white w-24 mx-auto mb-6" />
            <p className="text-xl md:text-2xl mb-8 text-white">
              Ready to transform your ESG Performance?
            </p>
            <a 
              href="/contact-us"
              className="inline-block px-8 py-3 bg-[#FFCD1B] text-black rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              Schedule a demo
            </a>
          </div>
        </section>
      </main>

      <Suspense fallback={<div className="h-16 bg-white animate-pulse" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default HomePage;