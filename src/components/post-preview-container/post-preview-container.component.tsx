import React from 'react';
import PostPreview from '../post-preview/post-preview.component';
import './post-preview-container.styles.scss';
import { Post } from '../../@types/post.interfaces';

interface IProps {
  posts: Post[];
}

export default function PostPreviewContainer ({ posts }: IProps){
  return (
    <div className='post-preview-container'>
      {posts.map((post: Post) => <PostPreview key={post.id} post={post} />)}
    </div>
  );
}
