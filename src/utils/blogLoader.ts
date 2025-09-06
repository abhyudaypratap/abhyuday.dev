import React from 'react';
import { Target, Lightbulb, BookOpen, Code2, Database, Globe } from 'lucide-react';
import { getAllPostContents } from './postContent';

export interface BlogPostMeta {
  title: string;
  slug: string;
  color: string;
  icon: React.ReactElement;
  excerpt: string;
  date: string;
  category: 'writing' | 'tech';
  tags: string[];
  year: number;
}

// Icon mapping for different topics
const getIcon = (slug: string, tags: string[] = []): React.ReactElement => {
  const allKeywords = [slug, ...tags].join(' ').toLowerCase();
  if (allKeywords.includes('copywriting')) return React.createElement(Target, { className: "w-12 h-12 text-white" });
  if (allKeywords.includes('product')) return React.createElement(Lightbulb, { className: "w-12 h-12 text-white" });
  if (allKeywords.includes('history')) return React.createElement(BookOpen, { className: "w-12 h-12 text-white" });
  if (allKeywords.includes('api') || allKeywords.includes('nodejs') || allKeywords.includes('typescript')) return React.createElement(Code2, { className: "w-12 h-12 text-white" });
  if (allKeywords.includes('threejs') || allKeywords.includes('3d')) return React.createElement(Globe, { className: "w-12 h-12 text-white" });
  if (allKeywords.includes('machine-learning') || allKeywords.includes('ml') || allKeywords.includes('ai')) return React.createElement(Database, { className: "w-12 h-12 text-white" });
  return React.createElement(BookOpen, { className: "w-12 h-12 text-white" });
};

// Color mapping for different topics
const getColor = (slug: string, tags: string[] = []): string => {
  const allKeywords = [slug, ...tags].join(' ').toLowerCase();
  if (allKeywords.includes('copywriting')) return 'bg-red-600';
  if (allKeywords.includes('product')) return 'bg-indigo-600';
  if (allKeywords.includes('history')) return 'bg-blue-600';
  if (allKeywords.includes('api') || allKeywords.includes('nodejs') || allKeywords.includes('typescript')) return 'bg-emerald-600';
  if (allKeywords.includes('threejs') || allKeywords.includes('3d')) return 'bg-purple-600';
  if (allKeywords.includes('machine-learning') || allKeywords.includes('ml') || allKeywords.includes('ai')) return 'bg-orange-600';
  return 'bg-gray-600';
};

// Simple frontmatter parser for browser environment
const parseFrontmatter = (content: string): { data: Record<string, any>; content: string } => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const frontmatterStr = match[1];
  const markdownContent = match[2];
  
  // Simple YAML-like parser for basic key-value pairs
  const data: Record<string, any> = {};
  const lines = frontmatterStr.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = trimmed.substring(0, colonIndex).trim();
    let value = trimmed.substring(colonIndex + 1).trim();
    
    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    // Handle arrays (basic support for tags)
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.slice(1, -1);
      if (arrayContent.trim()) {
        data[key] = arrayContent.split(',').map(item => 
          item.trim().replace(/^["']|["']$/g, '')
        );
      } else {
        data[key] = [];
      }
    } else {
      data[key] = value;
    }
  }
  
  return { data, content: markdownContent };
};

// Function to extract metadata from markdown frontmatter
export const parseMarkdownMetadata = (content: string, slug: string, category: 'writing' | 'tech'): BlogPostMeta => {
  const parsedMatter = parseFrontmatter(content);
  const { data: frontmatter, content: markdownContent } = parsedMatter;
  
  const title = frontmatter.title || slug.replace(/-/g, ' ');
  const excerpt = frontmatter.excerpt || (markdownContent.substring(0, 150) + '...');
  const date = frontmatter.date || '2024-01-01';
  const tags = frontmatter.tags || [];
  const year = new Date(date).getFullYear();
  
  const icon = getIcon(slug, tags);
  const color = getColor(slug, tags);
  
  return { title, slug, color, icon, excerpt, date, category, tags, year };
};

// Function to load all blog post metadata for a category (synchronous)
export const loadBlogPosts = (category: 'writing' | 'tech'): BlogPostMeta[] => {
  const posts: BlogPostMeta[] = [];
  const categoryPosts = getAllPostContents(category);
  
  if (!categoryPosts) {
    return [];
  }

  for (const [slug, content] of Object.entries(categoryPosts)) {
    const metadata = parseMarkdownMetadata(content, slug, category);
    posts.push(metadata);
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};