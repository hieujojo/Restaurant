import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Footer: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/");
  };
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <style jsx>{`
        .eltdf-btn-first-line,
        .eltdf-btn-second-line {
          transition: transform 0.5s ease;
          transform-origin: left;
          background-color: #c9ab81;
        }
        .eltdf-btn-second-line {
          transition-delay: 0.1s;
        }
        a:hover .eltdf-btn-first-line {
          transform: scaleX(0);
        }
        a:hover .eltdf-btn-second-line {
          transform: scaleX(0);
        }
      `}</style>

      <footer className="bg-[#0c1315] flex justify-center  ">
        <div className="footer-content text-center py-[12.5%]">
          <div className="logo-footer mb-[36px] cursor-pointer"
          onClick={handleNavigation}>
            <svg
              className="w-[10%] h-[10%] my-auto mx-auto"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="34.875px"
              height="46.938px"
              viewBox="0 0 34.875 46.938"
              enableBackground="new 0 0 34.875 46.938"
              xmlSpace="preserve"
            >
              <polyline
                fill="none"
                stroke="#C9AB81"
                strokeMiterlimit="10"
                points="0.5,0.003 0.5,36.438 22.875,36.438"
              ></polyline>
              <polyline
                fill="none"
                stroke="#C9AB81"
                strokeMiterlimit="10"
                points="6.5,5.003 6.5,41.438 28.875,41.438"
              ></polyline>
              <polyline
                fill="none"
                stroke="#C9AB81"
                strokeMiterlimit="10"
                points="12.5,10.003 12.5,46.438 34.875,46.438"
              ></polyline>
            </svg>
          </div>
          <div className="restaurant-info-footer text-white text-lg leading-loose">
            <h2>Laurent Restaurant & Fine Dining 71 Madison Ave</h2>
            <p>10013 New York, 914-309-7030, reservations@laurent.com</p>
            <p>Open: 09:00 am – 01:00 pm</p>
          </div>
          <ul
            id="menu-footer-menu"
            className="menu text-white text-lg flex space-x-24 mt-4"
          >
            <li
              id="menu-item-69"
              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-69"
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
              id="menu-item-71"
              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-71"
            >
              <a
                className="inline-block text-center py-2"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.tripadvisor.com/"
              >
                Trip Advisor
                <span className="eltdf-btn-first-line border border-[#C9AB81] mt-1 block w-full"></span>
                <span className="eltdf-btn-second-line border border-[#C9AB81] mt-1 block w-full"></span>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
