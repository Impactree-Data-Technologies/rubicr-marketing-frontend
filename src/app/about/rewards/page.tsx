import { useState } from 'react';
import Navbar from "../../Components/navbar";
import Footer from "../../Components/footer";
import Button from "../../Components/button";

const timelineData = [
  {
    year: '2024',
    titles: [
      'World trade centre - Women Achiever Award',
      'Republic India women summit and Awards',
    ]
  },
  {
    year: '2023',
    titles: [
      'Our founder and CEO was awarded as an Upcoming Entrepreneur by FICCI FLO Chennai',
      'CNBC Future Female Forward Award',
      'Equality Lounge G 20 speaker - 2023'
    ]
  },
  {
    year: '2022',
    titles: [
      'One of 8 entrepreneurs who represented Tamil Nadu at the World Economic Forum in 2022 at Davos, Switzerland',
      'Our founder and CEO Rajashri Sai was among the top 75 women entrepreneurs recognized by NITI Aayog',
      'Rajashri Sai, was awarded as one of the top ten women entrepreneurs by AIC GUSEC for herSTART - National Digital Platform for Women Entrepreneurs, in the presence of President of India, Shrimati Droupadi Murmu, and the Governor of Gujarat, Shri. Acharya Devvrat',
      'Impactree was recognized by BLL - BSE India as one of the top emerging startups in the country'
    ]
  },
  {
    year: '2021',
    titles: [
      "In 2021, under Impactree's leadership, The Hunger Collective triumphed over 20,000+ applicants nationwide. The distinguished accolade was presented by renowned figures such as Dr. Philip Kotler, Dr. Bishnow Parajuli from the World Food Programme, and Dr. Amitabh Kant from Niti Ayog",
      'Grant Award by Atal Incubation Centre- RMP at Gujarat University'
    ]
  },
  {
    year: '2019',
    titles: [
      'Recognized as one of the top three promising enterprises by London Business School(Dubai)',
    ]
  },
  {
    year: '2018',
    titles: [
      'Rajashri Sai served as the Asian speaker at a session held by the US Chamber of Commerce and the United Nations Commission for Women',
      'Top 7 women entrepreneurs transforning India - International Visitor leadership programme',
    ]
  },
];

export default function RewardsRecognition() {
  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-r from-yellow-100 to-gray-100 min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-center text-gray-800 mb-16 mt-16">
            Rewards & Recognition
          </h1>

          {/* Mobile and Desktop Timeline */}
          <div className="relative">
            {/* Mobile Timeline (Stacked) */}
            <div className="block md:hidden">
              {timelineData.map((item, index) => (
                <div key={index} className="mb-8 relative pl-6">
                  {/* Vertical Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500 rounded-full"></div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-0 w-4 h-4 bg-yellow-500 rounded-full -ml-1.5"></div>
                  
                  {/* Content Card */}
                  <div className="ml-4 bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-yellow-700 mb-3">{item.year}</h2>
                    <ul className="space-y-2">
                      {item.titles.map((title, idx) => (
                        <li 
                          key={idx} 
                          className="text-gray-700 text-base relative pl-4 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-yellow-500 before:rounded-full"
                        >
                          {title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Timeline (Alternating) */}
            <div className="hidden md:block">
              {/* Vertical Line */}
              <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-yellow-500 rounded-full"></div>

              {timelineData.map((item, index) => (
                <div 
                  key={index} 
                  className={`mb-12 flex items-center ${
                    index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Left/Right Side Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8 text-left' : 'pr-8 text-right'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                      <h2 className="text-2xl font-bold text-yellow-700 mb-4">{item.year}</h2>
                      <ul className={`${index % 2 === 0 ? 'pl-4' : 'pr-4'}`}>
                        {item.titles.map((title, idx) => (
                          <li 
                            key={idx} 
                            className={`text-gray-700 text-lg mb-2 relative 
                              ${index % 2 === 0 ? 'pl-4' : 'pr-4'}
                              before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-yellow-500 before:rounded-full`
                            }
                          >
                            {title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex-shrink-0"></div>

                  {/* Empty Space */}
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action Section */}
      <div className="py-10">
        <section className="bg-gradient-to-r from-yellow-500 to-yellow-700 py-12 md:py-20 mx-4 md:mx-20 rounded-3xl mb-10 md:mb-20 shadow-2xl">
          <div className="max-w-screen-xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-white">Get Started Today</h2>
            <hr className="border-t-2 border-white w-24 mx-auto mb-4 md:mb-6" />
            <p className="text-base md:text-2xl mb-6 md:mb-8 text-white px-4">Ready to transform your ESG Performance?</p>
            <Button 
              label="Schedule a demo" 
              background="#FFCD1B" 
              color="white" 
              href="/contact-us" 
            />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}