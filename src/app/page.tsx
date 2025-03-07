import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from "./Components/navbar";
import Footer from "./Components/footer";
import Hero from "./Components/Hero";
import LogoSection from "./Components/logosection";
import WhyUs from "./Components/whyus";
import UseCases from "./Components/usecase";
import WhyRubicr from "./Components/whyrubicr";
import OurReach from "./Components/ourreach";
import Feedback from "./Components/feedback";


const ImageToggler = dynamic(() => import("./Components/imagetoggle"), {
  ssr: true,
  loading: () => <div className="py-24 bg-black animate-pulse" />
});

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar className="fixed top-0 left-0 right-0 z-50" />

      <main className="relative">
        <Hero />
        <LogoSection />
        <WhyUs />
        <UseCases />
        <WhyRubicr />
        <Feedback />
        <ImageToggler />
        <OurReach />

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

      <Footer />
    </div>
  );
};

export default HomePage;