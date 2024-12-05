import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import { GET_DISHS_ENDPOINT } from "@/utils/constants/endpoints";

const BASE_URL = "http://localhost:8800/";

type Evalue = {
  star: number;
  comment: string;
  idUser: string;
  userName?: string;
  userAvatar?: string;
  type: string;
};

type Post = {
  _id: string;
  name: string;
  image: string[];
  price: string;
  evalue: Evalue[];
  description: string;
  type: string;
};

const PortPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(GET_DISHS_ENDPOINT);
        setPosts(
          data.map((post: Post) => ({
            ...post,
            image: post.image.map((img) => (img.startsWith("http") ? img : `${BASE_URL}${img}`)),
          }))
        );
      } catch {
        setError("Không thể tải bài viết. Vui lòng thử lại sau.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) return <p>Đang tải...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Layout>
      <div className="h-[150px]"></div>
      <div className="min-h-screen w-full px-10">
        {posts.slice(0, 11).map((post) => (
          <div key={post._id} className="flex flex-col lg:flex-row justify-center mt-10">
            {post.image.length > 0 && (
              <div
                className="w-[320px] lg:w-[450px] h-[320px] lg:h-auto mb-8 lg:mb-0 rounded-lg shadow-lg"
                style={{
                  backgroundImage: `url(${post.image[0]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            )}
            <div className="lg:w-1/2 lg:pl-12 text-white">
              <h1 className="text-5xl font-bold mb-4 text-custom-yellow uppercase tracking-[5px]">
                {post.name}
              </h1>
              <div className="flex">
              <p className="text-2xl mb-4 font-semibold tracking-[1px] text-custom-yellow">Price: </p>
              <p className="text-2xl mb-4 ml-3 font-semibold tracking-[1px]">${post.price}</p>
              </div>
              <div className="flex">
              <p className="text-2xl mb-4 font-semibold tracking-[1px] text-custom-yellow">Type: </p>
              <p className="text-2xl mb-4 ml-3 font-semibold tracking-[1px]">{post.type}</p>
              </div>
              <div className="">
              <p className="text-2xl mb-4 font-semibold tracking-[1px] text-custom-yellow">Description: </p>
              <p className="text-2xl mb-4 font-semibold tracking-[1px]">{post.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default PortPage;
