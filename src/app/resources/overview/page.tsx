import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../../Components/navbar';
import Link from 'next/link';
import Footer from "../../Components/footer";
import Button from "../../Components/button";


const ResourcesOverview: React.FC = () => {
  return (
    <>
      <Head>
        <title>Resources Overview | Your Company Name</title>
        <meta name="description" content="Get an overview of our sustainability resources." />
      </Head>
      <div className="min-h-screen flex flex-col">
        {/* Full-screen header section */}
        <div className="relative h-screen bg-yellow-50">
          <Navbar className="absolute top-0 left-0 right-0 z-10" />
          <div className="h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="pr-4">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">Resources Overview</h1>
                  <p className="text-lg text-gray-700">
                    Explore our comprehensive collection of sustainability resources designed to empower your organization. From case studies to expert insights, we provide the tools and knowledge to drive positive change.
                  </p>
                </div>
                <div className="mt-8 md:mt-0 h-64 md:h-96 relative">
                  <Image
                    src="/blog.jpg"
                    alt="Resources Overview"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Getting started with ESG section */}
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Getting started with ESG</h2>
            <p className="text-lg text-gray-700 mb-8">Explainer articles to support your ESG and sustainability knowledge journey.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ResourceCard
                type="Learn Article"
                title="What is ESG Reporting?"
                description="ESG reporting is the disclosure of information about business operations in relation to environmental, social and governance (ESG) areas of the business."
                link="#"
              />
              <ResourceCard
                type="Learn Article"
                title="What are ESG reporting frameworks?"
                description="ESG reporting frameworks are used by companies to publicly report detailed performance, opportunity and risk data related to ESG."
                link="#"
              />
              <ResourceCard
                type="Video"
                title="What is ESG data?"
                description="In this video we explain what ESG data is, what makes it so different from other data sets, and what to consider when you capture, manage and report on ESG data."
                link="#"
                duration="4:20"
              />
              <ResourceCard
                type="Learn Article"
                title="What is carbon accounting?"
                description="GHG accounting or carbon accounting is the process of quantifying the greenhouse gases produced directly or indirectly from a company, across Scopes 1, 2 and 3."
                link="#"
              />
              <ResourceCard
                type="Learn Article"
                title="What is net zero?"
                description="The point at which greenhouse gases going into the atmosphere are balanced by an equivalent amount removed from the atmosphere."
                link="#"
              />
              <ResourceCard
                type="Learn Article"
                title="What is decarbonization?"
                description="A method of climate change mitigation that reduces greenhouse gas (GHG) emissions, as well as removing them from the atmosphere."
                link="#"
              />
            </div>
          </div>
        </div>

        {/* Articles on ESG regulations and reporting frameworks section */}
        <div className="bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Articles on ESG regulations and reporting frameworks</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RegulationCard
                image="/gri-image.jpg"
                title="GRI"
                description="Global Reporting Initiative"
                link="#"
              />
              <RegulationCard
                image="/secr-image.jpg"
                title="SECR"
                description="Streamlined Energy and Carbon Reporting"
                link="#"
              />
              <RegulationCard
                image="/scdda-image.jpg"
                title="SCDDA"
                description="German Supply Chain Due Diligence Act"
                link="#"
              />
            </div>

            <div className="mt-8 flex justify-center">
              <nav className="inline-flex">
                <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  &lt;
                </button>
                <button className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700">
                  3 / 4
                </button>
                <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  &gt;
                </button>
              </nav>
            </div>
          </div>
        </div>

        <section className="bg-[#f6e2cb] py-20 mx-8 md:mx-20 rounded-3xl mb-20 mt-20">
                <div className="max-w-screen-xl mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Started Today</h2>
                    <hr className="border-t-2 border-[#64271F] w-1/4 mb-6" />
                    <p className="text-lg md:text-2xl mb-8">Ready to transform your ESG Performance?</p>
                    <Button label="Contact Us" background="#FFCD1B" color="black" />
                </div>
            </section>

            <Footer />
      </div>
    </>
  );
};

interface ResourceCardProps {
  type: string;
  title: string;
  description: string;
  link: string;
  duration?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ type, title, description, link, duration }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <p className="text-sm text-gray-600 mb-2">{type}</p>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <Link href={link} className="text-blue-600 hover:text-blue-800 font-medium">
        {type === 'Video' ? `Watch video ${duration}` : 'Read article'} →
      </Link>
    </div>
  );
};

interface RegulationCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

const RegulationCard: React.FC<RegulationCardProps> = ({ image, title, description, link }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="h-48 relative">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <Link href={link} className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
          Read article
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ResourcesOverview;