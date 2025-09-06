// Manual imports for blog posts
import writingPost1 from '../data/posts/writing/creating-intuitive-products-that-users-just-get.md?raw';
import writingPost2 from '../data/posts/writing/europe-journey.md?raw';
import writingPost3 from '../data/posts/writing/the-lessons-of-history-across-5000-years.md?raw';
import writingPost4 from '../data/posts/writing/the-secret-behind-all-great-copywriting.md?raw';

import techPost1 from '../data/posts/tech/building-scalable-apis-with-nodejs-and-typescript.md?raw';
import techPost2 from '../data/posts/tech/creating-interactive-3d-globes-with-threejs.md?raw';
import techPost3 from '../data/posts/tech/machine-learning-fundamentals-for-developers.md?raw';

export const postManifest = {
  writing: [
    { slug: 'creating-intuitive-products-that-users-just-get', content: writingPost1 },
    { slug: 'europe-journey', content: writingPost2 },
    { slug: 'the-lessons-of-history-across-5000-years', content: writingPost3 },
    { slug: 'the-secret-behind-all-great-copywriting', content: writingPost4 },
  ],
  tech: [
    { slug: 'building-scalable-apis-with-nodejs-and-typescript', content: techPost1 },
    { slug: 'creating-interactive-3d-globes-with-threejs', content: techPost2 },
    { slug: 'machine-learning-fundamentals-for-developers', content: techPost3 },
  ]
};
