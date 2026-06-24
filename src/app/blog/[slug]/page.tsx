import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PillNavbar from "@/components/PillNavbar";
import Footer from "@/components/Footer";
import { nyghtSerif, morganite } from "@/lib/fonts";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { Calendar, ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return { title: "Post Not Found | Golden Moment" };
  }

  return {
    title: `${post.title} | Golden Moment Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PillNavbar />
      <article className="relative min-h-screen bg-[#FAFAFA]">
        <div className="pb-32">
        {/* Grain Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />

        {/* Hero Section */}
        <div className="relative pt-40 pb-16 px-6 sm:px-12 md:px-24 flex flex-col items-center text-center z-10 max-w-4xl mx-auto">
          <Link href="/blog" className="flex items-center gap-2 text-[#8a1212] font-semibold uppercase tracking-wider mb-8 hover:opacity-70 transition-opacity">
            <ArrowLeft size={16} /> Back to Journal
          </Link>
          <div className="flex items-center gap-3 text-sm text-[#1a1a1a]/60 font-semibold uppercase tracking-wider mb-6">
            <Calendar size={16} />
            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="w-1 h-1 rounded-full bg-[#8a1212]"></span>
            <span>By {post.author}</span>
          </div>
          <h1 className={`${nyghtSerif.className} text-5xl md:text-6xl lg:text-7xl text-[#1a1a1a] leading-[1.1] mb-12`}>
            {post.title}
          </h1>
        </div>

        {/* Cover Image */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-12 mb-16 md:mb-24">
          <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[800px] mx-auto px-6 sm:px-12">
          <div 
            className="prose prose-lg prose-stone max-w-none prose-headings:font-light prose-h2:text-4xl prose-h3:text-3xl prose-p:leading-relaxed prose-a:text-[#8a1212] prose-strong:text-[#8a1212]"
            style={{ fontFamily: "Inter, sans-serif" }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
        </div>
        <Footer />
      </article>
    </>
  );
}
