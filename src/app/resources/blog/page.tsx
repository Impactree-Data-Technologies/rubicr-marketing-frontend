"use client"
import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from "../../Components/navbar";
import Footer from "../../Components/footer";
import Button from "../../Components/button";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface Post {
  id: number;
  date: Date;
  title: string;
  description: string;
  category: string;
  image: string;
}

const categories = [
  "ALL",
] as const;

type Category = typeof categories[number];

const LatestPost: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>("ALL");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/posts?populate=*&sort=date:desc`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        setPosts(data.data.map((post: any) => ({
          id: post.id,
          date: new Date(post.attributes.date),
          title: post.attributes.title,
          description: post.attributes.description,
          category: post.attributes.category,
          image: post.attributes.image.data?.[0]?.attributes.url
        })));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to fetch posts. Please try again later.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return selectedCategory === "ALL" ? posts : posts.filter(post => post.category === selectedCategory);
  }, [selectedCategory, posts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Updated paginate function with proper type casting
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Get the posts section element and cast it to HTMLElement
    const postsSection = document.querySelector('.bg-[#fdf6f0]') as HTMLElement;
    if (postsSection) {
      window.scrollTo({
        top: postsSection.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#ff6600]"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-8 py-4 rounded-lg shadow-md">
        <p className="font-medium">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 text-sm text-red-600 hover:text-red-800 underline"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  if (posts.length === 0) return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-blue-100 border border-blue-400 text-blue-700 px-8 py-4 rounded-lg shadow-md">
        <p className="font-medium">No posts available at the moment.</p>
      </div>
    </div>
  );

  const latestPost = posts[0];

  return (
    <>
      <Navbar />
      
      {/* Hero Section with Latest Post */}
      <section className="bg-gradient-to-br from-[#f6f5f5] to-[#fdf6f0] p-6 md:p-12 lg:p-24 py-24">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row transform transition-transform hover:scale-[1.02] duration-300">
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="space-y-6">
              <span className="inline-block bg-[#ff6600] text-white text-xs px-4 py-2 rounded-full uppercase tracking-wider font-semibold">
                Latest Post
              </span>
              <div className="flex items-center space-x-4">
                <time className="text-sm text-gray-600">
                  {latestPost.date.toLocaleDateString('en-US', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </time>
                <span className="inline-block bg-[#f0e0d0] text-[#ff6600] text-sm px-4 py-1 rounded-full font-medium">
                  {latestPost.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {latestPost.title}
              </h1>
              <p className="text-gray-600 leading-relaxed">
                {latestPost.description}
              </p>
              <Link 
                href={`/resources/blog/${latestPost.id}`} 
                className="inline-flex items-center text-[#ff6600] font-semibold hover:text-[#ff8533] transition-colors group"
              >
                Read More 
                <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-[400px] md:h-auto relative overflow-hidden">
            <Image
              src={`${BASE_URL}${latestPost.image}`}
              alt={latestPost.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 hover:scale-110"
            />
          </div>
        </div>
      </section>

      {/* Blog Posts Grid Section */}
      <section className="bg-[#fdf6f0] p-6 md:p-12 lg:p-24">
        {/* Category Navigation */}
        <nav className="mb-12">
          <ul className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category 
                      ? 'bg-[#ff6600] text-white shadow-lg transform -translate-y-0.5' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <Link 
              href={`/resources/blog/${post.id}`} 
              key={post.id} 
              className="group"
            >
              <article className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <Image 
                    src={`${BASE_URL}${post.image}`} 
                    alt={post.title} 
                    layout="fill" 
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <time className="text-sm text-gray-500">
                      {post.date.toLocaleDateString('en-US', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </time>
                    {post.id === latestPost.id && (
                      <span className="inline-block bg-[#ff6600] text-white text-xs px-3 py-1 rounded-full">
                        Latest
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#ff6600] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {post.description}
                  </p>
                  <div className="mt-auto">
                    <span className="inline-block bg-[#f0e0d0] text-[#ff6600] text-sm px-4 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {filteredPosts.length > postsPerPage && (
          <div className="mt-12 flex justify-center space-x-2">
            {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentPage === i + 1
                    ? 'bg-[#ff6600] text-white shadow-md transform -translate-y-0.5'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#f6e2cb] to-[#fdf6f0] py-20 mx-8 md:mx-20 rounded-3xl mb-20 mt-20">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Started Today</h2>
          <div className="h-1 w-24 bg-[#64271F] mx-auto mb-6"></div>
          <p className="text-lg md:text-2xl mb-8">Ready to transform your ESG Performance?</p>
          <Button 
            label="Contact Us" 
            background="#FFCD1B" 
            href="/contact-us"
            color="black" 
          />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LatestPost;