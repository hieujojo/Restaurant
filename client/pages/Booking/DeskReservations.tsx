import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '@/components/layout/Navbar';
import { GET_TABLES_ENDPOINT, GET_PROFILE_USE } from "@/utils/constants/endpoints";

interface Booking {
  table: {
    name: string;
    type: string;
  };
  startTime: string;
  endTime: string;
}

interface UserDetails {
  _id: string;
  name: string;
  phone: string;
  bookings: Booking[];
}

const DeskReservation: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(GET_PROFILE_USE, {
          withCredentials: true,
        });
        const userData = userResponse.data;

        const bookingsResponse = await axios.get(
          `${GET_TABLES_ENDPOINT}/${userData._id}`,
          {
            withCredentials: true,
          }
        );
        const bookingsData = bookingsResponse.data;

        const updatedUserData = { ...userData, bookings: bookingsData };
        setUserDetails(updatedUserData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {userDetails && (
        <div className="relative top-[110px] bg-black min-h-screen container mx-auto flex flex-wrap items-center">
          <div>
            <h1 className="text-[#C9AB81]">User Details</h1>
            <p className="text-[#C9AB81]">Name: {userDetails.name}</p>
            <p className="text-[#C9AB81]">Phone: {userDetails.phone}</p>
            <h2 className="text-[#C9AB81]">Bookings</h2>
            {userDetails.bookings.map((booking, index) => (
              <div key={index}>
                <p>Table Name: {booking.table.name}</p>
                <p>Table Type: {booking.table.type}</p>
                <p>Start Time: {new Date(booking.startTime).toLocaleString()}</p>
                <p>End Time: {new Date(booking.endTime).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeskReservation;
