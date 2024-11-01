import React from "react";
import styles from "../../styles/component/Booking.module.css";
import Head from "next/head";
import FormBooking from "../Booking/FormBooking";
import Layout from "../Layout";

const Booking = () => {
  return (
    <Layout>
      <Head>
        <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE"></script>
      </Head>
      <div className="">
        <header
          className={`${styles.parallax} bg-center main-header bg-cover mx-auto z-[1] top-0 `}
          style={{
            backgroundImage:
              "url('https://laurent.qodeinteractive.com/wp-content/uploads/2019/12/Booking-page-title-img.jpg')",
          }}
          data-rate="scrolled * 0.1"
        >
          <div className=" flex items-center justify-center  py-[22%] space-x-2   ">
            <svg
              className="mx-[4px]"
              xmlns="http://www.w3.org/2000/svg"
              width="41.125"
              height="9.146"
            >
              <path
                fill="none"
                stroke="#9C7C57"
                stroke-miterlimit="10"
                d="M40.881 8.576L20.562.591.244 8.576"
              >
                <animate
                  attributeName="stroke-dasharray"
                  from="0, 50"
                  to="50, 0"
                  dur="1s"
                  repeatCount="1"
                />
              </path>
              <path
                fill="none"
                stroke="#9C7C57"
                stroke-miterlimit="10"
                d="M40.881.591L20.562 8.576.243.591"
              >
                <animate
                  attributeName="stroke-dasharray"
                  from="0, 50"
                  to="50, 0"
                  dur="1s"
                  repeatCount="1"
                />
              </path>
            </svg>

            <h1 className="text-x2 font-normal text-center  text-5xl text-[#C9AB81] tracking-[5px] ">
              BOOKING PAGE
            </h1>

            <svg
              className="m-[4px]"
              xmlns="http://www.w3.org/2000/svg"
              width="41.125"
              height="9.146"
            >
              <path
                fill="none"
                stroke="#9C7C57"
                stroke-miterlimit="10"
                stroke-dasharray="50"
                stroke-dashoffset="0"
                d="M40.881 8.576L20.562.591.244 8.576"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="50"
                  to="0"
                  dur="1s"
                  repeatCount="1"
                />
              </path>
              <path
                fill="none"
                stroke="#9C7C57"
                stroke-miterlimit="10"
                stroke-dasharray="50"
                stroke-dashoffset="0"
                d="M40.881.591L20.562 8.576.243.591"
              >
                <animate
                  className="-rotate-90"
                  attributeName="stroke-dashoffset"
                  from="50"
                  to="0"
                  dur="1s"
                  repeatCount="1"
                />
              </path>
            </svg>
          </div>
        </header>

        <div className="bg-black">
          <FormBooking />

          <div className="w-full  border-custom-brown absolute border-t  my-0 width-full"></div>

          <div className="LocationContactInformation bg-black mx-[70px]">
            <div className=" flex justify-between  my-[100px]">
              <div
                className=" ml-12  items-center justify-center shadow-md "
                id="map"
              ></div>
              <iframe
                className=" ml-2 w-auto my-[10%]  h-[350px] sm:h-[450px] md:h-[600px] lg:h-[450px] xl:h-[600px]"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.748817!2d-73.985428!3d40.748817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2594b7eaf1555%3A0x8e0ad7a3b6a4a3b!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1632512345678!5m2!1sen!2sus"
              ></iframe>
              <div className="w-2/5  shadow-md bg-transparent  justify-between item-center  mr-[10%]  ">
                <div className="form1 mt-12">
                  <h6 className="text-center text-custom text-[#C9AB81] font-miniver font-thin italic">
                    Visit us
                  </h6>
                  <div className=" flex items-center justify-center  ">
                    <svg
                      className="mx-[10px]"
                      xmlns="http://www.w3.org/2000/svg"
                      width="41.125"
                      height="9.146"
                    >
                      <path
                        fill="none"
                        stroke="#9C7C57"
                        stroke-miterlimit="10"
                        d="M40.881 8.576L20.562.591.244 8.576"
                      >
                        <animate
                          attributeName="stroke-dasharray"
                          from="0, 50"
                          to="50, 0"
                          dur="1s"
                          repeatCount="1"
                        />
                      </path>
                      <path
                        fill="none"
                        stroke="#9C7C57"
                        stroke-miterlimit="10"
                        d="M40.881.591L20.562 8.576.243.591"
                      >
                        <animate
                          attributeName="stroke-dasharray"
                          from="0, 50"
                          to="50, 0"
                          dur="1s"
                          repeatCount="1"
                        />
                      </path>
                    </svg>
                    <h1 className="text-center text-custom text-[#C9AB81] text-5xl">
                      FIND US
                    </h1>
                    <svg
                      className="mx-[10px]"
                      xmlns="http://www.w3.org/2000/svg"
                      width="41.125"
                      height="9.146"
                    >
                      <path
                        fill="none"
                        stroke="#9C7C57"
                        stroke-miterlimit="10"
                        d="M40.881 8.576L20.562.591.244 8.576"
                      >
                        <animate
                          attributeName="stroke-dasharray"
                          from="0, 50"
                          to="50, 0"
                          dur="1s"
                          repeatCount="1"
                        />
                      </path>
                      <path
                        fill="none"
                        stroke="#9C7C57"
                        stroke-miterlimit="10"
                        d="M40.881.591L20.562 8.576.243.591"
                      >
                        <animate
                          attributeName="stroke-dasharray"
                          from="0, 50"
                          to="50, 0"
                          dur="1s"
                          repeatCount="1"
                        />
                      </path>
                    </svg>
                  </div>
                </div>
                <div className="row flex flex-wrap justify-between text-center text-lg my-[80px]">
                  <ul className="flex flex-wrap w-full justify-between ">
                    <li className="mx-[5px] w-[calc(50%-20px)] mb-10">
                      <strong className="text-custom text-[#C9AB81]">
                        MANHATTAN
                      </strong>
                      <p className="text-white mt-2 font-thin">
                        71 Madison Ave
                      </p>
                      <p className="text-white mt-2 font-thin">
                        914-309-7011 , 914-329-213
                      </p>
                      <p className="text-white mt-2 font-thin">
                        reservations@laurent.com
                      </p>
                    </li>
                    <li className="mx-[5px] w-[calc(50%-20px)] mb-10">
                      <strong className="text-custom text-[#C9AB81]">
                        RAHWAY
                      </strong>
                      <p className="text-white mt-2 font-thin">
                        71 Madison Ave
                      </p>
                      <p className="text-white mt-2 font-thin">
                        914-309-7011 , 914-329-213
                      </p>
                      <p className="text-white mt-2 font-thin">
                        reservations@laurent.com
                      </p>
                    </li>
                    <li className="mx-[5px] w-[calc(50%-20px)]">
                      <strong className="text-custom text-[#C9AB81]">
                        BROOKLYN
                      </strong>
                      <p className="text-white mt-2 font-thin">
                        71 Madison Ave
                      </p>
                      <p className="text-white mt-2 font-thin">
                        914-309-7011 , 914-329-213
                      </p>
                      <p className="text-white mt-2 font-thin">
                        reservations@laurent.com
                      </p>
                    </li>
                    <li className="mx-[5px] w-[calc(50%-20px)]">
                      <strong className="text-custom text-[#C9AB81]">
                        NEW JERSEY
                      </strong>
                      <p className="text-white mt-2">71 Madison Ave</p>
                      <p className="text-white mt-2">
                        914-309-7011 , 914-329-213
                      </p>
                      <p className="text-white mt-2">
                        reservations@laurent.com
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="separator border-t border-custom-brown   my-0 width-full"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Booking;
