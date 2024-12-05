import { useState, useRef, useEffect } from "react";
import Layout from "@/components/Layout";
import Slide from "./Slide";
import BannerHome from "./bannerHome";
import CardDish from "./CardDish";
import Link from "next/link";
import styled from "styled-components";

const HomeComponents = () => {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const videoContainerRef = useRef(null);

  const handlePlayClick = () => {
    setIsVideoVisible(true);
  };

  const handleClickOutside = (event: { target: any }) => {
    if (
      videoContainerRef.current &&
      !videoContainerRef.current.contains(event.target)
    ) {
      setIsVideoVisible(false);
    }
  };

  useEffect(() => {
    if (isVideoVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVideoVisible]);

  const ResponsiveImage = styled.img`
    max-width: 430px;

    @media (max-width: 1024px) {
      max-width: 190px;
      height: 550px;
    }
  `;

  const ResponsiveImage1 = styled.img`
    max-width: 500px;

    @media (max-width: 1024px) {
      max-width: 250px;
      height: 250px;
    }
  `;

  const OurBestContainer = styled.div`
    .recommendation-text {
      color: #c9ab81;
      margin-left: 24rem;
      margin-top: 2.5rem;
    }

    .header-section {
      display: flex;
      margin-top: 1.75rem;
      margin-left: 13rem;
      align-items: center;
    }

    .title {
      color: #c9ab81;
      letter-spacing: 5px;
      font-size: 3rem;
      text-transform: uppercase;
      width: 25rem;
      text-align: center;
    }

    .description {
      color: white;
      width: 31.25rem;
      margin-top: 2.5rem;
      font-size: 1.125rem;
      text-align: center;
      margin-left: 13rem;
    }

    .button-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .view-all-button {
      border: 1px solid #c9ab81;
      color: white;
      padding: 0.75rem 2rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      margin-top: 2.5rem;
      margin-left: 11rem;
      transition: background-color 0.3s, color 0.3s;

      &:hover {
        background-color: #c9ab81;
        color: #0b1315;
      }
    }

    @media (max-width: 1024px) {
      .recommendation-text {
        margin-left: 13rem;
        font-size: 1.25rem;
      }

      .header-section {
        flex-direction: column;
        margin-left: 2rem;
        text-align: center;
      }
      .icon {
        display: none;
      }

      .title {
        font-size: 30px;
        width: 80%;
        margin-right: 100px;
        margin-top: -10px;
      }

      .description {
        margin-left: 60px;
        width: 70%;
        margin-top: 10px;
      }

      .view-all-button {
        margin-right: 240px;
      }
    }
  `;

  return (
    <Layout>
      <BannerHome />
      <div className="bg-black">
        <div className="flex justify-center h-full">
          <div>
            <div className="text-center text-2xl mt-20 text-[#c9ab81]">
              Our Story
            </div>
            <div className="flex mt-8">
              <svg
                className="mt-7"
                xmlns="http://www.w3.org/2000/svg"
                width="41.125"
                height="9.146"
              >
                <path
                  fill="none"
                  stroke="#9C7C57"
                  strokeMiterlimit={10}
                  d="M40.881 8.576L20.562.591.244 8.576"
                />
                <path
                  fill="none"
                  stroke="#9C7C57"
                  strokeMiterlimit={10}
                  d="M40.881.591L20.562 8.576.243.591"
                />
              </svg>
              <p className="text-[#c9ab81] tracking-[7px] uppercase text-6xl ml-7">
                about
              </p>
              <p className="text-[#c9ab81] tracking-[7px] uppercase text-6xl ml-7">
                us
              </p>
              <svg
                className="mt-7 ml-7"
                xmlns="http://www.w3.org/2000/svg"
                width="41.125"
                height="9.146"
              >
                <path
                  fill="none"
                  stroke="#9C7C57"
                  strokeMiterlimit={10}
                  d="M40.881 8.576L20.562.591.244 8.576"
                />
                <path
                  fill="none"
                  stroke="#9C7C57"
                  strokeMiterlimit={10}
                  d="M40.881.591L20.562 8.576.243.591"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="text-white flex justify-center mt-5 text-lg">
          <p className="w-[600px] text-center">
            Lorem ipsum dolor sit amet, consectet adipisicing eli sed do eiu sm
            od tempor incididunt ut abore et dolore mag aliqua. Ut enim ad minm
            eniam quis nostrud.
          </p>
        </div>
        <div className="flex mt-8 justify-center">
          <div>
            <ResponsiveImage
              src="https://laurent.qodeinteractive.com/wp-content/uploads/2019/10/main-img-1.jpg"
              alt="Responsive Image"
            />
          </div>
          <div className="ml-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="289.828"
              height="543.424"
            >
              <path
                className="animate-draw"
                fill="none"
                stroke="#9A7D57"
                strokeWidth="1.5"
                strokeMiterlimit={10}
                d="M0 0l72.457 72.457L0 144.913l72.457 72.457L0 289.826l72.457 72.456L0 434.739l72.457 72.456-36.229 36.229M72.457 0L0 72.457l72.457 72.457L0 217.37l72.457 72.457L0 362.282l72.457 72.457L0 507.195l36.229 36.229m72.457 0l36.229-36.229-72.457-72.456 72.457-72.457-72.457-72.456 72.457-72.457-72.457-72.457 72.457-72.457L72.457 0m72.457 0L72.457 72.457l72.457 72.457-72.457 72.456 72.457 72.457-72.457 72.456 72.457 72.457-72.457 72.456 36.229 36.229m72.457-.001l36.229-36.229-72.457-72.456 72.457-72.457-72.457-72.456 72.457-72.457-72.457-72.457 72.457-72.457L144.914 0m72.457 0l-72.457 72.457 72.457 72.457-72.457 72.457 72.457 72.457-72.457 72.456 72.457 72.457-72.457 72.456 36.229 36.229m72.457-.002l36.229-36.229-72.457-72.456 72.457-72.457-72.457-72.456 72.457-72.457-72.457-72.457 72.457-72.457L217.371 0m72.457 0l-72.457 72.457 72.457 72.457-72.457 72.457 72.457 72.457-72.457 72.456 72.457 72.457-72.457 72.456 36.229 36.229M18.113 54.343L0 36.229m54.342-18.115L36.229 0M18.113 18.114L36.228 0M126.8 18.114L108.686 0M90.571 18.114L108.686 0m90.571 18.114L181.143 0m0 0l-18.114 18.114m108.56 0L253.475 0M235.36 18.114L253.475 0m18.24 54.343l18.113-18.114m-271.715 90.57L0 108.685m271.715 18.114l18.113-18.114M18.113 199.256L0 181.142m271.715 18.114l18.113-18.114m-271.715 90.57L0 253.598m271.715 18.114l18.113-18.114M72.457 0v36.229L90.57 54.343m-36.029 0l17.916-18.114M144.914 0v36.229l18.113 18.114m-36.029 0l17.916-18.114M217.368 0v36.229l18.114 18.114M36.229 36.229v36.229l18.113 18.114m54.344-54.343v36.229L126.8 90.571m54.343-54.342v36.229l18.114 18.114M253.6 36.229v36.229l18.113 18.114m-72.262-36.229l17.917-18.114M72.457 72.457v36.229L90.57 126.8m-36.029-.001l17.916-18.114m72.457-36.228v36.229l18.113 18.114m-36.029-.001l17.916-18.114m72.447-36.228v36.229l18.114 18.114m-36.03-.001l17.916-18.114M72.457 144.913v36.229l18.113 18.114m-36.029 0l17.916-18.114m72.457-36.229v36.229l18.113 18.114m-36.029 0l17.916-18.114m72.447-36.229v36.229l18.114 18.114m-36.03 0l17.916-18.114M72.457 217.37v36.229l18.113 18.114m-36.029-.001l17.916-18.114m72.457-36.228v36.229l18.113 18.114m-36.029-.001l17.916-18.114m72.447-36.228v36.229l18.114 18.114m-36.03-.001l17.916-18.114M72.457 289.827v36.229L90.57 344.17m-36.029 0l17.916-18.114m72.457-36.229v36.229l18.113 18.114m-36.029 0l17.916-18.114m72.447-36.229v36.229l18.114 18.114m-36.03 0l17.916-18.114M72.457 362.282v36.229l18.113 18.114m-36.029 0l17.916-18.114m72.457-36.229v36.229l18.113 18.114m-36.029 0l17.916-18.114m72.447-36.229v36.229l18.114 18.114m-36.03 0l17.916-18.114M72.457 434.739v36.229l18.113 18.114m-36.029 0l17.916-18.114m72.457-36.229v36.229l18.113 18.114m-36.029 0l17.916-18.114m72.447-36.229v36.229l18.114 18.114m-36.03 0l17.916-18.114M18.313 90.571l17.916-18.114M90.77 90.571l17.916-18.114m54.541 18.114l17.916-18.114m54.541 18.114L253.6 72.457M36.229 108.685v36.229l18.113 18.114m54.344-54.343v36.229l18.114 18.114m54.343-54.343v36.229l18.114 18.114m54.343-54.343v36.229l18.113 18.114m-253.4 0l17.916-18.114m54.541 18.114l17.916-18.114m72.457 0l-17.916 18.114m72.457 0l17.916-18.114M36.229 181.142v36.229l18.113 18.114m54.344-54.343v36.229l18.114 18.114m54.343-54.343v36.229l18.114 18.114m54.343-54.343v36.229l18.113 18.114m-253.4-.001l17.916-18.114m54.541 18.114l17.916-18.114m72.457 0l-17.916 18.114m72.457 0L253.6 217.37M36.229 253.598v36.228l18.113 18.115m54.344-54.343v36.228l18.114 18.115m54.343-54.343v36.228l18.114 18.115m54.343-54.343v36.228l18.113 18.115m-253.4 0l17.916-18.115m54.541 18.115l17.916-18.115m54.541 18.115l17.916-18.115m54.541 18.115l17.916-18.115M18.113 344.159L0 326.046m271.715 18.113l18.113-18.113M18.113 416.625L0 398.512m271.715 18.113l18.113-18.113M18.113 489.081L0 470.968m271.715 18.113l18.113-18.113M36.229 326.046v36.228l18.113 18.115m54.344-54.343v36.228l18.114 18.115m54.343-54.343v36.228l18.114 18.115m54.343-54.343v36.228l18.113 18.115m-253.4 0l17.916-18.115m54.541 18.115l17.916-18.115m72.457-.001l-17.916 18.115m90.373-18.115l-17.916 18.115M36.229 398.511v36.228l18.113 18.115m54.344-54.343v36.228l18.114 18.115m54.343-54.343v36.228l18.114 18.115m54.343-54.343v36.228l18.113 18.115m-253.4 0l17.916-18.115m54.541 18.115l17.916-18.115m54.541 18.115l17.916-18.115m54.541 18.115l17.916-18.115M36.229 470.968v36.228l18.113 18.115m54.344-54.343v36.228l18.114 18.115m54.343-54.343v36.228l18.114 18.115m54.343-54.343v36.228l18.113 18.115m-253.4 0l17.916-18.115m54.541 18.115l17.916-18.115m54.541 18.115l17.916-18.115m72.457-.001l-17.916 18.115M72.457 507.195v36.229m72.457-36.229v36.229m72.457-36.229v36.229"
              />
            </svg>
          </div>
          <div className="ml-10">
            <ResponsiveImage
              src="https://laurent.qodeinteractive.com/wp-content/uploads/2019/10/main-img-2.jpg"
              alt="Responsive Image"
            />
          </div>
        </div>
        <Slide />
        <div className="flex mt-52 ml-32">
          <div className="">
            <ResponsiveImage1
              src="https://laurent.qodeinteractive.com/wp-content/uploads/2019/10/main-img-5.jpg"
              alt="ResponsiveImage1"
            />
          </div>
          <OurBestContainer>
            <div>
              <p className="recommendation-text">Recommendations</p>
            </div>
            <div className="header-section">
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                width="41.125"
                height="9.146"
              >
                <path
                  fill="none"
                  stroke="#9C7C57"
                  strokeMiterlimit={10}
                  d="M40.881 8.576L20.562.591.244 8.576"
                />
                <path
                  fill="none"
                  stroke="#9C7C57"
                  strokeMiterlimit={10}
                  d="M40.881.591L20.562 8.576.243.591"
                />
              </svg>
              <p className="title">Our best specialties</p>
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                width="41.125"
                height="9.146"
              >
                <path
                  fill="none"
                  stroke="#9C7C57"
                  strokeMiterlimit={10}
                  d="M40.881 8.576L20.562.591.244 8.576"
                />
                <path
                  fill="none"
                  stroke="#9C7C57"
                  strokeMiterlimit={10}
                  d="M40.881.591L20.562 8.576.243.591"
                />
              </svg>
            </div>
            <div>
              <p className="description">
                Lorem ipsum dolor sit amet, consectet adipisicing eli sed do eiu
                smotem por incididunt ut abore et dolore magali qua. Ut enim ad
                minm eni amquis nostrud exercitation.
              </p>
            </div>
            <div className="button-container">
              <button className="view-all-button">view all</button>
            </div>
          </OurBestContainer>
        </div>
        <div className="bg-[#0f1d22] w-full mt-20 text-[#c9ab81] relative h-[947px] lg:h-[1480px] xl:h-[950px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="eltdf-main-home-svg-pattern absolute xl:top-[623px] left-[-100px] md:left-[-140px] lg:top-[1153px]"
            width="326.209"
            height="326"
            viewBox="0 0 326 70"
          >
            <path
              fill="none"
              stroke="#9A7D57"
              stroke-width="1.5"
              stroke-miterlimit="10"
              d="M39.856 56.993l16.741 28.924-55.01 95.043m27.896 74.47l27.114-46.848-50.59-87.406M88.565 18.483l39.03 67.434-70.997 122.666 64.441 111.339m-46.054-20.445l52.61-90.895L56.598 85.917l41.716-72.073M149.435.983l49.159 84.934-70.998 122.666 65.97 113.979m-60.944.002l65.972-113.981-70.998-122.666L176.753.987m51.125 12.859l41.714 72.07-70.998 122.666 52.61 90.896m-46.056 20.443l64.443-111.339-70.997-122.665 39.032-67.438m82.557 102.695l-50.591 87.408 27.113 46.845M286.332 56.994l-16.74 28.923 55.01 95.041M80.314 44.94V27.5l-1.891-3.31m-33.608 82.083v-17.44L32.157 66.667M9.316 167.606v-17.439l-6.85-11.997m42.349 90.769V211.5l-23.712-41.521-16.819 29.48m76.03 90.813v-17.439l-23.712-41.521-19.52 34.214m67.548 49.057l-12.528-21.938-7.26 12.725m96.399 19.041L163.1 292.644l-18.128 31.773m96.385-19.061l-7.26-12.712-12.511 21.927m-70.313-24.299v-17.439l-23.712-41.521-23.722 41.578v17.383m118.472-.001v-17.439l-23.712-41.521-23.722 41.578v17.383m114.247-24.769l-19.527-34.193-23.722 41.578v17.383m-130.062-61.333V211.5l-23.712-41.521-23.721 41.577v17.383m118.432 0V211.5L163.1 169.978l-23.722 41.578v17.383m118.432 0V211.5l-23.712-41.521-23.722 41.578v17.383m111.225-30.06l-16.505-28.902-23.722 41.578v17.383m-201.06-61.333v-17.439l-23.712-41.521-23.722 41.578v17.383m118.393-.001v-17.439l-23.712-41.521-23.722 41.578v17.383m118.472-.001v-17.439l-23.712-41.521-23.722 41.578v17.383m118.432-.001v-17.439l-23.712-41.521-23.722 41.578v17.383m77.853-29.399l-6.854 12.015v17.383m-201.061-61.333v-17.44L92.102 47.312 68.38 88.89v17.383m118.432 0v-17.44L163.1 47.312 139.378 88.89v17.383m118.432 0v-17.44l-23.712-41.521-23.722 41.578v17.383m83.67-39.593l-12.672 22.21v17.383M151.313 44.94V27.5l-14.28-25.007m-21.748 5.072l-11.406 19.992V44.94m118.432 0V27.5L210.923 7.561m-21.752-5.06l-14.294 25.056V44.94m72.91-20.734l-1.912 3.352V44.94M68.419 30.831v34.662m-23.643 0V51.53M32.92 126.826V91.892l-8.157-14.28M9.277 126.826v-16.452M32.92 249.492v-34.934l-11.819-20.693-11.824 20.722v.872m59.142 79.515v-19.083L56.6 255.198l-11.248 19.714m122.821 50.505l-5.076-8.886-5.07 8.886m-18.61-14.592v-34.934l-11.819-20.693-11.823 20.723v34.904m94.64 0v-34.934l-11.819-20.693-11.823 20.723v34.904m94.076-35.922l-11.255-19.705-11.823 20.723v19.081m-153.853-45.51v-34.934l-11.819-20.693-11.823 20.723v34.904m94.64 0v-34.934l-11.819-20.693-11.823 20.723v34.904m94.64 0v-34.934l-11.819-20.693-11.823 20.723v34.904m94.64-34.033v-.901l-11.819-20.693-11.823 20.723v34.904M68.419 188.159v-34.934L56.6 132.532l-11.823 20.723v34.904m94.601 0v-34.934l-11.819-20.693-11.823 20.723v34.904m94.679 0v-34.934l-11.819-20.693-11.823 20.723v34.904m94.64 0v-34.934l-11.819-20.693-11.823 20.723v34.904m-153.853-61.333V91.892L92.099 71.199 80.275 91.921v34.904m94.641.001V91.892l-11.819-20.693-11.823 20.723v34.904m94.64 0V91.892l-11.819-20.693-11.823 20.723v34.904m94.64-16.566v16.565m-15.479-49.209l-8.163 14.306v34.904M139.417 65.493V30.559L127.598 9.866l-11.823 20.723v34.904m94.64 0V30.559L198.596 9.866l-11.823 20.723v34.904m94.64-14.005v14.005m-23.642 0V30.858M56.598 40.175v45.741m-35.499 5.159v56.051m0 66.613v28.025m35.499 33.303v10.592m70.998-10.592v46.451m70.998-46.451v46.461m70.998-46.461v10.59M92.097 213.739v56.051m70.998-56.051v56.051m70.998-56.051v56.051m70.998-56.051v28.254M56.598 152.407v56.051m70.998-56.051v56.051m70.998-56.051v56.051m70.998-56.051v56.051M92.097 91.075v56.051m70.998-56.051v56.051m70.998-56.051v56.051m70.998-56.051v56.051M127.596 29.866v56.051m35.499-85.5v24.167m35.499 5.282v56.051m70.998-45.742v45.741"
            ></path>
          </svg>
          <div
            className="container mx-auto py-16 text-center"
            style={{ maxWidth: "70%" }}
          >
            <p className="italic text-lg custom-gold text-[#c9ab81]">
              Special selection
            </p>
            <div className="flex justify-center">
              <svg
                className="mt-9"
                xmlns="http://www.w3.org/2000/svg"
                width="41.125"
                height="9.146"
              >
                <path
                  fill="none"
                  stroke="#9C7C57"
                  strokeMiterlimit={10}
                  d="M40.881 8.576L20.562.591.244 8.576"
                />
                <path
                  fill="none"
                  stroke="#9C7C57"
                  strokeMiterlimit={10}
                  d="M40.881.591L20.562 8.576.243.591"
                />
              </svg>
              <h1 className="text-5xl font-bold my-4 custom-gold text-[#c9ab81] uppercase tracking-[5px] ml-7">
                from our menu
              </h1>
              <svg
                className="mt-9 ml-7"
                xmlns="http://www.w3.org/2000/svg"
                width="41.125"
                height="9.146"
              >
                <path
                  fill="none"
                  stroke="#9C7C57"
                  strokeMiterlimit={10}
                  d="M40.881 8.576L20.562.591.244 8.576"
                />
                <path
                  fill="none"
                  stroke="#9C7C57"
                  strokeMiterlimit={10}
                  d="M40.881.591L20.562 8.576.243.591"
                />
              </svg>
            </div>
            <div className="grid lg:grid-cols-1 xl:grid-cols-2 gap-12 mt-12 ">
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold custom-gold text-[#c9ab81] tracking-[3px] uppercase">
                    beef burger meal
                  </h3>
                  <span className="border-t-2 border-[#c9ab81] flex-grow mx-4" />
                  <span className="text-xl custom-gold text-[#c9ab81]">
                    $32
                  </span>
                </div>
                <p className="text-sm text-white mt-2 text-left">
                  Classic greek salad, barrel aged feta cheese, bread
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold custom-gold text-[#c9ab81] tracking-[3px] uppercase md:left-0 ">
                    pan seared scallops
                  </h3>
                  <span className="border-t-2 border-[#c9ab81] flex-grow mx-4" />
                  <span className="text-xl custom-gold text-[#c9ab81]">
                    $29
                  </span>
                </div>
                <p className="text-sm text-white mt-2 text-left">
                  Saffron, celeriac puree, black pudding, olive oil
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold custom-gold text-[#c9ab81] tracking-[3px] uppercase">
                    roasted lamb rump
                  </h3>
                  <span className="border-t-2 border-[#c9ab81] flex-grow mx-4" />
                  <span className="text-xl custom-gold text-[#c9ab81]">
                    $25
                  </span>
                </div>
                <p className="text-sm text-white mt-2 text-left">
                  Grilled lamb cutlets, pomegranate glaze, butternut squash
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold custom-gold text-[#c9ab81] tracking-[3px] uppercase">
                    baked camebert
                  </h3>
                  <span className="border-t-2 border-[#c9ab81] flex-grow mx-4" />
                  <span className="text-xl custom-gold text-[#c9ab81]">
                    $25
                  </span>
                </div>
                <p className="text-sm text-white mt-2 text-left">
                  Red onion marmalade, garlic Foccacia bread, grilled figs
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold custom-gold text-[#c9ab81] tracking-[3px] uppercase">
                    pan seared sea bass
                  </h3>
                  <span className="border-t-2 border-[#c9ab81] flex-grow mx-4" />
                  <span className="text-xl custom-gold text-[#c9ab81]">
                    $38
                  </span>
                </div>
                <p className="text-sm text-white mt-2 text-left">
                  Saffron and mussel’s broth, new potatoes, edamame beans
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold custom-gold text-[#c9ab81] tracking-[3px] uppercase">
                    braised ox cheek ravioli
                  </h3>
                  <span className="border-t-2 border-[#c9ab81] flex-grow mx-4" />
                  <span className="text-xl custom-gold text-[#c9ab81]">
                    $23
                  </span>
                </div>
                <p className="text-sm text-white mt-2 text-left">
                  Mediterranean olives casserole, celeriac puree, mushrooms
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold custom-gold text-[#c9ab81] tracking-[3px] uppercase">
                    king prawns and lobster
                  </h3>
                  <span className="border-t-2 border-[#c9ab81] flex-grow mx-4" />
                  <span className="text-xl custom-gold text-[#c9ab81]">
                    $38
                  </span>
                </div>
                <p className="text-sm text-white mt-2 text-left">
                  Creamy saffron, sauce Vierge
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold custom-gold text-[#c9ab81] tracking-[3px] uppercase">
                    corn fed chicken
                  </h3>
                  <span className="border-t-2 border-[#c9ab81] flex-grow mx-4" />
                  <span className="text-xl custom-gold text-[#c9ab81]">
                    $17
                  </span>
                </div>
                <p className="text-sm text-white mt-2 text-left">
                  Wild mushrooms, truffle potatoes, braised leeks, carrots
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold custom-gold text-[#c9ab81] tracking-[3px] uppercase">
                    citrus cured salmon
                  </h3>
                  <span className="border-t-2 border-[#c9ab81] flex-grow mx-4" />
                  <span className="text-xl custom-gold text-[#c9ab81]">
                    $41
                  </span>
                </div>
                <p className="text-sm text-white mt-2 text-left">
                  Horseradish creme fraiche, beetroot mousse, oil
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold custom-gold text-[#c9ab81] tracking-[3px] uppercase">
                    nduja pork chicken terrine
                  </h3>
                  <span className="border-t-2 border-[#c9ab81] flex-grow mx-4" />
                  <span className="text-xl custom-gold text-[#c9ab81]">
                    $41
                  </span>
                </div>
                <p className="text-sm text-white mt-2 text-left">
                  Smoked duck breast, pistachio, smoked pancetta
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button className="border border-[#c9ab81] text-white px-8 py-3 tracking-widest hover:bg-[#c9ab81] hover:text-[#0b1315] uppercase mt-32 transition-colors duration-300 ">
                view all
              </button>
            </div>
          </div>
        </div>
        <div className="flex mt-40 justify-center">
          <img
            src="https://laurent.qodeinteractive.com/wp-content/uploads/2019/10/main-img-6.jpg"
            width="350px"
            alt=""
            className="lg:hidden xl:block"
          />
          <img
            className="ml-8"
            src="https://laurent.qodeinteractive.com/wp-content/uploads/2019/10/main-img-8.jpg"
            width="300px"
            alt=""
          />

          <div className="ml-20 mt-10 max-w-md">
            <p className="text-[#c9ab81] flex justify-center">
              Our food philosophy
            </p>
            <div className="flex justify-center mt-5">
              <svg
                className="mt-6"
                xmlns="http://www.w3.org/2000/svg"
                width="41.125"
                height="9.146"
              >
                <path
                  fill="none"
                  stroke="#9C7C57"
                  strokeMiterlimit={10}
                  d="M40.881 8.576L20.562.591.244 8.576"
                />
                <path
                  fill="none"
                  stroke="#9C7C57"
                  strokeMiterlimit={10}
                  d="M40.881.591L20.562 8.576.243.591"
                />
              </svg>
              <p className="text-[#c9ab81] tracking-[5px] text-5xl uppercase ml-5">
                our
              </p>
              <p className="text-[#c9ab81] tracking-[5px] ml-5 text-5xl uppercase">
                tips
              </p>
              <svg
                className="mt-6 ml-5"
                xmlns="http://www.w3.org/2000/svg"
                width="41.125"
                height="9.146"
              >
                <path
                  fill="none"
                  stroke="#9C7C57"
                  strokeMiterlimit={10}
                  d="M40.881 8.576L20.562.591.244 8.576"
                />
                <path
                  fill="none"
                  stroke="#9C7C57"
                  strokeMiterlimit={10}
                  d="M40.881.591L20.562 8.576.243.591"
                />
              </svg>
            </div>
            <p className="text-white text-center mt-5 text-lg">
              Lorem ipsum dolor sit amet, consectet nei ad icing eli sed do eiu
              sm od tempor se incidid sens ne utabor et dolore magiqua. Ut enim
              ad miains eniam quis nostrudas exercitation ullam de cm laborisnw
              si utali
            </p>
            <div className="flex items-center justify-center mt-10">
              <div className="text-center">
                <button className="text-white text-lg tracking-widest uppercase">
                  read more
                </button>
                <div className="bg-[#c9ab81] w-full h-0.5 mt-2" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#0b1315] mt-40 text-white relative">
          <div
            className="h-[500px] mt-20 bg-fixed bg-center bg-cover flex items-center justify-center"
            style={{
              backgroundImage:
                'url("https://laurent.qodeinteractive.com/wp-content/uploads/2019/11/main-background-5.jpg")',
            }}
          >
            {!isVideoVisible ? (
              <div
                className="flex items-center justify-center w-16 h-16 rounded-full border-2 hover:bg-[#c9ab81] border-[#c9ab81] cursor-pointer"
                onClick={handlePlayClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-40 h-40 text-[#c9ab81] hover:text-white ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M14.752 11.168l-5.197-2.998A1 1 0 008 9.132v5.736a1 1 0 001.555.832l5.197-2.998a1 1 0 000-1.664z"
                  />
                </svg>
              </div>
            ) : (
              <div
                className="w-full h-full flex justify-center items-center relative"
                ref={videoContainerRef}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
                <iframe
                  className="relative z-20"
                  src="https://player.vimeo.com/video/369245407?autoplay=1&muted=1"
                  width="1000"
                  height="650"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Video"
                ></iframe>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center text-[#c9ab81] mt-20">
          Laurent’s tasty offer
        </div>
        <div className="flex justify-center mt-7">
          <svg
            className="mt-6"
            xmlns="http://www.w3.org/2000/svg"
            width="41.125"
            height="9.146"
          >
            <path
              fill="none"
              stroke="#9C7C57"
              strokeMiterlimit={10}
              d="M40.881 8.576L20.562.591.244 8.576"
            />
            <path
              fill="none"
              stroke="#9C7C57"
              strokeMiterlimit={10}
              d="M40.881.591L20.562 8.576.243.591"
            />
          </svg>
          <p className="text-[#c9ab81] tracking-[5px] uppercase text-5xl ml-5">
            our menu
          </p>
          <svg
            className="mt-6 ml-5"
            xmlns="http://www.w3.org/2000/svg"
            width="41.125"
            height="9.146"
          >
            <path
              fill="none"
              stroke="#9C7C57"
              strokeMiterlimit={10}
              d="M40.881 8.576L20.562.591.244 8.576"
            />
            <path
              fill="none"
              stroke="#9C7C57"
              strokeMiterlimit={10}
              d="M40.881.591L20.562 8.576.243.591"
            />
          </svg>
        </div>
        <CardDish />

        <div className="bg-[#0f1d22] mt-10 relative ">
          <svg
            className="absolute mt-10 z-[40]"
            xmlns="http://www.w3.org/2000/svg"
            width="224.136"
            height="259.25"
          >
            <path
              fill="none"
              stroke="#9A7D57"
              stroke-width="1.5"
              stroke-miterlimit="10"
              d="M59.649 23.735L-.405 58.472m0 0l61.352 35.511 59.834-34.631m61.557 104.892L60.946 93.982-.412 129.466m0 .001l61.358 35.514 120.965-70.015m-60.704 104.893L60.946 164.98-.406 200.467m.001.001l60.48 35.007M-.408 45.049L38.218 22.99-.408.938m-.003 115.07l38.629-22.059L-.403 71.913m-.003 115.129l38.624-22.056-38.621-22.035m-.008 115.132l38.629-22.099-38.621-22.035M40.591 82.201H58.03l41.521-23.713-41.577-23.72H40.591m0 118.431H58.03l41.521-23.713-41.578-23.721H40.591m0 118.432H58.03l41.521-23.713-41.578-23.721H40.591m61.332-59.103h17.439l41.521-23.711-41.578-23.723h-17.383m.001 118.471h17.439l41.521-23.711-41.578-23.723h-17.383m61.335 11.936h17.439l41.521-23.713-41.578-23.721h-17.383M-.406 31.404l14.737-8.418-14.739-8.41m.003 87.826l14.736-8.418-14.742-8.411m-.001 87.83l14.743-8.421-14.742-8.41m.008 87.824l14.734-8.416-14.742-8.411M20.038 70.305h34.934l20.693-11.818-20.723-11.825H20.038m0 94.641h34.934l20.693-11.818-20.723-11.825H20.038m0 94.641h34.934l20.693-11.818-20.723-11.824H20.038m61.332-82.893h34.934l20.693-11.82-20.723-11.822H81.37m0 94.679h34.934l20.693-11.82-20.723-11.822H81.37m61.334-11.858h34.934l20.693-11.818-20.723-11.824h-34.904M55.79 58.484H-.261m56.051 70.998H-.261M55.79 200.48H-.261M117.122 93.982H61.071m56.051 70.998H61.071m117.383-35.498h-56.051"
            ></path>
          </svg>
          <div className="h-[350px]">
            <div className="flex justify-center text-[#c9ab81]">
              <p className="mt-10">Reservations</p>
            </div>
            <div className="flex justify-center mt-7">
              <svg
                className="mt-6 z-[20]"
                xmlns="http://www.w3.org/2000/svg"
                width="41.125"
                height="9.146"
              >
                <path
                  fill="none"
                  stroke="#9C7C57"
                  strokeMiterlimit={10}
                  d="M40.881 8.576L20.562.591.244 8.576"
                />
                <path
                  fill="none"
                  stroke="#9C7C57"
                  strokeMiterlimit={10}
                  d="M40.881.591L20.562 8.576.243.591"
                />
              </svg>
              <p className="text-[#c9ab81] tracking-[5px] uppercase text-5xl ml-5">
                book a table
              </p>
              <svg
                className="mt-6 ml-5"
                xmlns="http://www.w3.org/2000/svg"
                width="41.125"
                height="9.146"
              >
                <path
                  fill="none"
                  stroke="#9C7C57"
                  strokeMiterlimit={10}
                  d="M40.881 8.576L20.562.591.244 8.576"
                />
                <path
                  fill="none"
                  stroke="#9C7C57"
                  strokeMiterlimit={10}
                  d="M40.881.591L20.562 8.576.243.591"
                />
              </svg>
            </div>
            <div className="mt-16 flex justify-center">
              <div className="flex space-x-4">
                <div className="border border-[#c9ab81] px-4 py-2 flex items-center w-40 text-white">
                  <span>1 Person</span>
                </div>
                <div className="border border-[#c9ab81] px-4 py-2 flex items-center w-40 text-white">
                  <span>08/18/2024</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-auto w-4 h-4 text-[#c9ab81]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 9l6 6 6-6"
                    />
                  </svg>
                </div>
                <div className="border border-[#c9ab81] px-4 py-2 flex items-center w-40 text-white">
                  <span>11:00 am</span>
                </div>
                <button
                  className="border text-white uppercase border-[#c9ab81] px-6 py-2 hover:bg-[#c9ab81] hover:text-[#0b1315] transition duration-300"
                  onClick={() =>
                    window.alert(
                      "Please download and install the application to fully experience the features."
                    )
                  }
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomeComponents;
