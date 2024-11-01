import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { GET_TABLES_ENDPOINT } from "@/utils/constants/endpoints";

interface BookingData {
  _id: string;
  type: string;
  quantity: number;
  description: string;
  image: string[];
  booking: Booking[];
}

interface Booking {
  time: Date;
  dish: string[];
  totalmoney: number;
  user: string;
  type: string;
}

const DeskReservations: React.FC = () => {
  const [bookingData, setBookingData] = useState<BookingData>();

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(GET_TABLES_ENDPOINT, {
          withCredentials: true,
        });
        setBookingData(response.data);
        console.log("gygyugu",bookingData);
      } catch (error) {
        console.error("Error fetching booking:", error);
      }
    };

    fetchBookingData();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto py-[11%] border-b-black">
        <div className="relative top-[110px] bg-black min-h-screen container mx-auto flex flex-wrap items-center">
          <div className="w-full md:w-1/2 p-5">
          
            <h1 className="text-center text-2xl text-[#C9AB81]">Booking Details:</h1>
            <div className="mt-5 ml-[25%] text-white h-[100%] w-[60%] justify-items-center">
              {bookingData?.image && bookingData.image.length > 0 ? (
                bookingData.image.map((img, index) => (
                  <img key={index} src={img} alt={`Image ${index + 1}`} />
                ))
              ) : (
                <p>No image available</p>
              )}
            </div>

            <div className="flex items-center my-4">
              <label htmlFor="tableId" className="block text-lg font-medium text-[#C9AB81] w-1/3">Table ID:</label>
              <div className="w-2/3 ml-[-40px]">
                <span id="tableId" className="h-10 text-[#f9f9f8] rounded pl-2">
                  {bookingData?._id || "Not specified"}
                </span>
                <div className="border-b border-[#C9AB81] mt-1"></div>
              </div>
            </div>

            <div className="flex items-center my-4">
              <label htmlFor="type" className="block text-lg font-medium text-[#C9AB81] w-1/3">Type:</label>
              <div className="w-2/3 ml-[-40px]">
                <span id="type" className="h-10 text-[#f9f9f8] rounded pl-2">
                  {bookingData?.type || "Not specified"}
                </span>
                <div className="border-b border-[#C9AB81] mt-1"></div>
              </div>
            </div>

            <div className="flex items-center my-4">
              <label htmlFor="quantity" className="block text-lg font-medium text-[#C9AB81] w-1/3">Quantity:</label>
              <div className="w-2/3 ml-[-40px]">
                <span id="quantity" className="h-10 text-[#f9f9f8] rounded pl-2">
                  {bookingData?.quantity || "Not specified"}
                </span>
                <div className="border-b border-[#C9AB81] mt-1"></div>
              </div>
            </div>

            <div className="flex items-center my-4">
              <label htmlFor="description" className="block text-lg font-medium text-[#C9AB81] w-1/3">Description:</label>
              <div className="w-2/3 ml-[-40px]">
                <span id="description" className="h-10 text-[#f9f9f8] rounded pl-2">
                  {bookingData?.description || "Not specified"}
                </span>
                <div className="border-b border-[#C9AB81] mt-1"></div>
              </div>
            </div>

            
          </div>
        </div>

        <div className="relative top-[-70px] bg-black min-h-screen container mx-auto flex flex-wrap items-center">
          <div className="w-full md:w-1/2 p-5">
          <h2 className="text-center text-2xl text-[#C9AB81] ">Booking Details Details :</h2>
            {bookingData?.booking.map((booking, index) => (
              <div key={index} >
    
                <div className="flex items-center my-4">
                  <label htmlFor={`time-${index}`} className="block text-lg font-medium text-[#C9AB81] w-1/3">Time:</label>
                  <div className="w-2/3 ml-[-40px]">
                    <span id={`time-${index}`} className="h-10 text-[#f9f9f8] rounded pl-2">
                      {new Date(booking.time).toLocaleString() || "Not specified"}
                    </span>
                    <div className="border-b border-[#C9AB81] mt-1"></div>
                  </div>
                </div>

                <div className="flex items-center my-4">
                  <label htmlFor={`dishes-${index}`} className="block text-lg font-medium text-[#C9AB81] w-1/3">Dishes:</label>
                  <div className="w-2/3 ml-[-40px]">
                    <span id={`dishes-${index}`} className="h-10 text-[#f9f9f8] rounded pl-2">
                      {booking.dish.join(', ') || "Not specified"}
                    </span>
                    <div className="border-b border-[#C9AB81] mt-1"></div>
                  </div>
                </div>

                <div className="flex items-center my-4">
                  <label htmlFor={`totalmoney-${index}`} className="block text-lg font-medium text-[#C9AB81] w-1/3">Total Money:</label>
                  <div className="w-2/3 ml-[-40px]">
                    <span id={`totalmoney-${index}`} className="h-10 text-[#f9f9f8] rounded pl-2">
                      {booking.totalmoney || "Not specified"}
                    </span>
                    <div className="border-b border-[#C9AB81] mt-1"></div>
                  </div>
                </div>

                <div className="flex items-center my-4">
                  <label htmlFor={`user-${index}`} className="block text-lg font-medium text-[#C9AB81] w-1/3">User:</label>
                  <div className="w-2/3 ml-[-40px]">
                    <span id={`user-${index}`} className="h-10 text-[#f9f9f8] rounded pl-2">
                      {booking.user || "Not specified"}
                    </span>
                    <div className="border-b border-[#C9AB81] mt-1"></div>
                  </div>
                </div>

                <div className="flex items-center my-4">
                  <label htmlFor={`status-${index}`} className="block text-lg font-medium text-[#C9AB81] w-1/3">Status:</label>
                  <div className="w-2/3 ml-[-40px]">
                    <span id={`status-${index}`} className="h-10 text-[#f9f9f8] rounded pl-2">
                      {booking.type || "Not specified"}
                    </span>
                    <div className="border-b border-[#C9AB81] mt-1"></div>
                  </div>
                </div>
              </div>
            ))}
            </div>
            </div>
      </div>
    </Layout>
  );
};

export default DeskReservations;
