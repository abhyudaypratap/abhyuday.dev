import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { techPosts } from '../data/tech/posts';
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
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <BlogHeader title="Engineering & Technology" color="bg-blue-600" />
          
          <div className="bg-white">
            <div className="max-w-6xl mx-auto px-8 py-24">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {techPosts.map((post, index) => (
                  <Link key={post.title} to={`/tech/${post.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <motion.div
                      custom={index}
                      variants={cardVariants}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className={`${post.color} rounded-xl p-8 h-72 flex flex-col items-center justify-center text-center text-white transition-all duration-300 shadow-lg hover:shadow-xl`}
                    >
                      <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-6">
                        {post.icon}
                      </div>
                      <h2 className="text-2xl font-semibold leading-tight">{post.title}</h2>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}