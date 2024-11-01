import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import {
  GET_DISHS_ENDPOINT,
  GET_USER_ENDPOINT,
} from "@/utils/constants/endpoints";

const GET_CHEF_ENDPOINT = (id: string) =>
  `http://localhost:8800/api/chef/${id}`;

type Evalue = {
  star: number;
  comment: string;
  idUser: string;
  userName?: string;
  userAvatar?: string;
};

type Chef = {
  _id: string;
  name: string;
  image: string;
  description: string;
};

type User = {
  id: string;
  name: string;
  avatar: string;
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

const PortPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [chefs, setChefs] = useState<{ [key: string]: Chef }>({});
  const [users, setUsers] = useState<{ [key: string]: User }>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchChefs = async (chefIds: string[]) => {
    try {
      const chefData: { [key: string]: Chef } = {};
      for (const id of chefIds) {
        const response = await axios.get(GET_CHEF_ENDPOINT(id));
        chefData[id] = response.data;
      }
      setChefs(chefData);
    } catch (error) {
      setError(`Không thể tải thông tin đầu bếp: ${error.message}`);
    }
  };

  const fetchUsers = async (userIds: string[]) => {
    try {
      const userRequests = userIds.map((id) =>
        axios.get(GET_USER_ENDPOINT(id))
      );
      const responses = await Promise.all(userRequests);
      const userData: { [key: string]: User } = {};

      responses.forEach((response, index) => {
        if (response.status === 200) {
          userData[userIds[index]] = response.data;
        } else {
          console.warn(`Không tìm thấy người dùng với ID ${userIds[index]}`);
        }
      });

      setUsers(userData);
    } catch (error: any) {
      setError(`Không thể tải thông tin người dùng: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(GET_DISHS_ENDPOINT);
        const postData = response.data;
        setPosts(postData);

        let allChefIds = Array.from(
          new Set(postData.flatMap((post: Post) => post.chef))
        );
        allChefIds = allChefIds.filter((id) => id && id.length === 24);

        const allUserIds = postData.flatMap((post: Post) =>
          post.evalue.map((review: Evalue) => review.idUser)
        );

        if (allUserIds.length > 0) await fetchUsers(allUserIds);

        setIsLoading(false);
      } catch (error) {
        setError("Không thể tải bài viết. Vui lòng thử lại sau.");
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getChefNames = (chefIds: string[]) => {
    return chefIds
      .map((id) => chefs[id]?.name)
      .filter((name) => name)
      .join(", ");
  };

  const renderReviews = (post: Post) => {
    return post.evalue.map((review, index) => {
      const user = users[review.idUser];
      return (
        <div
          key={index}
          className="flex items-start mb-6 bg-gray-800 p-4 rounded-lg shadow-lg"
        >
          {user ? (
            <>
              <img
                src={user.avatar || review.userAvatar}
                alt={user.name || review.userName}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-lg font-semibold text-white">
                  {user.name || review.userName}
                </p>
                <div className="flex items-center mb-2">
                  {[...Array(review.star)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.387 4.26h4.48c.969 0 1.37 1.24.588 1.81l-3.628 2.63 1.387 4.26c.3.921-.755 1.688-1.538 1.118l-3.628-2.63-3.628 2.63c-.783.57-1.838-.197-1.538-1.118l1.387-4.26-3.628-2.63c-.783-.57-.381-1.81.588-1.81h4.48l1.387-4.26z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-300">{review.comment}</p>
              </div>
            </>
          ) : (
            <p className="text-lg font-semibold text-white">
              Người dùng không xác định
            </p>
          )}
        </div>
      );
    });
  };

  const renderContent = () => {
    const limitedPosts = posts.slice(0, 5);
    if (limitedPosts.length === 0) return <p>No posts available.</p>;

    return (
      <div>
        <div className="h-[140px]"></div>

        {limitedPosts.map((post) => (
          <div
            key={post._id}
            className="flex flex-col lg:flex-row justify-between mt-10 ml-20"
          >
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              {post.image.length > 0 && (
                <div
                  className="w-full h-96 rounded-lg shadow-lg mb-4"
                  style={{
                    backgroundImage: `url(${post.image[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              )}
            </div>
            <div className="lg:w-1/2 lg:pl-12 text-white">
              <h1 className="text-5xl font-bold mb-4 text-custom-yellow uppercase tracking-[5px]">
                {post.name}
              </h1>
              <p className="text-2xl mb-4 font-semibold tracking-[1px]">
                ${post.price}
              </p>
              <p className="mb-4 text-xl">Rating: {post.evalue[0]?.star} sao</p>
              <p className="mb-4 text-xl">Chef: {getChefNames(post.chef)}</p>
              <p className="text-xl leading-relaxed">
                Description: {post.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (isLoading) return <p>Đang tải...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Layout>
      <div className="min-h-screen w-full flex flex-col">
        <div className="flex-grow px-10">{renderContent()}</div>
        <div className="bg-custom-dark p-10 mt-10 ml-28 w-[1294px]">
          <h2 className="text-3xl font-bold text-white mb-6">Reviews</h2>
          <div className="space-y-4">
            {posts.length > 0 && renderReviews(posts[0])}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PortPage;
