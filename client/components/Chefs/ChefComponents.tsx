import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import { GET_CHEFS_ENDPOINT } from "@/utils/constants/endpoints";

const ChefList = () => {
  const [chefs, setChefs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [chefsPerPage] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_CHEFS_ENDPOINT);
        setChefs(response.data);
      } catch (error) {
        console.log("Error fetching chefs:", error);
      }
    };
    fetchData();
  }, []);

  const indexOfLastChef = currentPage * chefsPerPage;
  const indexOfFirstChef = indexOfLastChef - chefsPerPage;
  const currentChefs = chefs.slice(indexOfFirstChef, indexOfLastChef);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(chefs.length / chefsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Layout>
      <div className="h-[180px]"></div>
      <div className="h-[1000px]">
        <div className="flex flex-wrap justify-center w-full space-x-4">
          {currentChefs.map((chef) => (
            <div key={String(chef._id)} className="w-full lg:w-1/4 p-2">
              <div
                className="rounded-lg p-4 shadow-lg h-[450px]"
                style={{ backgroundColor: "#0b1315" }}
              >
                <div className="flex w-[250px] h-[250px]">
                  {chef.image ? (
                    <img
                      src={chef.image}
                      alt={chef.name}
                      className="w-full h-full mb-4"
                    />
                  ) : (
                    <div className="text-white">No image available</div>
                  )}
                </div>
                <div className="text-white mt-5">
                  <p>{chef.name}</p>
                  {chef.createdAt && (
                    <div>{new Date(chef.createdAt).toLocaleDateString()}</div>
                  )}
                </div>
                <div className="font-open-sans-condensed mt-3 text-white text-xl">
                  {chef.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
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
    </Layout>
  );
};

export default ChefList;
