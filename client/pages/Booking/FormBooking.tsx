import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import router from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  GET_TABLES_ENDPOINT,
  GET_PROFILE_USE,
  CREATE_BOOKING_ENDPOINT,
  GET_DISHS_ENDPOINT,
} from "@/utils/constants/endpoints";

interface FormData {
  table: string;
  user: string;
  startTime: string;
  endTime: string;
  date: string;
  dish: string[];
  totalmoney: number;
  type: string;
}

interface UserDetails {
  _id: string;
  name: string;
  email: string;
  gender: string;
  phone: string;
  img: string;
}

interface Dish {
  _id: string;
  chef: string[];
  description: string;
  name: string;
  price: string;
  type: string;
}

const FormBooking: React.FC = () => {
  const [tables, setTables] = useState<{ _id: string; name: string }[]>([]);
  const [details, setDetails] = useState<UserDetails>();
  const [startDate, setStartDate] = useState(new Date());
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);
  const [selectedTableName, setSelectedTableName] = useState<string | null>(
    null
  );

  const [formData, setFormData] = useState<FormData>({
    table: "",
    user: "",
    startTime: "",
    endTime: "",
    date: "",
    dish: [],
    totalmoney: 0,
    type: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tablesResponse = await axios.get(GET_TABLES_ENDPOINT, {
          withCredentials: true,
        });
        setTables(tablesResponse.data);
        const dishesResponse = await axios.get(GET_DISHS_ENDPOINT, {
          withCredentials: true,
        });
        setDishes(dishesResponse.data);

        const validDishes = dishesResponse.data.filter(
          (dish) => dish.name && dish._id
        );
        setDishes(validDishes);

        const profileResponse = await axios.get(GET_PROFILE_USE, {
          withCredentials: true,
        });
        setDetails(profileResponse.data);

        console.log("User details:", profileResponse.data);
        console.log("Dishes fetched:", dishesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === "table") {
      setFormData({ ...formData, table: value });
      const selectedOption = event.target.selectedOptions[0];
      const dataName = selectedOption.getAttribute("data-name");
      if (dataName) {
        setSelectedTableName(dataName);
      }
    } else if (name === "dish") {
      const selectedDish = dishes.find((dish) => dish._id === value);
      if (selectedDish) {
        // Giới hạn số món ăn đã chọn tối đa là 5 món
        const updatedDishes = [...selectedDishes, selectedDish.name].slice(-5);
        setSelectedDishes(updatedDishes);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleAccept = async (e: React.FormEvent) => {
    e.preventDefault();
    const startDateTime = new Date(
      `${formData.date}T${formData.startTime}:00Z`
    );
    const endDateTime = new Date(`${formData.date}T${formData.endTime}:00Z`);
    if (details) {
      try {
        const data = {
          ...formData,
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
          dish: selectedDishes,
          type: "new",
        };

        const response = await axios.put(
          CREATE_BOOKING_ENDPOINT(formData.table),
          data
        );
        if (response.status === 200) {
          alert("Booking has been created.");
          setShowConfirmation(false);
        } else {
          alert("Error creating booking.");
        }
      } catch (error) {
        console.error("Error creating booking:", error);
        alert("Error creating booking.");
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="container mx-auto py-[11%] bg-custom-dark border-b-black">
      <div className="reservation-container text-center text-[#C9AB81] mt-10 mb-3 z-[20]">
        <div>Your table</div>
        <div className="flex items-center justify-center">
          {/* SVG elements */}
          <div className="reservation-title text-3xl text-[#C9AB81]">
            RESERVATION
          </div>
          {/* SVG elements */}
        </div>
        <form
          onSubmit={handleSubmit}
          className="form flex justify-center space-x-7 mt-16"
        >
          <div className="w-[18%]">
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date || new Date());
                setFormData({
                  ...formData,
                  date: (date || new Date()).toISOString().split("T")[0],
                });
              }}
              dateFormat="MM/dd/yyyy"
              className="text-white reservation-input border border-custom-brown p-2 text-center bg-black w-[200px] h-[60px]"
              calendarClassName="bg-[#0b1315] border border-[#c9ab81] text-center text-white"
              dayClassName={(date) =>
                "text-[#c9ab81] hover:bg-[#a88a63] hover:text-black " +
                (date.getDate() === new Date().getDate()
                  ? "bg-[#c9ab81] text-black"
                  : "")
              }
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="flex justify-between items-center px-2 py-1 bg-[#c9ab81] text-black">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    type="button"
                    className="focus:outline-none"
                  >
                    {"<"}
                  </button>
                  <span className="font-bold">
                    {date.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    type="button"
                    className="focus:outline-none"
                  >
                    {">"}
                  </button>
                </div>
              )}
            />
          </div>

          <div className="flex bg-none relative w-[39%] text-white reservation-input border border-custom-brown p-2 bg-black">
            <div className="flex w-[50%] pr-4">
              <label
                htmlFor="startTime"
                className="block text-white font-bold mb-2 my-2 mr-2"
              >
                Từ:
              </label>
              <input
                onChange={handleChange}
                type="time"
                id="startTime"
                name="startTime"
                className="border rounded p-2 w-full text-white reservation-input border-custom-brown bg-black"
              />
            </div>
            <div className="flex w-[50%] pl-4">
              <label
                htmlFor="endTime"
                className="block text-white font-bold mb-2 my-2 mr-2"
              >
                Đến:
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                onChange={handleChange}
                className="border rounded p-2 w-full text-white reservation-input border-custom-brown bg-black"
              />
            </div>
          </div>

          <select
            id="table"
            name="table"
            className="reservation-input text-white border border-custom-brown p-2 bg-black w-[18%]"
            onChange={handleSelectChange}
          >
            <option value="">Select Table Name</option>
            {tables.map((table) => (
              <option key={table._id} value={table._id} data-name={table.name}>
                {table.name}
              </option>
            ))}
          </select>

          <select
            id="dish"
            name="dish"
            className="reservation-input text-white border border-custom-brown p-2 bg-black w-[18%]"
            onChange={handleSelectChange}
          >
            <option value="">Select Dish</option>
            {dishes.map((dish) => (
              <option key={dish._id} value={dish._id} data-name={dish.name}>
                {dish.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="book-now-button border border-custom-brown bg-black hover:bg-yellow-700 text-white w-[15%] p-2"
          >
            BOOK NOW
          </button>
        </form>
      </div>

      {showConfirmation && (
        <div className="confirmation-form fixed inset-0 flex items-center justify-center bg-opacity-80 bg-black z-50">
          <div className="bg-black p-8 border border-custom-brown mx-[25%] w-[50%] relative">
            <div className="flex items-center justify-center">
              {/* SVG elements */}
              <h2 className="text-3xl text-[#C9AB81] tracking-[1px] mx-[1%] my-[30px]">
                CONFIRM YOUR BOOKING
              </h2>
              {/* SVG elements */}
            </div>

            <p className="text-[#C9AB81] ml-[20%] mb-[5px]">
              Name: {details?.name || "Not specified"}
            </p>
            <p className="text-[#C9AB81] ml-[20%] mb-[5px]">
              Phone: {details?.phone || "Not specified"}
            </p>
            <p className="text-[#C9AB81] ml-[20%] mb-[5px]">
              Table: {selectedTableName || "Not specified"}
            </p>
            <p className="text-[#C9AB81] ml-[20%] mb-[5px]">
              Dish: {selectedDishes.join(", ") || "Not specified"}
            </p>
            <p className="text-[#C9AB81] ml-[20%] mb-[5px]">
              Date: {formData.date}
            </p>
            <p className="text-[#C9AB81] ml-[20%] mb-[5px]">
              Time: {formData.startTime} - {formData.endTime}
            </p>

            <div className="flex justify-end my-10 mx-10">
              <button
                onClick={handleCancel}
                className="cancel-button border border-custom-brown bg-brown-500 hover:bg-yellow-700 text-white w-[15%] p-2 mr-5"
              >
                Cancel
              </button>
              <button
                onClick={handleAccept}
                className="accept-button border border-custom-brown bg-brown-500 hover:bg-yellow-700 text-white w-[15%] p-2"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBooking;
