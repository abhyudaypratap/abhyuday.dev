import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { useState, useEffect } from 'react';
import { loadBlogPosts, BlogPostMeta } from '../utils/blogLoader';
import { loadMarkdownContent } from '../utils/loadMarkdown';
import PageTransition from '../components/transitions/PageTransition';
import Footer from '../components/Footer';

interface BlogPostProps {
  type: 'writing' | 'tech';
}

export default function BlogPost({ type }: BlogPostProps) {
  const { slug } = useParams();
  const [content, setContent] = useState<string>('');
  const [post, setPost] = useState<BlogPostMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    try {
      // Synchronously load all posts to find the metadata for the current one
      const allPosts = loadBlogPosts(type);
      const foundPost = allPosts.find(p => p.slug === slug);
      
      if (foundPost) {
        setPost(foundPost);
        
        // Synchronously load the markdown content
        const markdownResult = loadMarkdownContent(type, slug);
        if (markdownResult) {
          setContent(markdownResult.content);
        } else {
          setContent(''); // Clear content if loading fails
        }
      } else {
        setPost(null); // Clear post if not found
      }
    } catch (error) {
      // Error loading post data
    } finally {
      setLoading(false);
    }
  }, [slug, type]);

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!post) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600">The requested blog post could not be found.</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <div className={`${post.color} py-32 px-8`}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-white"
            >
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-8">
                {post.icon}
              </div>
              <h1 className="text-5xl font-bold mb-6">{post.title}</h1>
              
              {/* Date and tags */}
              <div className="flex flex-wrap items-center gap-4 text-white/80">
                <time className="text-lg">
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric',
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-white/60">•</span>
                    {post.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto px-8 py-16">
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-slate prose-headings:text-gray-900 prose-p:text-gray-800 prose-strong:text-gray-900 prose-a:text-blue-600 max-w-none"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code(props) {
                    const { children, className } = props;
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </motion.article>
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}