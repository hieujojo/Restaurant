import { setDish } from "@/features/dish/dishSlice";
import { RootState } from "@/store/store";
import {
  DELETE_DISH_ENDPOINT,
  GET_CHEF_ENDPOINT,
  GET_DISHS_ENDPOINT,
  GET_DISH_BY_NAME_ENDPOINT,
} from "@/utils/constants/endpoints";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChefState } from "../chef/interfaces";
import FormUpdate from "./FormUpdate";
import { setError } from "@/features/slices/errorSlices";
import { useDebouncedCallback } from "use-debounce";
import {
  setSearchQueryDish,
  setSearchResultsDish,
} from "@/features/dish/searchSlices";

const List = () => {
  const dishes = useSelector((state: RootState) => state.dishes.dishes);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState("");

  const [chefData, setChefData] = useState<{ [key: string]: ChefState }>({});
  const [ratings, setRatings] = useState<{ [idDish: string]: number }>({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_DISHS_ENDPOINT, {
          withCredentials: true,
        });
        const dishData = response.data;
        dispatch(setDish(dishData));

        const chefPromises = dishData.map(async (dish: any) => {
          const chefPromises = dish.chef.map(async (idChef: string) => {
            try {
              const response = await axios.get(GET_CHEF_ENDPOINT(idChef), {
                withCredentials: true,
              });
              return { idChef, data: response.data };
            } catch (error) {
              console.log(`Error fetching chef ${idChef}:`, error);
              return { idChef, data: null };
            }
          });
          return Promise.all(chefPromises);
        });

        const chefResults = await Promise.all(chefPromises);
        const chefDataMap: { [key: string]: ChefState } = {};
        chefResults.flat().forEach(({ idChef, data }) => {
          if (data) chefDataMap[idChef] = data;
        });
        setChefData(chefDataMap);

        const ratingMap: { [key: string]: number } = {};
        dishData.forEach((dish: any) => {
          if (dish.evalue && dish.evalue.length > 0) {
            const totalStars = dish.evalue.reduce((sum: number, item: any) => {
              const starValue = parseInt(item.star);
              if (isNaN(starValue)) {
                console.error(`Invalid star value: ${item.star}`);
                return sum;
              }
              return sum + starValue;
            }, 0);
            const averageRating = totalStars / dish.evalue.length;
            ratingMap[dish._id] = averageRating;
          } else {
            ratingMap[dish._id] = 0;
          }
        });
        setRatings(ratingMap);
      } catch (error) {
        console.log("Have error when call api", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(DELETE_DISH_ENDPOINT(id), {
        withCredentials: true,
      });
      if (res.status == 200) {
        dispatch(
          setError({ status: "success", message: "Delete dish successfully!" })
        );
        const response = await axios.get(GET_DISHS_ENDPOINT, {
          withCredentials: true,
        });
        dispatch(setDish(response.data));
      } else {
        dispatch(
          setError({ status: "danger", message: "Delete dish failed!" })
        );
      }
    } catch (error) {
      console.log("error", error);
      dispatch(setError({ status: "danger", message: "Delete dish failed!" }));
    }
  };

  const query = useSelector((state: RootState) => state.searchDish.queryDish);
  const results = useSelector(
    (state: RootState) => state.searchDish.resultsDish
  );

  const debouncedSearch = useDebouncedCallback(async (searchQuery: string) => {
    try {
      if (searchQuery) {
        const response = await axios.get(
          GET_DISH_BY_NAME_ENDPOINT(searchQuery),
          {
            withCredentials: true,
          }
        );
        dispatch(setSearchResultsDish(response.data));
      } else {
        const response = await axios.get(GET_DISHS_ENDPOINT, {
          withCredentials: true,
        });
        dispatch(setSearchResultsDish(response.data));
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSearchQueryDish(value));
    debouncedSearch(value);
  };
  return (
    <div>
      <div className="row d-flex justify-content-between mx-2">
        <div className="d-flex">
          <div className="dataTables_length" id="datatable-checkbox_length">
            <label className="d-flex align-items-center">
              Show
              <select
                name="datatable-checkbox_length"
                aria-controls="datatable-checkbox"
                className="form-control input-sm mx-2"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              entries
            </label>
          </div>
        </div>
        <div className="d-flex">
          <div id="datatable-checkbox_filter" className="dataTables_filter">
            <label className="d-flex align-items-center">
              Search:
              <input
                type="search"
                value={query}
                onChange={handleChange}
                className="form-control input-sm mx-3"
                placeholder="search"
                aria-controls="datatable-checkbox"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <table
          id="datatable-checkbox"
          className="table table-striped table-bordered bulk_action w-100"
        >
          <thead>
            <tr>
              <th>
                <th>
                  <input type="checkbox" id="check-all" />
                </th>
              </th>
              <th>Name</th>
            </tr>
          </thead>

          <tbody>
            {results.length > 0
              ? results.map((result) => (
                  <tr key={result._id}>
                    <td className="w-[5%]">
                      <th>
                        <input type="checkbox" id="check-all" />
                      </th>
                    </td>
                    <td className="w-[30%]">
                      <div>
                        <div className="columns-2">
                          {result.image.slice(0, 3).map((image, index) => (
                            <img
                              key={index}
                              width={50}
                              height={50}
                              className="mb-1 w-[170px] h-[170px]"
                              src={`${image}`}
                              alt={`Image ${index}`}
                            />
                            // <Image
                            //     key={index}
                            //     src={`/${image}`}
                            //     alt={` avatar`}
                            //     width={64}
                            //     height={64}
                            //     className="object-cover rounded-full"
                            // />
                          ))}
                          {result.image.length > 4 && (
                            <div
                              onClick={() => setShowModal(result._id)}
                              className=" cursor-pointer mb-1 w-[170px] h-[170px] flex items-center justify-center bg-gray-200"
                            >
                              <span>+{result.image.length - 3}</span>
                            </div>
                          )}
                        </div>

                        {/* form image */}
                        {showModal === result._id && (
                          <div className="modal1 btn-create-user">
                            <div className="modal-dialog modal-lg">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    onClick={() => setShowModal("")}
                                  >
                                    <span aria-hidden="true">×</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <div className="columns-4">
                                    {result.image.map((image, index) => (
                                      <img
                                        key={index}
                                        width={50}
                                        height={50}
                                        className="mb-1 w-[170px] h-[170px]"
                                        src={`${image}`}
                                        alt={`Image ${index}`}
                                      />
                                    ))}
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-dismiss="modal"
                                      onClick={() => setShowModal("")}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="h-full relative">
                      <p>
                        <b className="text-[20px]">{result.name}</b>
                      </p>
                      <p>
                        <b>Price :</b>$ {result.price}
                      </p>
                      <p>
                        <b>Chef :</b>{" "}
                        {result.chef &&
                          result.chef
                            .map((id: string) => chefData[id]?.name)
                            .join(", ")}
                      </p>
                      <p>
                        <b>Evalue: </b>{" "}
                        {ratings[result._id]?.toFixed(1) || "No rating"} star (
                        {result.evalue.length} cmt)
                      </p>
                      <p>
                        <b>Type: </b>
                        {result.type}
                      </p>
                      <p>
                        <b>Description: </b>
                        {result.description}
                      </p>
                      <div className="flex absolute right-5 bottom-0">
                        <button
                          type="button"
                          title="Evalue"
                          className="btn btn-info btn-sm text-[13px]"
                        >
                          <i className="fa fa-envelope"></i>
                        </button>
                        <FormUpdate
                          _id={result._id}
                          name={result.name}
                          image={result.image}
                          description={result.description}
                          type={result.type}
                          chef={result.chef}
                          price={result.price}
                          evalue={[]}
                        />
                        <button
                          type="button"
                          title="Delete"
                          onClick={() => handleDelete(result._id)}
                          className="btn btn-danger btn-sm text-[13px]"
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              : dishes.map((dish) => (
                  <tr key={dish._id}>
                    <td className="w-[5%]">
                      <th>
                        <input type="checkbox" id="check-all" />
                      </th>
                    </td>
                    <td className="w-[30%]">
                      <div>
                        <div className="columns-2">
                          {dish.image.slice(0, 3).map((image, index) => (
                            <img
                              key={index}
                              width={50}
                              height={50}
                              className="mb-1 w-[170px] h-[170px]"
                              src={`${image}`}
                              alt={`Image ${index}`}
                            />
                            // <Image
                            //     key={index}
                            //     src={`/${image}`}
                            //     alt={` avatar`}
                            //     width={64}
                            //     height={64}
                            //     className="object-cover rounded-full"
                            // />
                          ))}
                          {dish.image.length > 4 && (
                            <div
                              onClick={() => setShowModal(dish._id)}
                              className=" cursor-pointer mb-1 w-[170px] h-[170px] flex items-center justify-center bg-gray-200"
                            >
                              <span>+{dish.image.length - 3}</span>
                            </div>
                          )}
                        </div>

                        {/* form image */}
                        {showModal === dish._id && (
                          <div className="modal1 btn-create-user">
                            <div className="modal-dialog modal-lg">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    onClick={() => setShowModal("")}
                                  >
                                    <span aria-hidden="true">×</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <div className="columns-4">
                                    {dish.image.map((image, index) => (
                                      <img
                                        key={index}
                                        width={50}
                                        height={50}
                                        className="mb-1 w-[170px] h-[170px]"
                                        src={`${image}`}
                                        alt={`Image ${index}`}
                                      />
                                    ))}
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-dismiss="modal"
                                      onClick={() => setShowModal("")}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="h-full relative">
                      <p>
                        <b className="text-[20px]">{dish.name}</b>
                      </p>
                      <p>
                        <b>Price :</b>$ {dish.price}
                      </p>
                      <p>
                        <b>Chef :</b>{" "}
                        {dish.chef &&
                          dish.chef
                            .map((id: string) => chefData[id]?.name)
                            .join(", ")}
                      </p>
                      <p>
                        <b>Evalue: </b>{" "}
                        {ratings[dish._id]?.toFixed(1) || "No rating"} star (
                        {dish.evalue.length} cmt)
                      </p>
                      <p>
                        <b>Type: </b>
                        {dish.type}
                      </p>
                      <p>
                        <b>Description: </b>
                        {dish.description}
                      </p>
                      <div className="flex absolute right-5 bottom-0">
                        <button
                          type="button"
                          title="Evalue"
                          className="btn btn-info btn-sm text-[13px]"
                        >
                          <i className="fa fa-envelope"></i>
                        </button>
                        <FormUpdate
                          _id={dish._id}
                          name={dish.name}
                          image={dish.image}
                          description={dish.description}
                          type={dish.type}
                          chef={dish.chef}
                          price={dish.price}
                          evalue={[]}
                        />
                        <button
                          type="button"
                          title="Delete"
                          onClick={() => handleDelete(dish._id)}
                          className="btn btn-danger btn-sm text-[13px]"
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
