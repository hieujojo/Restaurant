import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import { GET_CHEFS_ENDPOINT } from "@/utils/constants/endpoints";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";

type Chef = {
  _id: string;
  name: string;
  image: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
};

const ChefList = () => {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const chefsPerPage = 3; // Số đầu bếp trên mỗi trang
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const BASE_URL = "http://localhost:8800";
      try {
        const { data } = await axios.get(GET_CHEFS_ENDPOINT);

        const formattedChefs = data.map((chef: Chef) => ({
          ...chef,
          image: chef.image.startsWith("http")
            ? chef.image
            : `${BASE_URL}/${chef.image}`,
        }));

        setChefs(formattedChefs);
      } catch (error) {
        console.error("Error fetching chefs:", error);
        setError("Không thể tải danh sách đầu bếp. Vui lòng thử lại sau.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const indexOfLastChef = currentPage * chefsPerPage;
  const indexOfFirstChef = indexOfLastChef - chefsPerPage;
  const currentChefs = chefs.slice(indexOfFirstChef, indexOfLastChef);

  const totalPages = Math.ceil(chefs.length / chefsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <p>Đang tải...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Layout>
      <div className="h-[180px]"></div>
      <div className="flex text-[#C9AB81] text-6xl justify-center mt-20 h-[200px]">
        <div className="uppercase tracking-[6px]">our chefs</div>
      </div>
      <div className="h-[800px]">
        <div className="flex flex-wrap justify-center xl:w-full xl:ml-[-20px] lg:mr-5 xl:space-x-4 lg:space-x-8">
          {currentChefs.map((chef) => (
            <div key={chef._id} className="xl:w-1/4 lg:w-[28%] xl:p-2 lg:p-0">
              <div
                className="rounded-lg p-4 shadow-lg h-[450px]"
                style={{ backgroundColor: "#0b1315" }}
              >
                <div className="flex w-[380px] h-[560px] group relative">
                  {chef.image ? (
                    <>
                      <img
                        src={chef.image}
                        alt={chef.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-[25px] transition-opacity duration-300 bg-custom-dark opacity-0 group-hover:opacity-100 flex items-center justify-center">
                        <div className="text-center text-white list-none">
                          <li
                            id="menu-item-70"
                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-70"
                          >
                            <a
                              className="inline-block text-center py-2"
                              target="_blank"
                              rel="noopener noreferrer"
                              href="https://www.instagram.com/qodeinteractive/"
                            >
                              Instagram
                              <span className="eltdf-btn-first-line border border-[#C9AB81] mt-1 block w-full"></span>
                              <span className="eltdf-btn-second-line border border-[#C9AB81] mt-1 block w-full"></span>
                            </a>
                          </li>
                          <li
                            id="menu-item-70"
                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-70 mt-4"
                          >
                            <a
                              className="inline-block text-center py-2"
                              target="_blank"
                              rel="noopener noreferrer"
                              href="https://x.com/QodeInteractive"
                            >
                              Twitter
                              <span className="eltdf-btn-first-line border border-[#C9AB81] mt-1 block w-full"></span>
                              <span className="eltdf-btn-second-line border border-[#C9AB81] mt-1 block w-full"></span>
                            </a>
                          </li>
                          <li
                            id="menu-item-69"
                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-69 mt-4"
                          >
                            <a
                              className="inline-block text-center py-2"
                              target="_blank"
                              rel="noopener noreferrer"
                              href="https://www.facebook.com/QodeInteractive/"
                            >
                              Facebook
                              <span className="eltdf-btn-first-line border border-[#C9AB81] mt-1 block w-full"></span>
                              <span className="eltdf-btn-second-line border border-[#C9AB81] mt-1 block w-full"></span>
                            </a>
                          </li>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-white">No image available</div>
                  )}
                </div>

                <div className="text-white mt-5">
                  <p className="text-custom-yellow text-2xl tracking-[3px] uppercase">
                    {chef.name}
                  </p>
                </div>
                <div className="font-open-sans-condensed mt-3 text-white text-xl">
                  {chef.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
    </Layout>
  );
};

export default ChefList;
