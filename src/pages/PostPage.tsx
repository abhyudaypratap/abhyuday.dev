import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ArrowLeft } from 'lucide-react';
import PageTransition from '../components/transitions/PageTransition';
import Footer from '../components/Footer';
import { COLLECTIONS, Collection, formatDate, getPost } from '../lib/posts';

export default function PostPage({ collection = 'writing' }: { collection?: Collection }) {
  const { backLabel, basePath, showSections } = COLLECTIONS[collection];
  const { slug } = useParams();
  const post = slug ? getPost(slug, collection) : undefined;

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <div className="max-w-3xl mx-auto px-8 py-16">
            <Link
              to={basePath}
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> {backLabel}
            </Link>

            {!post ? (
              <>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Post not found</h1>
                <p className="text-gray-600">This post doesn't exist.</p>
              </>
            ) : (
              <article>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">{post.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-10">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  {showSections && (
                    <>
                      <span>•</span>
                      <Link to={`${basePath}?section=${post.section}`} className="capitalize hover:text-blue-600">
                        {post.section}
                      </Link>
                    </>
                  )}
                  <span>•</span>
                  <span>{post.readingMinutes} min read</span>
                  {post.tags.map((tag) => (
                    <Link key={tag} to={`${basePath}?tag=${encodeURIComponent(tag)}`} className="hover:text-blue-600">
                      #{tag}
                    </Link>
                  ))}
                </div>
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    components={{
                      code({ children, className }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                          <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div">
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className}>{children}</code>
                        );
                      },
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>
              </article>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}
