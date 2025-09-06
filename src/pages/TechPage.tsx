import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loadBlogPosts, BlogPostMeta } from '../utils/blogLoader';
import PageTransition from '../components/transitions/PageTransition';
import BlogHeader from '../components/blog/BlogHeader';
import Footer from '../components/Footer';

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
    },
  }),
};

export default function TechPage() {
  const [techPosts, setTechPosts] = useState<BlogPostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = () => {
      try {
        const posts = loadBlogPosts('tech');
        setTechPosts(posts);
      } catch (error) {
        // Error loading tech posts
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Group posts by year
  const postsByYear = techPosts.reduce((acc, post) => {
    const year = post.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<number, BlogPostMeta[]>);

  // Sort years in descending order
  const sortedYears = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading posts...</p>
          </div>
        </div>
      </PageTransition>
    );
  }
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <BlogHeader title="Engineering & Technology" color="bg-blue-600" />
          
          <div className="bg-white">
            <div className="max-w-6xl mx-auto px-8 py-24">
              {sortedYears.map((year, yearIndex) => (
                <div key={year} className="mb-16">
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: yearIndex * 0.1 }}
                    className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-600 pb-2"
                  >
                    {year}
                  </motion.h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {postsByYear[year].map((post, index) => (
                      <Link key={post.slug} to={`/tech/${post.slug}`}>
                        <motion.div
                          custom={yearIndex * 10 + index}
                          variants={cardVariants}
                          initial="initial"
                          whileInView="animate"
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.02, y: -5 }}
                          className={`${post.color} rounded-xl p-8 h-80 flex flex-col items-center justify-center text-center text-white transition-all duration-300 shadow-lg hover:shadow-xl`}
                        >
                          <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-6">
                            {post.icon}
                          </div>
                          <h3 className="text-2xl font-semibold leading-tight mb-3">{post.title}</h3>
                          <p className="text-sm opacity-90 mb-4">{new Date(post.date).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric' 
                          })}</p>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 justify-center">
                              {post.tags.slice(0, 2).map((tag) => (
                                <span 
                                  key={tag}
                                  className="px-2 py-1 bg-white/20 rounded-full text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                              {post.tags.length > 2 && (
                                <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
                                  +{post.tags.length - 2}
                                </span>
                              )}
                            </div>
                          )}
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              {techPosts.length === 0 && !loading && (
                <div className="text-center text-gray-600 py-16">
                  <p className="text-xl">No posts found.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}