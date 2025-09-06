import { getPostContent } from './postContent';

// Simple frontmatter parser for browser environment (same as in blogLoader.ts)
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

export interface MarkdownContent {
  content: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
}

export const loadMarkdownContent = (category: string, slug: string): MarkdownContent | null => {
  try {
    const rawContent = getPostContent(category, slug);
    
    if (!rawContent) {
      return null;
    }
    
    // Parse the frontmatter
    const parsedMatter = parseFrontmatter(rawContent);
    const { data: frontmatter, content: markdownContent } = parsedMatter;
    
    return {
      content: markdownContent,
      title: frontmatter.title || 'Untitled',
      date: frontmatter.date || '2024-01-01',
      tags: frontmatter.tags || [],
      excerpt: frontmatter.excerpt || ''
    };
  } catch (error) {
    return null;
  }
};
