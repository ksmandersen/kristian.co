import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import importAll from '../utils/import-all';
import {
  withNoBody,
  withFrontmatter,
  onlyPublished,
} from '../utils/post-utils';

const Index = ({ posts }) => (
  <div>
    <Head>
      <title>kristian.co</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <section rel="main">
      {posts.map(post => (
        <article key={post.slug}>
          <h2>
            <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
              <a href={`/posts/${post.slug}`}>{post.title}</a>
            </Link>
          </h2>
        </article>
      ))}
    </section>
  </div>
);

Index.getInitialProps = async () => {
  const posts = importAll(require.context('../posts', true, /\.md$/))
    .reverse()
    .map(withFrontmatter)
    .map(withNoBody)
    .filter(onlyPublished);

  return { posts };
};

export default Index;
