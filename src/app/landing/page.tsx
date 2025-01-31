"use client"
import React, { useState } from 'react';
import Navbar from "../Components/navbar";
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* First Section - Split Content */}
      <div className="flex flex-col lg:flex-row bg-white">
        {/* Left Content Side */}
        <div className="w-full lg:w-1/2 p-6 lg:p-12 flex items-center mt-8">
          <div className="max-w-lg mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Transform Your Business with ESG Solutions
            </h1>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Environmental Impact</h3>
                  <p className="text-gray-600 mt-1">Measure and minimize your environmental footprint</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Social Responsibility</h3>
                  <p className="text-gray-600 mt-1">Foster inclusive workplace cultures</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600 text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Corporate Governance</h3>
                  <p className="text-gray-600 mt-1">Implement robust governance frameworks</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="w-full lg:w-1/2 p-6 lg:p-12 bg-gray-50 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>

            {submitStatus === 'success' && (
              <div className="p-4 mb-6 bg-green-100 rounded-lg text-green-700">
                <p className="font-medium">Thank you! Your message has been sent successfully.</p>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-4 mb-6 bg-red-100 rounded-lg text-red-700">
                <p className="font-medium">Oops! There was an error. Please try again.</p>
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
                    className={`w-full px-4 py-2 rounded-lg bg-white border ${errors.firstName ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="First name"
                  />
                  {errors.firstName && <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg bg-white border ${errors.lastName ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="Last name"
                  />
                  {errors.lastName && <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-white border ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="Business email"
                />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <div className="flex">
                  <select className="px-3 py-2 rounded-l-lg border border-r-0 border-gray-200 bg-white text-gray-500 text-sm">
                    <option>+91</option>
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`flex-1 px-4 py-2 rounded-r-lg bg-white border ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="Phone number"
                  />
                </div>
                {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-semibold transition hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Second Section - Three Boxes */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Why Choose Our ESG Solutions?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Box 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Comprehensive Analysis
              </h3>
              <p className="text-gray-600">
                Our expert team provides detailed ESG assessments, actionable insights, and strategic recommendations tailored to your business needs.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-green-500">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Industry Expertise
              </h3>
              <p className="text-gray-600">
                With years of experience across various sectors, we understand the unique ESG challenges and opportunities in your industry.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-purple-500">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Sustainable Impact
              </h3>
              <p className="text-gray-600">
                We help you create lasting positive impact through sustainable practices, social responsibility, and effective governance.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;