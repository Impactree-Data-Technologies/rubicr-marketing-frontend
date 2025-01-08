"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DOMPurify from 'isomorphic-dompurify';
import Button from '@/app/Components/button';
import Navbar from '@/app/Components/navbar';
import Footer from '@/app/Components/footer';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface PostAttributes {
  title: string;
  date: string;
  content: string;
  description?: string;
  image: {
    data: Array<{
      attributes: {
        url: string;
      };
    }>;
  };
  category: string;
}

interface Post {
  id: string;
  attributes: PostAttributes;
}

async function getPost(id: string): Promise<{ data: Post } | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/${id}?populate=*`, {
      cache: 'no-store',
      next: { revalidate: 60 }
    });

    if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);
    const data = await res.json();
    
    if (!data?.data?.attributes?.title || !data?.data?.attributes?.content) {
      throw new Error('Invalid post data structure');
    }

    return data;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

const RichContent: React.FC<{ content: string }> = ({ content }) => {
  if (!content) return null;

  const isHTML = (str: string) => /<[a-z][\s\S]*>/i.test(str);
  const isMarkdown = (str: string) => {
    const mdPatterns = [/^#+\s/, /\*\*.+\*\*/, /\[.+\]\(.+\)/, /```[\s\S]*```/];
    return mdPatterns.some(pattern => pattern.test(str));
  };

  if (isHTML(content)) {
    return (
      <div 
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600"
      />
    );
  }
  
  if (isMarkdown(content)) {
    return (
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600"
      >
        {content}
      </ReactMarkdown>
    );
  }
  
  return <p className="text-gray-600 leading-relaxed">{content}</p>;
};

export default async function BlogPost({ params }: { params: { id: string } }) {
  const postData = await getPost(params.id);

  if (!postData) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#fdf6f0] pt-24 px-4">
          <div className="max-w-4xl mx-auto text-center py-16">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you are looking for does not exist or has been removed.</p>
            <Link 
              href="/resources/blog" 
              className="inline-flex items-center text-[#ff6600] hover:underline group"
            >
              <span className="transform transition-transform group-hover:-translate-x-1">←</span>
              <span className="ml-2">Return to Blog</span>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const post = postData.data;
  const imageUrl = post.attributes.image?.data?.[0]?.attributes?.url;

  return (
    <>
      <Navbar />
      <div className="bg-[#fdf6f0] min-h-screen pt-24">
        <article className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden mb-0">
          {/* Hero Image Section */}
          {imageUrl && (
            <div className="relative h-[60vh] max-h-[600px]">
              <Image
                src={`${BASE_URL}${imageUrl}`}
                alt={post.attributes.title}
                fill
                priority
                style={{objectFit: "cover"}}
                className="transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 flex items-end">
                <div className="p-8 md:p-12 text-white w-full">
                  <div className="max-w-3xl mx-auto">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <span className="bg-[#ff6600] px-4 py-1.5 rounded-full text-sm font-medium">
                        {post.attributes.category}
                      </span>
                      <time className="text-gray-200 text-sm">
                        {new Date(post.attributes.date).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </time>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                      {post.attributes.title}
                    </h1>
                    {post.attributes.description && (
                      <p className="text-lg text-gray-200 leading-relaxed">
                        {post.attributes.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Content Section */}
          <div className="p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
              <div className="mb-12 flex items-center justify-between">
                <Link 
                  href="/resources/blog" 
                  className="inline-flex items-center text-[#ff6600] hover:text-[#ff8533] transition-colors group"
                >
                  <span className="transform transition-transform group-hover:-translate-x-1">←</span>
                  <span className="ml-2 font-medium">Back to Blog</span>
                </Link>
                <span className="bg-[#f0e0d0] text-[#ff6600] px-4 py-1.5 rounded-full text-sm font-medium">
                  {post.attributes.category}
                </span>
              </div>
              
              <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-[#ff6600] prose-a:no-underline hover:prose-a:text-[#ff8533]">
                <RichContent content={post.attributes.content} />
              </div>
            </div>
          </div>
        </article>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-[#f6e2cb] to-[#fdf6f0] py-20 mx-8 md:mx-20 rounded-3xl my-20">
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
      </div>
    </>
  );
}