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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_DISHS_ENDPOINT);
        setPosts(response.data);
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

  const renderContent = () => {
    const containerStyle = {
      maxWidth: "80%",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
    };

    const imgStyle = {
      height: "200px",
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
      height: "100%",
      transition: "transform 0.3s ease",
    };

    const hoverStyle = {
      transform: "scale(0.9)",
    };

    const filteredPosts = posts.filter((post) => {
      return (
        post.image &&
        post.image[0] &&
        post.image[0].trim() !== "" &&
        post.image[0].includes(".") &&
        (filter === "All" || post.type.toLowerCase() === filter.toLowerCase())
      );
    });

    if (filteredPosts.length === 0) {
      return <p>No posts available.</p>;
    }

    return (
      <div style={containerStyle}>
        {filteredPosts.map((post) => (
          <div key={post._id} className="relative overflow-hidden rounded-lg shadow-lg group">
            <img src={post.image[0]} alt={post.name} style={imgStyle} />
            <div
              className="absolute inset-0 transition-opacity duration-300 bg-custom-dark opacity-0 group-hover:opacity-100"
              style={contentStyle}
            >
              <div
                style={{ ...contentStyle, ...hoverStyle }}
                className="group-hover:transform scale-100"
              >
                <h2 className="text-lg font-semibold uppercase tracking-wide text-white">
                  {post.name}
                </h2>
                <p className="text-sm mt-1 text-white">Giá: {post.price} VND</p>
                <p className="text-sm mt-1 text-white">Mô tả: {post.description}</p>
                <p className="text-sm mt-1 text-white">Loại: {post.type}</p>
                <p className="text-sm mt-1 text-white">
                  Đánh giá:
                  {post.evalue && post.evalue.length > 0 && (
                    <span> {post.evalue[0].star} sao</span>
                  )}
                </p>
                <div className="flex justify-center mt-3 space-x-3">
                  <button className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                    Order
                  </button>
                  <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen relative z-0" style={{ backgroundColor: "#0b1315" }}>
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-10">
            <div className="flex-1 text-custom-yellow uppercase mt-36 ml-32 text-xl tracking-[5px]">
              <p>Three Columns Portfolio</p>
            </div>
            <div className="flex items-center text-white mt-36 mr-32 text-base">
              <p className="mr-3 hover:text-[#C9AB81] cursor-pointer"
              onClick={handleNavigation}
              >Home</p>
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
              className={`px-4 py-2 ${filter === "All" ? "text-yellow-500" : "text-gray-500"}`}
            >
              Show all
            </button>
            <button
              onClick={() => setFilter("Raw food")}
              className={`px-4 py-2 ${filter === "Raw food" ? "text-yellow-500" : "text-gray-500"}`}
            >
              Raw food
            </button>
            <button
              onClick={() => setFilter("Main Course")}
              className={`px-4 py-2 ${filter === "Main Course" ? "text-yellow-500" : "text-gray-500"}`}
            >
              Main Courses
            </button>
            <button
              onClick={() => setFilter("snacks")}
              className={`px-4 py-2 ${filter === "snacks" ? "text-yellow-500" : "text-gray-500"}`}
            >
              Snacks
            </button>
          </div>

          {isLoading ? <p>Đang tải...</p> : error ? <p style={{ color: "red" }}>{error}</p> : renderContent()}
        </div>
      </Layout>
    </div>
  );
};

export default DishComponent;
