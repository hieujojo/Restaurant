import React from "react";
import Layout from "@/components/Layout";

interface Post {
  _id: string;
  content: string;
  image: string[];
  slug: string;
  title: string;
  type: string;
  createdAt?: string;
  updatedAt?: string;
}

interface BlogDetailsProps {
  post: Post;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ post }) => {
  return (
      <div>
      <div className="h-[200px]"></div>
      <div className="bg-black min-h-screen scale-90 transform-origin-top-left text-white">
        <div className="container mx-auto p-6 ml-52">
          <div className="space-y-10">
            <div>
              {post.image?.length > 0 ? (
                <img src={post.image[0]} alt={post.title} className="rounded-lg shadow-lg" />
              ) : (
                <div className="text-white">No image available</div>
              )}
            </div>
            <div className="uppercase text-4xl mt-5 tracking-[5px] text-custom-yellow">
              {post.title}
            </div>
            <div className="mt-7 leading-loose">
              <p>{post.content}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};

export default BlogDetails;
