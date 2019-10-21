import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import ErrorPage from 'next/error';

import {
  withNoBody,
  withFrontmatter,
  withParsedHtml,
  withReadingTime,
  compose,
} from '../../utils/post-utils';

const Post = ({ post }) => {
  if (!post) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <section role="main">
      <article>
        <h1>{post.title}</h1>
        <p>
          <time>
            {new Date(post.date).toLocaleDateString('en', {
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span> - </span>
          <span>{post.readingTime} min read</span>
        </p>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </section>
  );
};

Post.getInitialProps = async ({ query: { slug } }) => {
  try {
    const post = require(`../../posts/${slug}.md`).default;

    return {
      post: compose(
        withParsedHtml,
        withReadingTime,
        withFrontmatter
      )(post),
    };
  } catch {
    return {};
  }
};

export default withRouter(Post);
