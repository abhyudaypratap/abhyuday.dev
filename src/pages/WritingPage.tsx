import { Link, useSearchParams } from 'react-router-dom';
import PageTransition from '../components/transitions/PageTransition';
import Footer from '../components/Footer';
import { COLLECTIONS, Collection, SECTIONS, Section, formatDate, getPosts } from '../lib/posts';

const chip = (active: boolean) =>
  `px-3 py-1 rounded-full text-sm border transition-colors ${
    active
      ? 'bg-gray-900 border-gray-900 text-white'
      : 'bg-white border-gray-300 text-gray-600 hover:border-gray-500'
  }`;

export default function WritingPage({ collection = 'writing' }: { collection?: Collection }) {
  const { title, basePath, showSections } = COLLECTIONS[collection];
  const posts = getPosts(collection);
  const [params, setParams] = useSearchParams();

  const section = showSections
    ? (SECTIONS.find((s) => s.id === params.get('section'))?.id as Section | undefined)
    : undefined;
  const activeTag = params.get('tag') ?? undefined;

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

  const update = (key: 'section' | 'tag', value?: string) => {
    const next = new URLSearchParams(params);
    if (value && next.get(key) !== value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const visible = posts.filter(
    (p) => (!section || p.section === section) && (!activeTag || p.tags.includes(activeTag))
  );

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <div className="max-w-3xl mx-auto px-8 py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">{title}</h1>

            {posts.length > 0 && (showSections || allTags.length > 0) && (
              <div className="mb-10 space-y-4">
                {showSections && (
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Sections">
                    <button className={chip(!section)} onClick={() => update('section')}>
                      All
                    </button>
                    {SECTIONS.map((s) => (
                      <button key={s.id} className={chip(section === s.id)} onClick={() => update('section', s.id)}>
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}
                {allTags.length > 0 && (
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Tags">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        className={`${chip(activeTag === tag)} text-xs`}
                        onClick={() => update('tag', tag)}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {visible.length === 0 ? (
              <p className="text-gray-500">
                {posts.length === 0 ? 'Nothing here yet.' : 'No posts match these filters.'}
              </p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {visible.map((post) => (
                  <li key={post.slug}>
                    <Link to={`${basePath}/${post.slug}`} className="block py-6 group">
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-1">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        {showSections && (
                          <>
                            <span>•</span>
                            <span className="capitalize">{post.section}</span>
                          </>
                        )}
                        <span>•</span>
                        <span>{post.readingMinutes} min read</span>
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && <p className="text-gray-600 mt-1">{post.excerpt}</p>}
                      {post.tags.length > 0 && (
                        <p className="text-xs text-gray-500 mt-2">{post.tags.map((t) => `#${t}`).join('  ')}</p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}
