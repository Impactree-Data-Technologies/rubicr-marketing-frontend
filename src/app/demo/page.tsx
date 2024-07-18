"use client";

import Navbar from "../Components/navbar";
import CompanyLogo from "../Components/companylogo";
import WhyRubicr from "../Components/whyrubicr";
import WhyUs from "../Components/whyus";
import Impact from "../Components/impact";
import Doit from "../Components/doit";
import Usecase from "../Components/usecase";
import Module from "../Components/module";
import Feature from "../Components/feature";
import SixStep from "../Components/sixstep";
import InteractiveMap from "../Components/map";
import TeamSection from "../Components/teamsection";
import ImageToggle from "../Components/imagetoggle";
import Feedback from "../Components/feedback";
import Footer from "../Components/footer";
import Button from "../Components/button";
import Image from "next/image";
import Link from "next/link";
import './home.css'
import { useState, useEffect } from "react";

export default function Demo() {
  const [data1, setData1] = useState(null);
  const [data3, setData3] = useState(null);
  const [logoData, setLogoData] = useState({ title: '', description: '', logos: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const response1 = await fetch("http://localhost:1337/api/home?populate=*");
        const response2 = await fetch("http://localhost:1337/api/home?populate=Logo.logo");
        const response3 = await fetch("http://localhost:1337/api/home?populate[0]=whyrubicr.card.heading");




        if (!response1.ok || !response2.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData1 = await response1.json();
        const responseData2 = await response2.json();
        const responseData3 = await response3.json();

        setData1(responseData1.data.attributes);
        setLogoData({  
          title: responseData2.data.attributes.Logo.logo_title,
          description: responseData2.data.attributes.Logo.logo_description,
          logos: responseData2.data.attributes.Logo.logo.data
        });

        setData3(responseData3.data.attributes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="font-arial">
      <div
        style={{
          backgroundImage: "url('/bg_image1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "50vh",
          width: "100%",
        }}
      >
        <Navbar />

        {data1 && (
          <section className="bg-transparent dark:bg-transparent py-9">
            <div className="max-w-screen-xl mx-auto px-4 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-8 mt-1">
                {data1.title}
              </h1>
              <h3 className="text-xl md:text-2xl font-bold dark:text-gray-300 mb-4">
                {data1.description}
              </h3>
              <p className="text-lg md:text-xl font-bold  dark:text-gray-300 mb-0">
                {data1.subdescription}
              </p>
            </div>
          </section>
        )}
      </div>

      {logoData.logos.length > 0 && (
        <CompanyLogo 
          title={logoData.title} 
          description={logoData.description} 
          logos={logoData.logos} 
        />
      )}
      <WhyUs/>
      <InteractiveMap />
      <WhyRubicr />
      <Impact />
      
      <Doit />
      <Usecase />
      {/* <Module /> */}
      {/* <Feature /> */}
      <SixStep/>
      <ImageToggle/>
     
      
      <TeamSection/>
      <Feedback />

      <div className="bg-[#f6e2cb] md:bg-[#f6e2cb] h-96 md:h-80 mx-8 md:mx-20 mt-8 md:mt-12 rounded-3xl md:rounded-110px p-8 mb-20">
        <div className="flex flex-col items-start">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 ml-6 md:ml-12">Get Started Today</h1>
          <hr className="border-t-2 border-[#64271F] w-1/4 md:w-1/4 ml-6 md:ml-12 mb-4 md:mb-6" />
          <p className="text-lg md:text-2xl ml-6 md:ml-12 mb-6 md:mb-8">Ready to transform your ESG Performance?</p>
          <div className="ml-11">
            <Button margintop="6" marginleft="6" background="#FFCD1B" color="black" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
