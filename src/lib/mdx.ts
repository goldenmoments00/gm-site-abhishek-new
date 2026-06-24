import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content/blogs');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  coverImage: string;
  excerpt: string;
  content: string;
}

export function getPostSlugs() {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs.readdirSync(contentDirectory);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(contentDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      slug: realSlug,
      title: data.title,
      date: data.date,
      author: data.author,
      coverImage: data.coverImage,
      excerpt: data.excerpt,
      content: contentHtml,
    };
  } catch (_error) {
    return null;
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = getPostSlugs();
  const postsPromises = slugs.map((slug) => getPostBySlug(slug));
  const posts = await Promise.all(postsPromises);
  
  // Filter out nulls and sort by date
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
