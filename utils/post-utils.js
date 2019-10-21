import marked from 'marked';

import parser from './frontmatter';

export const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)));

export const withFrontmatter = data => {
  const post = parser(data);

  return { body: post.body, ...post.attributes };
};

export const withParsedHtml = post => ({ ...post, html: marked(post.body) });

export const withNoBody = post => ({ ...post, body: undefined });

export const withReadingTime = post => {
  const text = post.body;
  if (!text) {
    return post;
  }
  const readingTime = Math.ceil(text.split(/s/g).length / 200);
  return { ...post, readingTime };
};

export const onlyPublished = post => /true/i.test(post.published || 'false');
