"use client"
import React, { useState } from 'react';
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import Button from "../Components/button";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interests: string;
}

const LandingPage: React.FC = () => {
  // ... (previous state and handlers remain the same)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interests: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center pt-16">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Transform Your Business with ESG Excellence
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Drive sustainable growth and create lasting impact with our comprehensive ESG solutions
            </p>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Split Content Section */}
      <div className="flex flex-col lg:flex-row bg-white">
        {/* Left Content Side */}
        <div className="w-full lg:w-1/2 p-8 lg:p-16">
          {/* ESG Sections */}
          <div className="space-y-16">
            {/* Environmental Section */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Environmental Impact
              </h2>
              <p className="text-gray-600 mb-6">
                We help organizations measure, manage, and minimize their environmental footprint through comprehensive strategies and innovative solutions.
              </p>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-600">
                <ul className="space-y-2 text-gray-600">
                  <li>• Carbon footprint measurement and reduction</li>
                  <li>• Sustainable resource management</li>
                  <li>• Environmental compliance and reporting</li>
                </ul>
              </div>
            </div>

            {/* Social Section */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Social Responsibility
              </h2>
              <p className="text-gray-600 mb-6">
                Foster inclusive workplace cultures and strengthen community relationships through comprehensive social impact programs.
              </p>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-600">
                <ul className="space-y-2 text-gray-600">
                  <li>• Diversity and inclusion initiatives</li>
                  <li>• Community engagement programs</li>
                  <li>• Employee well-being strategies</li>
                </ul>
              </div>
            </div>

            {/* Governance Section */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Corporate Governance
              </h2>
              <p className="text-gray-600 mb-6">
                Implement robust governance frameworks that promote transparency, accountability, and ethical business practices.
              </p>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-600">
                <ul className="space-y-2 text-gray-600">
                  <li>• Board effectiveness and diversity</li>
                  <li>• Risk management frameworks</li>
                  <li>• Ethical business practices</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="w-full lg:w-1/2 p-8 lg:p-16">
          <div className="w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-600">Lets discuss how we can help transform your business</p>
            </div>

            {submitStatus === 'success' && (
              <div className="p-4 mb-6 bg-green-100 rounded-lg text-green-700 text-center">
                <p className="font-medium">Thank you! Your message has been sent successfully.</p>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-4 mb-6 bg-red-100 rounded-lg text-red-700 text-center">
                <p className="font-medium">Oops! There was an error. Please try again.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
                </div>

                <div className="space-y-1">
                  <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white border ${errors.lastName ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Business email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="john@company.com"
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
                <div className="flex">
                  <select className="px-4 py-3 rounded-l-lg border border-r-0 border-gray-200 bg-white text-gray-500 sm:text-sm">
                    <option>+91</option>
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`flex-1 px-4 py-3 rounded-r-lg bg-white border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="123-456-7890"
                  />
                </div>
                {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="interests" className="text-sm font-medium text-gray-700">
                  What are you interested in?
                </label>
                <textarea
                  id="interests"
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                  placeholder="Tell us about your interests..."
                  maxLength={3000}
                ></textarea>
                <p className="text-right text-sm text-gray-500">{formData.interests.length}/3000</p>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg font-semibold transform transition hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;