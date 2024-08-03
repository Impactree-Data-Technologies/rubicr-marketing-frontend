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

async function getPost(id: string): Promise<{ data: Post }> {
  const res = await fetch(`${BASE_URL}/api/posts/${id}?populate=*`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  return res.json();
}

const RichContent: React.FC<{ content: string }> = ({ content }) => {
  const isHTML = (str: string) => /<[a-z][\s\S]*>/i.test(str);
  const isMarkdown = (str: string) => {
    const mdPatterns = [/^#+\s/, /\*\*.+\*\*/, /\[.+\]\(.+\)/, /```[\s\S]*```/];
    return mdPatterns.some(pattern => pattern.test(str));
  };

  if (isHTML(content)) {
    return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />;
  } else if (isMarkdown(content)) {
    return (
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    );
  } else {
    return <p>{content}</p>;
  }
};

export default async function BlogPost({ params }: { params: { id: string } }) {
  const postData = await getPost(params.id);
  const post = postData.data;

  return (
    <>
      <Navbar />
      <div className="bg-[#fdf6f0] min-h-screen pt-24">
        <article className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-0">
          <div className="relative h-96">
            <Image
              src={`${BASE_URL}${post.attributes.image.data[0].attributes.url}`}
              alt={post.attributes.title}
              fill
              style={{objectFit: "cover"}}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-4xl font-bold mb-2">{post.attributes.title}</h1>
                <p className="text-lg">
                  {new Date(post.attributes.date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <Link href="/resources/blog" className="text-[#ff6600] hover:underline mb-6 inline-block">
              ← Back to Blog
            </Link>
            <div className="mt-4 mb-8">
              <span className="bg-[#f0e0d0] text-[#ff6600] px-3 py-1 rounded-full text-sm font-semibold">
                {post.attributes.category}
              </span>
            </div>
            <div className="prose max-w-none">
              <RichContent content={post.attributes.content} />
            </div>
          </div>
        </article>
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
}
