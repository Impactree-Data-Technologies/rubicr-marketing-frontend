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
  "ESG Insights & Analysis",
  "Sustainable Business Strategies",
  "Green Tech & Innovation",
  "Climate Action & Advocacy",
  "Social Impact & Corporate Responsibility"
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
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
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
        setError("Failed to fetch posts. Please check your network connection and try again.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "ALL") {
      return posts;
    }
    return posts.filter(post => post.category === selectedCategory);
  }, [selectedCategory, posts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>;
  if (posts.length === 0) return <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">No posts found.</div>;

  const latestPost = posts[0];

  return (
    <>
      <Navbar />
      
      <section className="bg-[#f6f5f5] p-6 md:p-12 lg:p-24 py-24">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-6 md:p-8">
            <span className="inline-block bg-[#ff6600] text-white text-xs px-2 py-1 rounded-full uppercase tracking-wide mb-4">LATEST POST</span>
            <div className="flex items-center mb-4 space-x-2">
              <span className="text-sm text-gray-600">
                {latestPost.date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <span className="inline-block bg-[#f0e0d0] text-gray-700 text-xs px-2 py-1 rounded-full">{latestPost.category}</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              {latestPost.title}
            </h1>
            <p className="text-sm md:text-base leading-relaxed mb-8">
              {latestPost.description}
            </p>
            <Link href={`/resources/blog/${latestPost.id}`} className="text-[#ff6600] font-bold hover:underline">
              Learn More <span className="ml-2">→</span>
            </Link>
          </div>
          <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
            <Image
              src={`${BASE_URL}${latestPost.image}`}
              alt={latestPost.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#fdf6f0] p-6 md:p-12 lg:p-24">
        <nav className="mb-8">
          <ul className="flex flex-wrap gap-4 text-sm">
            {categories.map((category) => (
              <li 
                key={category}
                className={`cursor-pointer ${selectedCategory === category ? 'font-bold' : ''}`}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
              >
                <span className={`px-3 py-1 rounded-full ${selectedCategory === category ? 'bg-[#ff6600] text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {category}
                </span>
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.map((post) => (
            <Link href={`/resources/blog/${post.id}`} key={post.id} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                <div className="relative h-48">
                  <Image src={`${BASE_URL}${post.image}`} alt={post.title} layout="fill" objectFit="cover" />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <p className="text-sm text-gray-500 mb-2">
                    {post.date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">{post.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="inline-block bg-[#e7e7e6] text-gray-700 text-xs px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    {post.id === latestPost.id && (
                      <span className="inline-block bg-[#ff6600] text-white text-xs px-2 py-1 rounded-full">
                        Latest
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === i + 1 ? 'bg-[#ff6600] text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>


      <section className="bg-[#f6e2cb] py-20 mx-8 md:mx-20 rounded-3xl mb-20 mt-20">
                <div className="max-w-screen-xl mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Started Today</h2>
                    <hr className="border-t-2 border-[#64271F] w-1/4 mb-6" />
                    <p className="text-lg md:text-2xl mb-8">Ready to transform your ESG Performance?</p>
                    <Button label="Contact Us" background="#FFCD1B" color="black" />
                </div>
            </section>

            <Footer />
    </>
  );
};

export default LatestPost;