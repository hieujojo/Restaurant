import React, { useState } from 'react';
import BlogClassic from '@/components/Blog/BlogClassic/BlogClassic';
import BlogDetails from '@/components/Blog/BlogClassic/BlogDetails';

const Blog = () => {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const handleSelectPost = (postId: string) => {
    setSelectedPostId(postId);
  };

  return (
    <div>
      {selectedPostId ? (
        <BlogDetails postId={selectedPostId} />
      ) : (
        <BlogClassic onSelectPost={handleSelectPost} />
      )}
    </div>
  );
};

export default Blog;
