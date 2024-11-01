import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_NEWS_ENDPOINT } from "@/utils/constants/endpoints";
import Layout from "@/components/Layout";
import BlogDetails from "./BlogDetails";
import router from "next/router";

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

const BlogClassic = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [BlogPerPage] = useState(6);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_NEWS_ENDPOINT);
        setPosts(response.data);
      } catch (error) {
        setError("Không thể tải bài viết.");
      }
    };
    fetchData();
  }, []);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleNavigation = () => {
    router.push("/");
  };

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  const indexOfLastBlog = currentPage * BlogPerPage;
  const indexOfFirstBlog = indexOfLastBlog - BlogPerPage;
  const currentBlog = posts.slice(indexOfFirstBlog, indexOfLastBlog);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / BlogPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Layout>
      <div className="h-[280px]">
        <div className="flex justify-between w-[1200px] ml-40">
          <div className="text-[#C9AB81] text-2xl tracking-[4px] mt-32 uppercase">
            Blog Classic
          </div>
          <div className="flex text-white mt-32">
            <div className="hover:text-[#C9AB81] cursor-pointer"
            onClick={handleNavigation}>Home</div>
            <div className="mt-2.5 ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 8.3 8.5"
                className="w-2 h-2 text-custom-yellow"
              >
                <polyline
                  points="0.4 0.4 3.6 4.2 0.4 8.1"
                  fill=""
                  stroke="currentColor"
                  stroke-width="1"
                ></polyline>
                <polyline
                  points="4.5 0.4 7.7 4.2 4.5 8.1"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1"
                ></polyline>
              </svg>
            </div>
            <div className="ml-4">Blog Classic</div>
          </div>
        </div>
      </div>
      {selectedPost ? (
        <BlogDetails post={selectedPost} />
      ) : (
        <div className="">
          <div className="flex flex-wrap justify-center">
            {currentBlog.map((post) => (
              <div key={post._id} className="">
                <div
                  className="w-[380px] h-[550px] m-4"
                  onClick={() => handlePostClick(post)}
                >
                  <div className="flex w-[380px] h-[235px] space-x-4">
                    {post.image?.length > 0 ? (
                      <img
                        src={post.image[0]}
                        alt={post.title}
                        className="w-full h-auto mb-4"
                      />
                    ) : (
                      <div className="text-white">No image available</div>
                    )}
                  </div>
                  <div className="flex text-white mt-5">
                    <div>
                      {new Date(post.createdAt || "").toLocaleDateString()}
                    </div>
                    <div className="ml-2 w-32">{post.type}</div>
                  </div>
                  <div className="text-custom-yellow uppercase text-2xl font-sans mt-3 tracking-[4px]">
                    {post.title}
                  </div>
                  <div className="font-open-sans-condensed text-white text-xl mt-3 w-[440px]">
                    {post.content.slice(0, 100)}...
                  </div>
                  <div className="font-open-sans-condensed text-white uppercase tracking-[4px] mt-14 text-md">
                    <a>Read More</a>
                    <div className="w-24 h-[0.5px] bg-[#C9AB81] mt-1"></div>
                    <div className="w-24 h-[0.5px] bg-[#C9AB81] mt-1"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`px-3 py-1 mx-1 rounded ${
                  number === currentPage
                    ? "bg-slate-600 text-white"
                    : "bg-gray-300"
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default BlogClassic;
