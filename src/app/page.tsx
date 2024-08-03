"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import Link from "next/link";

const Navbar = dynamic(() => import("../app/Components/navbar"), { ssr: false });
const WhyRubicr = dynamic(() => import("../app/Components/whyrubicr"), { ssr: false });
const WhyUs = dynamic(() => import("../app/Components/whyus"), { ssr: false });
const Impact = dynamic(() => import("../app/Components/impact"), { ssr: false });
const Doit = dynamic(() => import("../app/Components/doit"), { ssr: false });
const Usecase = dynamic(() => import("../app/Components/usecase"), { ssr: false });
const SixStep = dynamic(() => import("../app/Components/sixstep"), { ssr: false });
const InteractiveMap = dynamic(() => import("../app/Components/map"), { ssr: false });
const TeamSection = dynamic(() => import("../app/Components/teamsection"), { ssr: false });
const ImageToggle = dynamic(() => import("../app/Components/imagetoggle"), { ssr: false });
const Feedback = dynamic(() => import("../app/Components/feedback"), { ssr: false });
const Footer = dynamic(() => import("../app/Components/footer"), { ssr: false });
const Button = dynamic(() => import("../app/Components/button"), { ssr: false });
const OurReach = dynamic(() => import("../app/Components/ourreach"), { ssr: false });
const MediaCoverage = dynamic(() => import("../app/Components/MediaCoverage"), { ssr: false });

const Image = dynamic(() => import('next/image'), { ssr: false });
import '../app/home/home.css'

// Shared interfaces (keep these as they were)
interface LogoAttributes {
  url: string;
  name: string;
}

interface Logo {
  attributes: LogoAttributes;
}

interface LogoData {
  title: string;
  description: string;
  logos: Logo[];
}

interface HomeData {
  title: string;
  description: string;
  subdescription: string;
}

interface WithRubicrData {
  id: number;
  attributes: {
    url: string;
  };
}

interface CompanyLogoProps {
  title: string;
  description: string;
  logos: Logo[];
}

// CompanyLogo Component (keep this as it was)
function CompanyLogo({ title, description, logos }: CompanyLogoProps) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!Array.isArray(logos)) {
    console.error("logos is not an array:", logos);
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-3">{title}</h2>
        <p className="text-xl md:text-2xl text-center text-gray-600 mb-12">{description}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {logos.map((logoData, index) => {
            const logo = logoData.attributes;
            return (
              <div key={index} className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <Image
                  src={`${logo.url}`}
                  alt={logo.name}
                  width={150}
                  height={75}
                  objectFit="contain"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Main Demo Component
export default function Demo() {
  const [data1, setData1] = useState<HomeData | null>(null);
  const [data3, setData3] = useState<any>(null);
  const [data4, setData4] = useState<WithRubicrData | null>(null);
  const [logoData, setLogoData] = useState<LogoData>({ title: '', description: '', logos: [] });

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      if (typeof window !== 'undefined') {
        try {
          const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
          const response1 = await fetch(`${BASE_URL}/api/home?populate=*`);
          const response2 = await fetch(`${BASE_URL}/api/home?populate=Logo.logo`);
          const response3 = await fetch(`${BASE_URL}/api/home?populate[0]=whyrubicr.card.heading`);
          const response4 = await fetch(`${BASE_URL}/api/home?populate[0]=image_toggler.with_rubicr`);
          console.log(BASE_URL);
          if (!response1.ok || !response2.ok || !response3.ok || !response4.ok) {
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
            logos: responseData2.data.attributes.Logo.logo.data.map((item: any) => ({
              attributes: {
                url: item.attributes.url,
                name: item.attributes.name || 'Logo' // Fallback if name is not provided
              }
            }))
          });
          setData3(responseData3.data.attributes);
          setData4(responseData4.data.attributes.image_toggler.with_rubicr.data);
          console.log("url", responseData4.data.attributes.image_toggler.with_rubicr.data.attributes);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }

    fetchData();
  }, []);

  return (
    <div className="font-arial">
      <Navbar className="fixed top-0 left-0 right-0 z-50" />
      <div className="relative min-h-screen flex flex-col overflow-hidden pt-16">
        {/* Main background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bgimage.webp')" }}
        />
        
        {/* Content */}
        <div className="relative z-10 w-full flex-grow flex flex-col">
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
                <Button label="Begin Your Journey" background="#FFCD1B" color="black" />
              </div>
            </section>
          )}
        </div>
      </div>

      {logoData.logos.length > 0 && (
        <section className="relative z-10">
          <CompanyLogo 
            title={logoData.title} 
            description={logoData.description} 
            logos={logoData.logos} 
          />
        </section>
      )}

      <section className="relative z-10 bg-gray-100 py-20">
        <WhyUs />
      </section>

      <section className="relative z-10 py-20">
        <InteractiveMap />
      </section>

      <section className="relative z-10 py-20">
        <Usecase />
      </section>

      <section className="relative z-10 bg-gray-100 py-20">
        <WhyRubicr />
      </section>

      <section className="relative z-10 bg-gray-100 py-20">
        <SixStep />
      </section>

      <section className="relative z-10 py-20">
        <ImageToggle />
      </section>

      <section className="relative z-10 py-20">
        <Feedback />
      </section>

      <section className="relative z-10 py-20">
        <OurReach />
      </section>

      <section className="relative z-10 py-20">
        <MediaCoverage />
      </section>

      <section className="relative z-10 bg-[#f6e2cb] py-20 mx-8 md:mx-20 rounded-3xl mb-20">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Started Today</h2>
          <hr className="border-t-2 border-[#64271F] w-1/4 mb-6" />
          <p className="text-lg md:text-2xl mb-8">Ready to transform your ESG Performance?</p>
          <Button label="Begin Your Journey" background="#FFCD1B" color="black" />
        </div>
      </section>

      <Footer />
    </div>
  );
}