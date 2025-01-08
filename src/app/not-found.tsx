"use client"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { MoveLeft, HomeIcon } from 'lucide-react';

const Navbar = dynamic(() => import("./Components/navbar"), {
  loading: () => <div className="h-16 bg-white" />
});

const Footer = dynamic(() => import("./Components/footer"), {
  loading: () => <div className="h-20 bg-gray-100" />
});

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 py-16 mt-6">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-50 rounded-full -translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-50 rounded-full translate-x-16 translate-y-16" />
            
            {/* Main content */}
            <div className="relative">
              <h1 className="text-7xl md:text-8xl font-bold text-blue-600 mb-4 animate-bounce">
                404
              </h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
                Oops! Page Not Found
              </h2>
              <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
                The page you are looking for might have been removed or is temporarily unavailable.
              </p>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => router.back()}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-100 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200 transition-all duration-300 group"
                >
                  <MoveLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Go Back
                </button>
                <Link
                  href="/"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 group"
                >
                  <HomeIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}