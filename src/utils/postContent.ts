// Utility to dynamically load blog posts using Vite's import.meta.glob

// --- DYNAMIC IMPORTS FOR ALL BLOG POSTS ---
// Using import.meta.glob to automatically discover all markdown files
// The 'eager: true' option makes these imports synchronous and bundles them at build time
const writingModules = import.meta.glob('../data/posts/writing/*.md', { 
  eager: true, 
  query: '?raw',
  import: 'default'
}) as Record<string, string>;

const techModules = import.meta.glob('../data/posts/tech/*.md', { 
  eager: true, 
  query: '?raw',
  import: 'default'
}) as Record<string, string>;

// Helper function to convert file path to slug
const pathToSlug = (path: string): string => {
  const fileName = path.split('/').pop()?.replace('.md', '') || '';
  // Convert underscores to hyphens for URL-friendly slugs
  return fileName.replace(/_/g, '-');
};

// Helper function to build content mapping from glob results
const buildContentMap = (modules: Record<string, string>): Record<string, string> => {
  const contentMap: Record<string, string> = {};
  
  for (const [path, content] of Object.entries(modules)) {
    const slug = pathToSlug(path);
    contentMap[slug] = content;
  }
  
  return contentMap;
};

// --- POST MAPPING ---
// This structure maps categories and slugs to the dynamically imported content.
const postContents: Record<string, Record<string, string>> = {
  writing: buildContentMap(writingModules),
  tech: buildContentMap(techModules),
};

// Function to get the raw content of a specific post
export const getPostContent = (category: string, slug: string): string | undefined => {
  if (postContents[category] && postContents[category][slug]) {
    return postContents[category][slug];
  }
  return undefined;
};

export const getAllPostContents = (category: string): Record<string, string> | undefined => {
  return postContents[category];
};

// Helper function to get all available slugs for a category
export const getAvailableSlugs = (category: string): string[] => {
  const categoryPosts = postContents[category];
  return categoryPosts ? Object.keys(categoryPosts) : [];
};

// Helper function to get all categories
export const getAvailableCategories = (): string[] => {
  return Object.keys(postContents);
};
