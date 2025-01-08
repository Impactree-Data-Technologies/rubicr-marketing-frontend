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
      {/* Navigation */}
      <Navbar/>
      
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

      {/* ESG Definition Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white">
  <div className="max-w-7xl mx-auto px-4">
    {/* First Row */}
    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
      <div>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Environmental Impact
        </h2>
        <p className="text-gray-600 mb-6">
          We help organizations measure, manage, and minimize their environmental footprint through comprehensive strategies and innovative solutions. Our approach covers carbon emissions, waste management, and resource efficiency.
        </p>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-blue-600">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Key Features</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Carbon footprint measurement and reduction</li>
            <li>• Sustainable resource management</li>
            <li>• Environmental compliance and reporting</li>
          </ul>
        </div>
      </div>
      <div className="relative p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl"></div>
        <img 
          src="/environmental-impact.svg" 
          alt="Environmental Impact" 
          className="relative w-full h-auto rounded-xl"
        />
      </div>
    </div>

    {/* Second Row */}
    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
      <div className="order-2 md:order-1 relative p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl"></div>
        <img 
          src="/social-responsibility.svg" 
          alt="Social Responsibility" 
          className="relative w-full h-auto rounded-xl"
        />
      </div>
      <div className="order-1 md:order-2">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Social Responsibility
        </h2>
        <p className="text-gray-600 mb-6">
          Foster inclusive workplace cultures and strengthen community relationships through comprehensive social impact programs. We help organizations build sustainable relationships with stakeholders.
        </p>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-green-600">
          <h3 className="text-xl font-semibold text-green-600 mb-2">Core Areas</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Diversity and inclusion initiatives</li>
            <li>• Community engagement programs</li>
            <li>• Employee well-being strategies</li>
          </ul>
        </div>
      </div>
    </div>

    {/* Third Row */}
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Corporate Governance
        </h2>
        <p className="text-gray-600 mb-6">
          Implement robust governance frameworks that promote transparency, accountability, and ethical business practices. Our solutions help organizations build trust with stakeholders.
        </p>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-purple-600">
          <h3 className="text-xl font-semibold text-purple-600 mb-2">Focus Areas</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Board effectiveness and diversity</li>
            <li>• Risk management frameworks</li>
            <li>• Ethical business practices</li>
          </ul>
        </div>
      </div>
      <div className="relative p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl"></div>
        <img 
          src="/corporate-governance.svg" 
          alt="Corporate Governance" 
          className="relative w-full h-auto rounded-xl"
        />
      </div>
    </div>
  </div>
</section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "ESG Strategy Development",
                description: "Comprehensive strategy planning and implementation",
                icon: "📊"
              },
              {
                title: "Sustainability Reporting",
                description: "Detailed environmental impact assessment and reporting",
                icon: "📈"
              },
              {
                title: "Risk Management",
                description: "Identifying and mitigating ESG-related risks",
                icon: "🛡️"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
  <div className="max-w-4xl mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
      <p className="text-gray-600">Let's discuss how we can help transform your business</p>
    </div>
    
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-100 border-b border-green-200 text-green-700 text-center">
          <p className="font-medium">Thank you! Your message has been sent successfully.</p>
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="p-4 bg-red-100 border-b border-red-200 text-red-700 text-center">
          <p className="font-medium">Oops! There was an error. Please try again.</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
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
              className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${errors.lastName ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
              placeholder="Doe"
            />
            {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
          </div>
        </div>

        <div className="mt-6 space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Business email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
            placeholder="john@company.com"
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        </div>

        <div className="mt-6 space-y-1">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
          <div className="flex">
            <select className="px-4 py-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-gray-500 sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200">
              <option>+91</option>
            </select>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`flex-1 px-4 py-3 rounded-r-lg bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
              placeholder="123-456-7890"
            />
          </div>
          {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div className="mt-6 space-y-1">
          <label htmlFor="interests" className="text-sm font-medium text-gray-700">
            What are you interested in?
          </label>
          <textarea
            id="interests"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 h-32"
            placeholder="Tell us about your interests..."
            maxLength={3000}
          ></textarea>
          <p className="text-right text-sm text-gray-500">{formData.interests.length}/3000</p>
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg font-semibold transform transition duration-200 hover:scale-[1.02]"
        >
          Send Message
        </button>
      </form>
    </div>
  </div>
</section>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default LandingPage;