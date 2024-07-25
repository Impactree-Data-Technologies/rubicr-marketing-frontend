"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../app/Components/navbar";
import CompanyLogo from "../app/Components/companylogo";
import WhyRubicr from "../app/Components/whyrubicr";
import WhyUs from "../app/Components/whyus";
import Impact from "../app/Components/impact";
import Doit from "../app/Components/doit";
import Usecase from "../app/Components/usecase";
import SixStep from "../app/Components/sixstep";
import InteractiveMap from "../app/Components/map";
import TeamSection from "../app/Components/teamsection";
import ImageToggle from "../app/Components/imagetoggle";
import Feedback from "../app/Components/feedback";
import Footer from "../app/Components/footer";
import Button from "../app/Components/button";
import '../app/home/home.css'

export default function Demo() {
  const [data1, setData1] = useState(null);
  const [data3, setData3] = useState(null);
  const [data4, setData4] = useState(null);
  const [logoData, setLogoData] = useState({ title: '', description: '', logos: [] });

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const response1 = await fetch(`${BASE_URL}/api/home?populate=*`);
        const response2 = await fetch(`${BASE_URL}/api/home?populate=Logo.logo`);
        const response3 = await fetch(`${BASE_URL}/api/home?populate[0]=whyrubicr.card.heading`);
        const response4 = await fetch(`${BASE_URL}/api/home?populate[0]=image_toggler.with_rubicr`);

        if (!response1.ok || !response2.ok || !response3.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData1 = await response1.json();
        const responseData2 = await response2.json();
        const responseData3 = await response3.json();
        const responseData4 = await response4.json();

        setData1(responseData1.data.attributes);
        setLogoData({  
          title: responseData2.data.attributes.Logo.logo_title,
          description: responseData2.data.attributes.Logo.logo_description,
          logos: responseData2.data.attributes.Logo.logo.data
        });
        setData3(responseData3.data.attributes); 
        setData4(responseData4.data.attributes.image_toggler.with_rubicr.data);
       console.log("url", responseData4.data.attributes.image_toggler.with_rubicr.data.attributes);
        

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="font-arial">
      <div className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Main background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg_image1.png')" }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/50 to-purple-500/50" />
        
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-y-6"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform skew-y-6"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 w-full flex-grow flex flex-col">
          <Navbar className="py-2  " />
          {data1 && (
            <section className="flex-grow flex items-center">
              <div className="max-w-screen-xl mx-auto px-4 text-center md:text-left text-white py-10">
                <h1 className="text-5xl md:text-6xl font-bold mb-8 animate-fade-in-down">
                  {data1.title}
                </h1>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 animate-fade-in-up">
                  {data1.description}
                </h3>
                <p className="text-lg md:text-xl mb-8 animate-fade-in-up">
                  {data1.subdescription}
                </p>
                <Button label="Contact Us" background="#FFCD1B" color="black" />
              </div>
            </section>
          )}
        </div>
      </div>

      {logoData.logos.length > 0 && (
        <CompanyLogo 
          title={logoData.title} 
          description={logoData.description} 
          logos={logoData.logos} 
        />
      )}

      <section className="bg-gray-100 py-20">
        <WhyUs />
      </section>

      <section className="py-20">
        <InteractiveMap />
      </section>

      <section className="bg-gray-100 py-20">
        <WhyRubicr />
      </section>

      <section className="py-20">
        <Impact />
      </section>

      <section className="bg-gray-100 py-20">
        <Doit />
      </section>

      <section className="py-20">
        <Usecase />
      </section>

      <section className="bg-gray-100 py-20">
        <SixStep />
      </section>

      <section className="py-20">
        <ImageToggle />
      </section>

      <section className="bg-gray-100 py-20">
        <TeamSection />
      </section>

      <section className="py-20">
        <Feedback />
      </section>

      <section className="bg-[#f6e2cb] py-20 mx-8 md:mx-20 rounded-3xl mb-20">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Started Today</h2>
          <hr className="border-t-2 border-[#64271F] w-1/4 mb-6" />
          <p className="text-lg md:text-2xl mb-8">Ready to transform your ESG Performance?</p>
          <Button label="Contact Us" background="#FFCD1B" color="black" />
        </div>
      </section>

      <Footer />
    </div>
  );
}