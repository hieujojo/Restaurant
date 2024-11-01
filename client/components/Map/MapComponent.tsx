import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import Layout from "@/components/Layout";

const DynamicMap = dynamic(() => import('../Map/LeafletMap'), {
  ssr: false,
});

const MapComponent = () => {
  const [position, setPosition] = useState([16.047079, 108.206230]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Không thể lấy vị trí, mặc định ở Đà Nẵng", error);
        }
      );
    }
  }, []);

  return (
    <Layout>
      <div className="h-[107px]"></div>
      <div className="h-[1000px] absolute"></div>
      <div className="bg-[#0c1315]">
        <div className="h-[400px] w-[80%] ml-40 mt-20 z-10">
          <DynamicMap position={position} />
        </div>

        <div className="flex h-[400px] ml-28 mt-28" style={{ transform: "scale(0.8)", transformOrigin: "top left" }}>
          <div>
            <p className="text-custom-yellow font-miniver text-xl ml-96 mt-10">Write to us</p>
            <div className="ml-44 mt-5">
              <div className="flex">
                <svg className="mt-11" xmlns="http://www.w3.org/2000/svg" width="41.125" height="9.146">
                  <path fill="none" stroke="#9C7C57" strokeMiterlimit="10" d="M40.881 8.576L20.562.591.244 8.576"></path>
                  <path fill="none" stroke="#9C7C57" strokeMiterlimit="10" d="M40.881.591L20.562 8.576.243.591"></path>
                </svg>
                <div className="flex text-custom-yellow text-7xl ml-5">
                  <p className="tracking-[10px]">contact</p>
                  <p className="ml-7 tracking-[10px]">us</p>
                </div>
                <svg className="ml-5 mt-11" xmlns="http://www.w3.org/2000/svg" width="41.125" height="9.146">
                  <path fill="none" stroke="#9C7C57" strokeMiterlimit="10" d="M40.881 8.576L20.562.591.244 8.576"></path>
                  <path fill="none" stroke="#9C7C57" strokeMiterlimit="10" d="M40.881.591L20.562 8.576.243.591"></path>
                </svg>
              </div>
            </div>
            <div className="mt-16 ml-32 flex items-center justify-center">
              <form className="space-y-6 w-full ml-10">
                <div>
                  <label htmlFor="name" className="sr-only text-white">Name</label>
                  <input id="name" name="name" type="text" placeholder="Name" className="block w-full px-4 py-3 border border-custom-yellow text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-custom-yellow focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">E-mail</label>
                  <input id="email" name="email" type="email" placeholder="E-mail" className="block w-full px-4 py-3 border border-custom-yellow text-custom-yellow bg-transparent focus:outline-none focus:ring-2 focus:ring-custom-yellow focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea id="message" name="message" placeholder="Message" className="block w-full h-32 px-4 py-3 border border-custom-yellow text-custom-yellow bg-transparent focus:outline-none focus:ring-2 focus:ring-custom-yellow focus:border-transparent"></textarea>
                </div>
                <div className="flex justify-center">
                  <button type="submit" className="px-6 py-2 border border-custom-yellow text-white bg-transparent hover:bg-custom-yellow hover:text-custom-dark transition duration-500 w-32 h-12 tracking-[5px]">SEND</button>
                </div>
              </form>
            </div>
          </div>

          <div className="flex items-center justify-center ml-40 mt-52">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-4xl px-8">
              {["MANHATTAN", "RAHWAY", "BROOKLIN", "NEW JERSEY"].map((location) => (
                <div key={location} className="text-center space-y-2 text-white">
                  <h2 className="text-2xl font-semibold tracking-wider text-custom-yellow">{location}</h2>
                  <p className="text-xl">71 Madison Ave</p>
                  <p className="text-xl">914-309-7011 , 914-329-2131</p>
                  <p className="text-xl">reservations@laurent.com</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MapComponent;
