"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Footer from "../Components/footer";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const LandingPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    let newErrors: Partial<FormData> = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendToStrapi = async (data: FormData) => {
    try {
      const response = await fetch(`${BASE_URL}/api/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) throw new Error('Failed to submit form');
      const result = await response.json();
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      await sendToStrapi(formData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
      
      {/* Logo Header */}
      <div className="relative z-10 px-6 py-4 bg-slate-800/50 border-b border-slate-700/50">
        <Link href="/" className="inline-block">
          <img 
            src="/white_logo.png"
            alt="Company Logo" 
            className="h-8 w-auto hover:opacity-80 transition-opacity"
          />
        </Link>
      </div>
      
      {/* Hero Section - Split Content */}
      <div className="relative flex flex-col lg:flex-row overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none"></div>
        
        {/* Left Content Side */}
        <div className="w-full lg:w-1/2 p-6 lg:p-12 flex items-center mt-8 relative">
          <div className="absolute top-0 left-0 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-bg-amber-500-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          
          <div className="max-w-lg mx-auto relative">
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Drive Sustainability & Profitability <span className="bg-clip-text text-transparent bg-amber-500">with Rubicr</span>
            </h1>
            
            <p className="text-lg text-slate-300 mb-8">
              Join worlds leading AI-powered ESG platform like Autoline, TVS, Fine Organics in leveraging sustainability software to cut costs, enhance supply chain transparency, and drive innovation.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <span className="text-emerald-400 text-xl">✅</span>
                <p className="text-slate-300">Cut costs & reduce waste through data-driven efficiency</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-emerald-400 text-xl">✅</span>
                <p className="text-slate-300">Gain full visibility into your supply chain for responsible sourcing</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-emerald-400 text-xl">✅</span>
                <p className="text-slate-300">Innovate with sustainable products & stay ahead of regulations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="w-full lg:w-1/2 p-6 lg:p-12 flex items-center relative mt-8">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl"></div>
          <div className="w-full max-w-md mx-auto relative">
            <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>

            {submitStatus === 'success' && (
              <div className="p-4 mb-6 bg-emerald-900/30 backdrop-blur-sm border border-emerald-500/30 rounded-lg">
                <p className="font-medium text-emerald-400">Thank you! Your message has been sent successfully.</p>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-4 mb-6 bg-rose-900/30 backdrop-blur-sm border border-rose-500/30 rounded-lg">
                <p className="font-medium text-rose-400">Oops! There was an error. Please try again.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border ${errors.firstName ? 'border-rose-500/50' : 'border-slate-500/30'} focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-white placeholder-slate-400`}
                    placeholder="First name"
                  />
                  {errors.firstName && <p className="text-sm text-rose-400 mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border ${errors.lastName ? 'border-rose-500/50' : 'border-slate-500/30'} focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-white placeholder-slate-400`}
                    placeholder="Last name"
                  />
                  {errors.lastName && <p className="text-sm text-rose-400 mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border ${errors.email ? 'border-rose-500/50' : 'border-slate-500/30'} focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-white placeholder-slate-400`}
                  placeholder="Business email"
                />
                {errors.email && <p className="text-sm text-rose-400 mt-1">{errors.email}</p>}
              </div>

              <div>
                <div className="flex">
                  <select className="px-3 py-3 rounded-l-lg border border-r-0 border-slate-500/30 bg-white/10 backdrop-blur-sm text-white text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all">
                    <option>+91</option>
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`flex-1 px-4 py-3 rounded-r-lg bg-white/10 backdrop-blur-sm border ${errors.phone ? 'border-rose-500/50' : 'border-slate-500/30'} focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-white placeholder-slate-400`}
                    placeholder="Phone number"
                  />
                </div>
                {errors.phone && <p className="text-sm text-rose-400 mt-1">{errors.phone}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 text-white py-3 rounded-lg hover:from-amber-500 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-800 font-semibold transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-amber-500/25"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-12">
              Why Choose Our <span className="bg-clip-text text-transparent bg-amber-500">ESG Solutions</span>?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Box 1 */}
            <div className="group bg-white/5 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-700/50 hover:border-amber-500/30">
              <div className="h-12 w-12 rounded-lg bg-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-all">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Comprehensive Analysis
              </h3>
              <p className="text-slate-300 group-hover:text-slate-200">
                Our expert team provides detailed ESG assessments, actionable insights, and strategic recommendations tailored to your business needs.
              </p>
            </div>

            {/* Box 2 */}
            <div className="group bg-white/5 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-700/50 hover:border-amber-500/30">
              <div className="h-12 w-12 rounded-lg bg-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-all">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h1m0 4h1m0 4h1m-7 4h7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Industry Expertise
              </h3>
              <p className="text-slate-300 group-hover:text-slate-200">
                With years of experience across various sectors, we understand the unique ESG challenges and opportunities in your industry.
              </p>
            </div>

            {/* Box 3 */}
            <div className="group bg-white/5 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-700/50 hover:border-amber-500/30">
           <div className="h-12 w-12 rounded-lg  bg-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-all">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Sustainable Impact
              </h3>
              <p className="text-slate-300 group-hover:text-slate-200">
                We help you create lasting positive impact through sustainable practices, social responsibility, and effective governance.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;