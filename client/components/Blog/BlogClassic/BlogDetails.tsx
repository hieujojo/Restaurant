import React from "react";

interface Post {
  _id: string;
  content: string;
  image: string[];
  slug: string;
  title: string;
  type: string;
  createdAt?: string;
  updatedAt?: string;
  author: string;
  rating: string;
  review_score: string;
}

interface BlogDetailsProps {
  post: Post;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ post }) => {
  return (
    <div>
      <div className=""></div>
      <div className="min-h-screen scale-90 transform-origin-top-left text-white">
        <div className="container mx-auto p-6 flex ml-24">
          <div className="w-[100%]">
            <div>
              {post.image?.length > 0 ? (
                <img
                  src={post.image[0]}
                  alt={post.title}
                  className="rounded-lg shadow-lg"
                />
              ) : (
                <div className="text-white">No image available</div>
              )}
            </div>
            <div className="uppercase text-4xl mt-10 tracking-[4px] text-custom-yellow">
              {post.title}
            </div>
            <div className="text-3xl mt-10 flex">
              <p className="text-custom-yellow mr-3 tracking-[3px]">Awards:</p>
              <div>{post.rating}</div>
            </div>
            <div className="text-3xl mt-6 tracking-[4px] flex">
              <p className="text-custom-yellow mr-6 tracking-[3px]">Rating:</p>
              <div> {post.review_score}</div>
            </div>
            <div className="text-3xl mt-6 tracking-[4px] flex">
              <p className="text-custom-yellow mr-5 tracking-[3px]">Author:</p>
              <div> {post.author}</div>
            </div>
            <div className="text-3xl mt-6 tracking-[4px] w-[1355px] flex">
              <p className="text-custom-yellow mr-5 tracking-[3px] m-0 ">
              Verdict:
              </p>
              <div className="m-0 inline">{post.content}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
