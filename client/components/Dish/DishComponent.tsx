import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import { GET_DISHS_ENDPOINT } from "@/utils/constants/endpoints";
import router from "next/router";

type Evalue = {
  star: number;
  comment: string;
  idUser: string;
};

type Post = {
  _id: string;
  name: string;
  chef: string[];
  type: string;
  image: string[];
  slug: string;
  evalue: Evalue[];
  description: string;
  price: string;
  rating: number;
  createdAt?: string;
  updatedAt?: string;
};

const DishComponent: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 9; 

  useEffect(() => {
    const fetchData = async () => {
      const BASE_URL = "http://localhost:8800";
      try {
        const response = await axios.get(GET_DISHS_ENDPOINT);
        const formattedPosts = response.data.map((post: Post) => ({
          ...post,
          image: post.image.map((img: string) =>
            img.startsWith("http") ? img : `${BASE_URL}/${img}`
          ),
        }));
        setPosts(formattedPosts);
        setIsLoading(false);
      } catch (error) {
        setError("Không thể tải bài viết. Vui lòng thử lại sau.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNavigation = () => {
    router.push("/");
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const renderContent = () => {
    const containerStyle = {
      maxWidth: "80%",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
    };

    const imgStyle = {
      height: "100%",
      width: "100%",
      objectFit: "cover",
    };

    const contentStyle = {
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      transformOrigin: "center",
      height: "97%",
      transition: "transform 0.3s ease",
    };

    const hoverStyle = {
      transform: "scale(0.9)",
    };

    const filteredPosts = currentPosts.filter((post) => {
      return (
        post.image &&
        post.image[0] &&
        post.image[0].trim() !== "" &&
        post.image[0].includes(".") &&
        (filter === "All" || post.type.toLowerCase().trim() === filter.toLowerCase().trim())
      );
    });
    

    if (filteredPosts.length === 0) {
      return <p>No posts available.</p>;
    }

    return (
      <div style={containerStyle}>
        {filteredPosts.map((post) => (
          <div
            key={post._id}
            className="relative overflow-hidden rounded-lg shadow-lg group h-full w-full"
          >
            <img src={post.image[0]} alt={post.name} style={imgStyle} />
            <div
              className="absolute transition-opacity w-[calc(100%-20px)] inset-[10px] duration-300 bg-custom-dark opacity-0 group-hover:opacity-100"
              style={contentStyle}
            >
              <div
                style={{ ...contentStyle, ...hoverStyle }}
                className="group-hover:transform scale-100"
              >
                <h2 className="font-semibold uppercase tracking-[4px] text-3xl text-custom-yellow">
                  {post.name}
                </h2>
                <p className="text-xl mt-3 text-white"> {post.type}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div
      className="min-h-screen relative z-0"
      style={{ backgroundColor: "#0b1315" }}
    >
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-10">
            <div className="flex-1 text-custom-yellow uppercase mt-36 ml-32 text-xl tracking-[5px]">
              <p>Three Columns Portfolio</p>
            </div>
            <div className="flex items-center text-white mt-36 mr-32 text-base">
              <p
                className="mr-3 hover:text-[#C9AB81] cursor-pointer"
                onClick={handleNavigation}
              >
                Home
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 8.3 8.5"
                className="w-2 h-2 text-custom-yellow"
              >
                <polyline
                  points="0.4 0.4 3.6 4.2 0.4 8.1"
                  fill=""
                  stroke="currentColor"
                  strokeWidth="1"
                ></polyline>
                <polyline
                  points="4.5 0.4 7.7 4.2 4.5 8.1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                ></polyline>
              </svg>
              <p className="ml-3">Three Columns Portfolio</p>
            </div>
          </div>

          <div className="h-[100px]"></div>
          <div className="portfolio-buttons flex justify-center mb-8 space-x-4">
            <button
              onClick={() => setFilter("All")}
              className={`px-4 py-2 ${
                filter === "All" ? "text-yellow-500" : "text-gray-500"
              }`}
            >
              Show all
            </button>
            <button
              onClick={() => setFilter("Desserts")}
              className={`px-4 py-2 ${
                filter === "Desserts" ? "text-yellow-500" : "text-gray-500"
              }`}
            >
              Desserts
            </button>
            <button
              onClick={() => setFilter("Main Courses")}
              className={`px-4 py-2 ${
                filter === "Main Courses" ? "text-yellow-500" : "text-gray-500"
              }`}
            >
              Main Courses
            </button>
            <button
              onClick={() => setFilter("Recipes")}
              className={`px-4 py-2 ${
                filter === "Recipes" ? "text-yellow-500" : "text-gray-500"
              }`}
            >
              Recipes
            </button>
          </div>

          {isLoading ? (
            <p>Đang tải...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            renderContent()
          )}

          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="flex items-center justify-center text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default DishComponent;
