import React from "react";
import Link from "next/link";
import style from "../../styles/component/Navbar.module.css";

const Navbar = () => {
  return (
    <>
      <div className="relative z-50">
        <nav className="p-4 flex relative justify-evenly bg-0">
          <ul className="list-none flex justify-center p-0 mt-5">
            <li className="relative mx-2 group">
              <Link href="/" legacyBehavior>
                <div className="tracking-[5px] relative text-white hover:text-gray-400 capitalize transition duration-500 ease-in-out font-open-sans-condensed text-lg">
                  HOME
                  <div className="absolute left-0 w-full mt-3">
                    <div className="absolute inset-x-0 bottom-0 border-t-2 border-[#C9AB81] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
                    <div className="absolute inset-x-0 bottom-1 border-t-2 border-[#C9AB81] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
                  </div>
                </div>
              </Link>
              <div className=" absolute left-0 mt-[73%] w-52 bg-custom-dark px-3 text-white transform scale-y-0 origin-top transition-transform duration-500 ease-in-out group-hover:scale-y-100 z-50">
                <a
                  id="mh"
                  className={`relative text-white hover:text-gray-400 capitalize transition duration-500 ease-in-out font-open-sans-condensed text-lg ${style.link}`}
                >
                  <div className="absolute left-0 w-full">
                    <div
                      className={`${style.eltdf_btn_first_line} absolute inset-x-0 bottom-0 border-t-2 border-[#C9AB81] transform scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out`}
                    ></div>
                    <div
                      className={`${style.eltdf_btn_second_line} absolute inset-x-0 bottom-1 border-t-2 border-[#C9AB81] transform scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out`}
                    ></div>
                  </div>
                </a>
                <div className="my-[1%] inline-block">
                  {["Main Home"].map((item) => (
                    <a
                      href={item === "Main Home" ? "/" : "#"}
                      className={` inline-block px-3 py-2 ${style.link}`}
                      key={item}
                    >
                      {item}
                      <span
                        className={`${style.eltdf_btn_first_line} border border-[#C9AB81] mt-1 block w-full`}
                      ></span>
                      <span
                        className={`${style.eltdf_btn_second_line} border border-[#C9AB81] mt-1 block w-full`}
                      ></span>
                    </a>
                  ))}
                </div>
              </div>
            </li>

            <li className="relative mx-2 group">
              <Link href="/Contact/map" legacyBehavior>
                <a
                  className={`tracking-[5px] relative text-white hover:text-gray-400 capitalize transition duration-500 ml-10 ease-in-out font-open-sans-condensed text-lg ${style.link}`}
                >
                  PAGES
                  <div className="absolute left-0 w-full mt-3">
                    <div className="absolute inset-x-0 bottom-0 border-t-2 border-[#C9AB81] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
                    <div className="absolute inset-x-0 bottom-1 border-t-2 border-[#C9AB81] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
                  </div>
                </a>
              </Link>
              <div className="my-[1 %]"></div>
              <div className="inline-block absolute left-0 mt-[40%] w-52 bg-custom-dark px-3 text-white transform scale-y-0 origin-top transition-transform duration-500 ease-in-out group-hover:scale-y-100">
                <div className="flex flex-col space-y-2">
                  {" "}
                  {/* {["Booking Page", "Profile"].map((item) => (
                    <Link
                      href={
                        item === "Profile"
                          ? "/Profile/Profile"
                          : item === "Booking Page"
                          ? "/Booking/Booking"
                          : "#"
                      }
                      key={item}
                    >
                      <span
                        className={`inline-block px-3 py-2 hover:bg-gray-700 ${style.link}`}
                      >
                        {item}
                        <span
                          className={`${style.eltdf_btn_first_line} border border-[#C9AB81] mt-1 block w-full`}
                        ></span>
                        <span
                          className={`${style.eltdf_btn_second_line} border border-[#C9AB81] mt-1 block w-full`}
                        ></span>
                      </span>
                    </Link>
                  ))} */}
                  <Link href="/Contact/map" legacyBehavior>
                    <span
                      className={`inline-block px-3 py-2 hover:bg-gray-700 ${style.link}`}
                    >
                      Contact Us
                      <span
                        className={`${style.eltdf_btn_first_line} border border-[#C9AB81] mt-1 block w-full`}
                      ></span>
                      <span
                        className={`${style.eltdf_btn_second_line} border border-[#C9AB81] mt-1 block w-full`}
                      ></span>
                    </span>
                  </Link>
                  <Link href="/Chefs/OurChefs" legacyBehavior>
                    <span
                      className={`inline-block px-3 py-2 hover:bg-gray-700 ${style.link}`}
                    >
                      Our Chefs
                      <span
                        className={`${style.eltdf_btn_first_line} border border-[#C9AB81] mt-1 block w-full`}
                      ></span>
                      <span
                        className={`${style.eltdf_btn_second_line} border border-[#C9AB81] mt-1 block w-full`}
                      ></span>
                    </span>
                  </Link>
                </div>
              </div>
            </li>

            <li className="relative mx-2 group">
              <Link href="/Portfolio/dish" legacyBehavior>
                <a
                  className={`tracking-[5px] relative text-white hover:text-gray-400 capitalize transition duration-500 ml-10 ease-in-out font-open-sans-condensed text-lg ${style.link}`}
                >
                  PORTFOLIO
                  <div className="absolute left-0 w-full mt-3">
                    <div className="absolute inset-x-0 bottom-0 border-t-2 border-[#C9AB81] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
                    <div className="absolute inset-x-0 bottom-1 border-t-2 border-[#C9AB81] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
                  </div>
                </a>
              </Link>

              <div className="inline-block absolute left-0 mt-[47%] w-52 bg-custom-dark px-3 text-white transform scale-y-0 origin-top transition-transform duration-500 ease-in-out group-hover:scale-y-100">
                {["Portfolio Types"].map((item) => (
                  <Link href="/Portfolio/dish" key={item} legacyBehavior>
                    <span
                      className={`inline-block px-3 py-2 hover:bg-gray-700 ${style.link}`}
                    >
                      {item}
                      <span
                        className={`${style.eltdf_btn_first_line} border border-[#C9AB81] mt-1 block w-full`}
                      ></span>
                      <span
                        className={`${style.eltdf_btn_second_line} border border-[#C9AB81] mt-1 block w-full`}
                      ></span>
                    </span>
                  </Link>
                ))}
              </div>
            </li>

            <li className="relative mx-2 group">
              <Link href="/Blog/BlogClassic" legacyBehavior>
                <a
                  className={`tracking-[5px] relative text-white hover:text-gray-400 capitalize transition duration-500 ml-10 ease-in-out font-open-sans-condensed text-lg ${style.link}`}
                >
                  BLOG
                  <div className="absolute left-0 w-full mt-3">
                    <div className="absolute inset-x-0 bottom-0 border-t-2 border-[#C9AB81] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
                    <div className="absolute inset-x-0 bottom-1 border-t-2 border-[#C9AB81] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
                  </div>
                </a>
              </Link>
              <div className="my-[1%]"></div>
              <div className="inline-block absolute left-0 w-52 mt-[44%] bg-custom-dark px-3 text-white transform scale-y-0 origin-top transition-transform duration-500 ease-in-out group-hover:scale-y-100">
                {["Blog Classic", "Blog Standard"].map((item) => (
                  <a
                    href={
                      item === "Blog Classic"
                        ? "/Blog/BlogClassic"
                        : item === "Blog Standard"
                        ? "/Blog/BlogStandard"
                        : "#"
                    }
                    className={`inline-block px-3 py-2 hover:bg-gray-700 ${style.link}`}
                    key={item}
                  >
                    {item}
                    <span
                      className={`${style.eltdf_btn_first_line} border border-[#C9AB81] mt-1 block w-full`}
                    ></span>
                    <span
                      className={`${style.eltdf_btn_second_line} border border-[#C9AB81] mt-1 block w-full`}
                    ></span>
                  </a>
                ))}
              </div>
            </li>

            {/* <li className="relative mx-2 group">
              <Link href="/shop" legacyBehavior>
                <a
                  className={`tracking-[5px] relative text-white hover:text-gray-400 capitalize transition duration-500 ml-10 ease-in-out font-open-sans-condensed text-lg ${style.link}`}
                >
                  SHOP
                  <div className="absolute left-0 w-full mt-1">
                    <div className="absolute inset-x-0 bottom-0 border-t-2 border-[#C9AB81] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
                    <div className="absolute inset-x-0 bottom-1 border-t-2 border-[#C9AB81] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
                  </div>
                </a>
              </Link>
              <div className="my-[1%]"></div>
            </li> */}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
