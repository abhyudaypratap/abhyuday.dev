export type Section = 'thoughts' | 'tech';

export interface Post {
  slug: string;
  title: string;
  date: string;
  section: Section;
  tags: string[];
  excerpt: string;
  content: string;
  readingMinutes: number;
}

export const SECTIONS: { id: Section; label: string }[] = [
  { id: 'thoughts', label: 'Thoughts' },
  { id: 'tech', label: 'Tech' },
];

export type Collection = 'writing' | 'personal';

export const COLLECTIONS: Record<
  Collection,
  { title: string; basePath: string; backLabel: string; showSections: boolean }
> = {
  writing: { title: 'Writing', basePath: '/writing', backLabel: 'All writing', showSections: true },
  personal: { title: 'Personal', basePath: '/personal', backLabel: 'All personal posts', showSections: false },
};

// import.meta.glob only accepts literal patterns, so each collection needs its own call
const sources: Record<Collection, Record<string, string>> = {
  writing: import.meta.glob<string>('../data/posts/*.md', { eager: true, query: '?raw', import: 'default' }),
  personal: import.meta.glob<string>('../data/personal/*.md', { eager: true, query: '?raw', import: 'default' }),
};

// Supports `key: value` lines and inline arrays like tags: [a, b]
function parseFrontmatter(raw: string): { data: Record<string, string | string[]>; body: string } {
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };

  const data: Record<string, string | string[]> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1 || line.trim().startsWith('#')) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
      continue;
    }
    value = value.replace(/^["']|["']$/g, '');
    data[key] = value;
  }
  return { data, body: match[2] };
}

const toSlug = (path: string) =>
  (path.split('/').pop() ?? '').replace(/\.md$/, '').replace(/_/g, '-');

function buildPosts(modules: Record<string, string>): Post[] {
  const posts: Post[] = [];

  for (const [path, raw] of Object.entries(modules)) {
    const { data, body } = parseFrontmatter(raw);
    if (data.draft === 'true' && import.meta.env.PROD) continue;

    const slug = toSlug(path);
    const date = typeof data.date === 'string' ? data.date : '';
    const section: Section = data.section === 'tech' ? 'tech' : 'thoughts';
    const words = body.trim().split(/\s+/).length;

    posts.push({
      slug,
      title: typeof data.title === 'string' && data.title ? data.title : slug.replace(/-/g, ' '),
      date,
      section,
      tags: Array.isArray(data.tags) ? data.tags : [],
      excerpt: typeof data.excerpt === 'string' ? data.excerpt : '',
      content: body,
      readingMinutes: Math.max(1, Math.round(words / 200)),
    });
  }

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

const postsByCollection: Record<Collection, Post[]> = {
  writing: buildPosts(sources.writing),
  personal: buildPosts(sources.personal),
};

export const getPosts = (collection: Collection = 'writing'): Post[] => postsByCollection[collection];
export const getPost = (slug: string, collection: Collection = 'writing'): Post | undefined =>
  postsByCollection[collection].find((p) => p.slug === slug);

export const formatDate = (date: string): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
};
