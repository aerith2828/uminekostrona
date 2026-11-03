import { FC } from 'react';
import Post from './Post';
import { posts } from '../pageContent/Posts';

const NewsFeed: FC = () => {
  return (
    <>
      {posts.map((post, index) => (
        <Post
          key={index}
          title={post.title}
          date={post.date}
          author={post.author}
          embed={post.embed}
          content={post.content}
          collapsible
        />
      ))}
    </>
  );
};

export default NewsFeed;
