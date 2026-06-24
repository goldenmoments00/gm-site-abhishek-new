import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PillNavbar from "@/components/PillNavbar";
import Footer from "@/components/Footer";
import { nyghtSerif } from "@/lib/fonts";
import { getAllPosts } from "@/lib/mdx";
import { Star, ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Journal | Golden Moment",
  description: "Read the latest stories, wedding photography tips, and inspiration from Golden Moment.",
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await getAllPosts();
  
  // Treat first 2 posts as featured for the layout
  const featuredPosts = posts.slice(0, 2);
  const standardPosts = posts.slice(2);

  return (
    <>
      <PillNavbar />
      <div className="relative min-h-screen bg-[#FAFAFA] font-sans">
        <div className="pt-32 pb-32">
          {/* Header */}
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-24 mb-16 text-center">
          <h1 className={`${nyghtSerif.className} text-4xl md:text-5xl uppercase tracking-widest flex items-center justify-center gap-4`}>
            <span className="text-[#FF4A4A]">BLOGS</span>
          </h1>
        </div>

        {/* Filter Bar */}
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-24 mb-16 flex justify-between items-center text-[11px] sm:text-xs text-[#333333]">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-transparent rounded-full border border-gray-200 hover:border-gray-300 transition-colors">
            Select Blogs Category <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-transparent rounded-full border border-gray-200 hover:border-gray-300 transition-colors">
            Sort by <ChevronDown size={14} className="text-gray-400" />
          </button>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-24">
          {posts.length === 0 ? (
            <div className="text-center py-20 text-[#1a1a1a]/50 text-xl font-light">
              No stories published yet. Check back soon.
            </div>
          ) : (
            <>
              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <div className="flex flex-col gap-16 lg:gap-20 mb-20">
                  {featuredPosts.map(post => (
                    <Link 
                      href={`/blog/${post.slug}`} 
                      key={post.slug}
                      className="group grid grid-cols-1 md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.5fr_1fr] gap-8 md:gap-12 lg:gap-16 items-center"
                    >
                      {/* Image Container */}
                      <div className="relative w-full aspect-video md:aspect-[4/3] lg:aspect-[16/10] rounded-2xl overflow-hidden shadow-sm">
                        {/* Featured Badge */}
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-[#8A6A4B]/80 backdrop-blur-md rounded-full text-white text-[10px] uppercase font-semibold tracking-widest shadow-sm">
                          <Star size={10} className="fill-current" /> featured
                        </div>
                        <Image 
                          src={post.coverImage} 
                          alt={post.title}
                          fill 
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                      
                      {/* Content Container */}
                      <div className="flex flex-col pr-4 lg:pr-12">
                        <h2 className={`${nyghtSerif.className} text-2xl lg:text-3xl text-[#1a1a1a] mb-4 lg:mb-6 leading-snug group-hover:text-[#FF4A4A] transition-colors`}>
                          {post.title}
                        </h2>
                        <p className="text-xs lg:text-sm text-[#1a1a1a]/60 leading-loose font-light">
                          {post.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Standard Posts Grid */}
              {standardPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                  {standardPosts.map(post => (
                    <Link 
                      href={`/blog/${post.slug}`} 
                      key={post.slug}
                      className="group flex flex-col"
                    >
                      {/* Grid Image */}
                      <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 shadow-sm bg-gray-100">
                        <Image 
                          src={post.coverImage} 
                          alt={post.title}
                          fill 
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                      
                      {/* Grid Content */}
                      <h3 className={`${nyghtSerif.className} text-lg text-[#1a1a1a] mb-3 leading-snug group-hover:text-[#FF4A4A] transition-colors`}>
                        {post.title}
                      </h3>
                      <p className="text-[10px] text-[#1a1a1a]/40 tracking-wider">
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
