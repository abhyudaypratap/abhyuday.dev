import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { techPosts } from '../data/tech/posts';
import { writingPosts } from '../data/writing/posts';
import PageTransition from '../components/transitions/PageTransition';
import Footer from '../components/Footer';

interface BlogPostProps {
  type: 'writing' | 'tech';
}

export default function BlogPost({ type }: BlogPostProps) {
  const { slug } = useParams();
  const posts = type === 'writing' ? writingPosts : techPosts;
  const post = posts.find(p => p.title.toLowerCase().replace(/\s+/g, '-') === slug);

  if (!post) {
    return <div>Post not found</div>;
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
              <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
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
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        {...props}
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
                {post.content}
              </ReactMarkdown>
            </motion.article>
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}