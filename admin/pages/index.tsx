import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/index';
import axios from 'axios'; 
import dayjs from 'dayjs'; 
import { GET_BOOKINGS_ENDPOINT, GET_TABLES_ENDPOINT, GET_USERS_ENDPOINT } from '@/utils/constants/endpoints';
import { parseCookies } from 'nookies';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

interface User {
  _id: string;
  createdAt: string; 
}
interface Booking {
  _id: string;
  type: string; 
}
ChartJS.register(ArcElement, Tooltip, Legend);
const Home = () => {
  const [users, setUsers] = useState<User[]>([]); 
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalUsersLastWeek, setTotalUsersLastWeek] = useState<number>(0);

  const fetchUsers = async () => {
    try {
      const cookies = parseCookies();
      const response = await axios.get(GET_USERS_ENDPOINT, {
        headers: {
          'Authorization': `Bearer ${cookies.auth_token}`,
        },
        withCredentials: true,
      }); 
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  useEffect(() => {
    fetchUsers(); 
    const calculateUserStats = () => {
      const total = users.length;
      const lastWeek = users.filter((user) => {
        const createdAt = dayjs(user.createdAt);
        return createdAt.isAfter(dayjs().subtract(7, 'day'));
      }).length;

      setTotalUsers(total); 
      setTotalUsersLastWeek(lastWeek);
    };
    calculateUserStats();
  }, [users]);



  const fetchBookings = async () => {
    try {
      const cookies = parseCookies();
      const respon = await axios.get(GET_BOOKINGS_ENDPOINT, {
        headers: {
          'Authorization': `Bearer ${cookies.auth_token}`,
        },
        withCredentials: true,
      }); 
      setBookings(respon.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const [totalBooking, setTotalBooking] = useState(0)
  useEffect(() => {
    fetchBookings(); 
    let total = 0;
    bookings.forEach((booking) => {
      if (booking.type === 'new') {
        total += 1; 
      }
    });
    setTotalBooking(total)
  }, [bookings]);


   const backgroundColors = [
    'rgba(255, 99, 132, 0.2)', 
    'rgba(54, 162, 235, 0.2)', 
    'rgba(255, 206, 86, 0.2)', 
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(201, 203, 207, 0.2)',
    'rgba(123, 99, 255, 0.2)',
    'rgba(99, 132, 200, 0.2)',
    'rgba(235, 64, 52, 0.2)',
  ];

  const borderColors = [
    'rgba(255, 99, 132, 1)', 
    'rgba(54, 162, 235, 1)', 
    'rgba(255, 206, 86, 1)', 
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(201, 203, 207, 1)',
    'rgba(123, 99, 255, 1)',
    'rgba(99, 132, 200, 1)',
    'rgba(235, 64, 52, 1)',
  ];

  const getColorArray = (length: number, colorArray: string[]) => {
    const colors = [];
    for (let i = 0; i < length; i++) {
      colors.push(colorArray[i % colorArray.length]); 
    }
    return colors;
  };
  const [tableData, setTableData] = useState<any[]>([]);
  const [bookingCounts, setBookingCounts] = useState<number[]>([]); 

  const fetchTables = async () => {
    try {
      const response = await axios.get(GET_TABLES_ENDPOINT); 
      setTableData(response.data); 
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  // useEffect(() => {
  //   const counts = tableData.map(table => table.booking.length);
  //   setBookingCounts(counts); 
  // }, [tableData]);

  const data = {
    labels: tableData.map(table => table.name), 
    datasets: [
      {
        label: 'Bookings per Table',
        data: bookingCounts, 
        backgroundColor: getColorArray(bookingCounts.length, backgroundColors),
        borderColor: getColorArray(bookingCounts.length, borderColors),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  return (
    <div>
      <Layout>
        <div className="row inline-block w-[100%]">
          <div className="tile_count">
            <div className="x_panel tile_stats_count">
              <span className="count_top"><i className="fa fa-user"></i> Total Users</span>
              <div className="count">{totalUsers}</div>
              <span className="count_bottom">
                <i className="green">+{((totalUsersLastWeek / totalUsers) * 100).toFixed(2)}%</i> From last Week
              </span>
            </div>
            <div className=" x_panel tile_stats_count">
              <span className="count_top"><i className="fa fa-clock-o"></i>Total Booking</span>
              <div className="count">{totalBooking}</div>
              <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc"></i> </i> </span>
            </div>
            <div className="x_panel tile_stats_count">
              <span className="count_top"><i className="fa fa-user"></i> Total Users</span>
              <div className="count">{totalUsers}</div>
              <span className="count_bottom">
                <i className="green">+{((totalUsersLastWeek / totalUsers) * 100).toFixed(2)}%</i> From last Week
              </span>
            </div>
            <div className=" x_panel tile_stats_count">
              <span className="count_top"><i className="fa fa-clock-o"></i>Total Booking</span>
              <div className="count">{totalBooking}</div>
              <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc"></i> </i> </span>
            </div>
          </div>
          <div className="w-[500px] h-[500px] top-0 ms-[100px]">
          <Pie data={data} options={options}/>
        </div>
        </div>
        
      </Layout>
    </div>
  );
}

export default Home;

