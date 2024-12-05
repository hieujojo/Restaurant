import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Element/Button";

const ImgSlide1 = styled.div`
  height: 750px;
  background-color: rgb(12, 19, 21);
  background-image: url("https://laurent.qodeinteractive.com/wp-content/uploads/2019/12/main-h-new-rev-img-1.jpg");
  background-position: center 0px;
  opacity: 1;
  background-size: cover;
  background-repeat: no-repeat;
`;

const ImgSlide2 = styled.div`
  height: 750px;
  background-color: rgb(12, 19, 21);
  background-image: url("https://laurent.qodeinteractive.com/wp-content/uploads/2019/12/main-h-new-rev-img-2.jpg");
  background-position: center 0px;
  opacity: 1;
  background-size: cover;
  background-repeat: no-repeat;
`;

const ImgSlide3 = styled.div`
  height: 750px;
  background-color: rgb(12, 19, 21);
  background-image: url("https://laurent.qodeinteractive.com/wp-content/uploads/2019/12/main-h-new-rev-img-3.jpg");
  background-position: center 0px;
  opacity: 1;
`;
const FMiniver = styled.p`
  font-family: "Miniver", cursive;
`;
const FMetro = styled.p`
  font-family: "Zen Tokyo Zoo", system-ui;
  letter-spacing: 20px;
  @media (max-width: 1024px) {
    font-size: 75px;
    letter-spacing: 10px;
  }
`;

const FOpenSand = styled.p`
  font-family: "Open Sans Condensed", sans-serif;

  @media (max-width: 1024px) {
    max-width: 770px;
    margin-left: 15px;
  }
`;

const BannerHome = () => {
  const [titles, setTitles] = useState<NodeListOf<HTMLElement> | null>(null);
  const [currentTitle, setCurrentTitle] = useState(0);
  const [image, setImage] = useState<NodeListOf<HTMLElement> | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [bottom, setBottom] = useState<NodeListOf<HTMLElement> | null>(null);
  const [currentBottom, setCurrentBottom] = useState(0);
  const [head, setHead] = useState<NodeListOf<HTMLElement> | null>(null);
  const [currentHead, setCurrentHead] = useState(0);

  useEffect(() => {
    const titleElements = document.querySelectorAll(
      "#titles .title-item"
    ) as NodeListOf<HTMLElement>;
    setTitles(titleElements);
    const imageElements = document.querySelectorAll(
      "#slideshow .slide"
    ) as NodeListOf<HTMLElement>;
    setImage(imageElements);
    const bottomElements = document.querySelectorAll(
      "#textbottom .textbottom-item"
    ) as NodeListOf<HTMLElement>;
    setBottom(bottomElements);
    const headElements = document.querySelectorAll(
      "#texthead .texthead-item"
    ) as NodeListOf<HTMLElement>;
    setHead(headElements);
  }, []);

  const fadeTitle = (
    element: HTMLElement | null,
    startOpacity: number,
    endOpacity: number,
    pixel: number,
    position: number
  ): void => {
    const intervalTime = 50;
    const duration = 1000;
    const step = (endOpacity - startOpacity) / (duration / intervalTime);
    let currentOpacity = startOpacity;
    let currentPixel = pixel;
    let currentPosition = position;
    if (document.hidden) {
      return;
    } else {
      const interval2 = setInterval(() => {
        if (startOpacity == 0 && endOpacity == 1) {
          currentPixel += 1;
          if (element) element.style.fontSize = currentPixel + "px";
        } else if (startOpacity == 1 && endOpacity == 0) {
          currentPosition += 2;
          if (element) element.style.top = currentPosition + "px";
        }
        currentOpacity += step;
        if (element) element.style.opacity = currentOpacity.toString();
        if (
          (step > 0 && currentOpacity >= endOpacity) ||
          (step < 0 && currentOpacity <= endOpacity)
        ) {
          clearInterval(interval2);
          if (element) element.style.opacity = endOpacity.toString();
        }
      }, intervalTime);
    }
  };

  useEffect(() => {
    if (titles) {
      const intervalId = setInterval(() => {
        fadeTitle(titles[currentTitle], 1, 0, 0, -200);
        const nextTitle = (currentTitle + 1) % titles.length;
        titles[nextTitle].style.top = "-200px";
        fadeTitle(titles[nextTitle], 0, 1, 100, 0);
        setCurrentTitle(nextTitle);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [titles, currentTitle]);

  function fadeImage(
    element: HTMLElement | null,
    startOpacity: number,
    endOpacity: number,
    duration: number,
    position: number
  ) {
    const intervalTime = 50;
    const step = (endOpacity - startOpacity) / (duration / intervalTime);
    let currentOpacity = startOpacity;
    let currentPossiton = position;
    if (document.hidden) {
      return;
    } else {
      const interval1 = setInterval(() => {
        currentOpacity += step;
        if (element) element.style.opacity = currentOpacity.toString();
        if (position != 0 && startOpacity == 0) {
          currentPossiton -= 2;
          if (element) element.style.top = currentPossiton + "px";
        } else if (position != 0 && startOpacity == 1) {
          currentPossiton -= 2;
          if (element) element.style.top = currentPossiton + "px";
        }
        if (
          (step > 0 && currentOpacity >= endOpacity) ||
          (step < 0 && currentOpacity <= endOpacity)
        ) {
          clearInterval(interval1);
          if (element) element.style.opacity = endOpacity.toString();
        }
      }, intervalTime);
    }
  }
  useEffect(() => {
    if (image) {
      const intervalId = setInterval(() => {
        fadeImage(image[currentImage], 1, 0, 1000, 0);
        const nextImage = (currentImage + 1) % image.length;
        fadeImage(image[nextImage], 0, 1, 1000, 0);
        setCurrentImage(nextImage);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [image, currentImage]);

  function fadeTextBottom(
    element: HTMLElement | null,
    startOpacity: number,
    endOpacity: number,
    duration: number,
    position: number
  ) {
    const intervalTime = 50;
    const step = (endOpacity - startOpacity) / (duration / intervalTime);
    let currentOpacity = startOpacity;
    let currentPosition = position;
    if (document.hidden) {
      return;
    } else {
      const interval3 = setInterval(() => {
        if (startOpacity == 0 && endOpacity == 1) {
          currentPosition -= 2;
          if (element) element.style.top = currentPosition + "px";
        } else if (startOpacity == 1 && endOpacity == 0) {
          currentPosition += 2;
          if (element) element.style.top = currentPosition + "px";
        }
        currentOpacity += step;
        if (element) element.style.opacity = currentOpacity.toString();
        if (
          (step > 0 && currentOpacity >= endOpacity) ||
          (step < 0 && currentOpacity <= endOpacity)
        ) {
          clearInterval(interval3);
          if (element) element.style.opacity = endOpacity.toString();
        }
      }, intervalTime);
    }
  }
  useEffect(() => {
    if (bottom) {
      const intervalId = setInterval(() => {
        fadeTextBottom(bottom[currentBottom], 1, 0, 1000, 0);
        const nextTextBottom = (currentBottom + 1) % bottom.length;
        fadeTextBottom(bottom[nextTextBottom], 0, 1, 1000, 0);
        setCurrentBottom(nextTextBottom);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [bottom, currentBottom]);

  useEffect(() => {
    if (head) {
      const intervalId = setInterval(() => {
        fadeTextBottom(head[currentHead], 1, 0, 1000, 0);
        const nextTextHead = (currentHead + 1) % head.length;
        fadeTextBottom(head[nextTextHead], 0, 1, 1000, 0);
        setCurrentHead(nextTextHead);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [head, currentHead]);

  function fadeNext() {
    if (titles) {
      fadeTitle(titles[currentTitle], 1, 0, 0, -200);
      const nextTitle = (currentTitle + 1) % titles.length;
      titles[nextTitle].style.top = "-200px";
      fadeTitle(titles[nextTitle], 0, 1, 100, 0);
      setCurrentTitle(nextTitle);
    }
    if (image) {
      fadeImage(image[currentImage], 1, 0, 1000, 0);
      const nextImage = (currentImage + 1) % image.length;
      fadeImage(image[nextImage], 0, 1, 1000, 0);
      setCurrentImage(nextImage);
    }
    if (bottom) {
      fadeTextBottom(bottom[currentBottom], 1, 0, 1000, 0);
      const nextTextBottom = (currentBottom + 1) % bottom.length;
      fadeTextBottom(bottom[nextTextBottom], 0, 1, 1000, 0);
      setCurrentBottom(nextTextBottom);
    }
    if (head) {
      fadeTextBottom(head[currentHead], 1, 0, 1000, 0);
      const nextTextHead = (currentHead + 1) % head.length;
      fadeTextBottom(head[nextTextHead], 0, 1, 1000, 0);
      setCurrentHead(nextTextHead);
    }
  }

  function fadeBack() {
    if (titles) {
      fadeTitle(titles[currentTitle], 1, 0, 0, -200);
      var nextTitle = (currentTitle - 1) % titles.length;
      console.log("font", nextTitle);
      if (nextTitle == -1) {
        nextTitle = titles.length - 1;
      }
      console.log("back", nextTitle);
      titles[nextTitle].style.top = "-200px";
      fadeTitle(titles[nextTitle], 0, 1, 100, 0);
      setCurrentTitle(nextTitle);
    }
    if (image) {
      fadeImage(image[currentImage], 1, 0, 1000, 0);
      var nextImage = (currentImage - 1) % image.length;
      if (nextImage == -1) {
        nextImage = image.length - 1;
      }
      fadeImage(image[nextImage], 0, 1, 1000, 0);
      setCurrentImage(nextImage);
    }
    if (bottom) {
      fadeTextBottom(bottom[currentBottom], 1, 0, 1000, 0);
      var nextTextBottom = (currentBottom - 1) % bottom.length;
      if (nextTextBottom == -1) {
        nextTextBottom = bottom.length - 1;
      }
      fadeTextBottom(bottom[nextTextBottom], 0, 1, 1000, 0);
      setCurrentBottom(nextTextBottom);
    }
    if (head) {
      fadeTextBottom(head[currentHead], 1, 0, 1000, 0);
      var nextTextHead = (currentHead - 1) % head.length;
      if (nextTextHead == -1) {
        nextTextHead = head.length - 1;
      }
      fadeTextBottom(head[nextTextHead], 0, 1, 1000, 0);
      setCurrentHead(nextTextHead);
    }
  }

  return (
    <div className="bg-black">
      <div className="relative h-[750px] w-full z-[1]">
        <div id="slideshow" className="absolute w-full h-[750px] ">
          <ImgSlide1
            id="parallax-bg"
            className="w-full slide parallax absolute bg-cover bg-center transition duration-5000 ease-in-out"
            data-height="530"
          ></ImgSlide1>
          <ImgSlide2
            id="parallax-bg"
            className="w-full slide parallax absolute bg-cover bg-center transition duration-5000 ease-in-out"
            data-height="530"
          ></ImgSlide2>
          <ImgSlide3
            id="parallax-bg"
            className="w-full slide parallax absolute bg-cover bg-center transition duration-5000 ease-in-out"
            data-height="530"
          ></ImgSlide3>
        </div>
      </div>
      <div className="absolute top-0 h-[1000px] w-full text-center items-center z-[2]">
        <div className="banner w-full mt-10 items-center">
          <div className=" w-full flex items-center">
            <button className=" ms-10 mb-10 z-[1]" onClick={fadeBack}>
              <svg
                className="svg-1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25.109px"
                height="34.906px"
                viewBox="0 0 25.109 34.906"
                enable-background="new 0 0 25.109 34.906"
              >
                <polyline
                  fill="none"
                  stroke="#C9AB81"
                  stroke-miterlimit="10"
                  points="24.67,34.59 11.653,17.464 24.67,0.338 "
                ></polyline>
                <polyline
                  fill="none"
                  className="eltdf-popout"
                  stroke="#C9AB81"
                  stroke-miterlimit="10"
                  points="13.688,34.59 0.671,17.464 13.688,0.338 "
                ></polyline>
              </svg>
            </button>
            <div className="w-full h-[637px] flex items-center justify-center text-[#C9AB81] font-caviar_dreamsbold text-[48px]">
              <div className="text-center py-5">
                <div
                  id="texthead"
                  className="relative flex items-center justify-center w-auto top-[-150px]"
                >
                  <FMiniver className="absolute whitespace-nowrap texthead-item font-miniver text-[25px]">
                    welcome to our delicious corner
                  </FMiniver>
                  <FMiniver className="absolute whitespace-nowrap texthead-item font-miniver text-[25px] opacity-0">
                    take a sip of uor innovative drinks
                  </FMiniver>
                  <FMiniver className="absolute whitespace-nowrap texthead-item font-miniver text-[25px] opacity-0">
                    the most delicious flavor combos
                  </FMiniver>
                </div>
              </div>
              <div>
                <div className="text-center py-5">
                  <div
                    id="titles"
                    className="relative flex items-center justify-center my-5 top-[-100px]"
                  >
                    <div className="flex items-center title-item absolute whitespace-nowrap tracking-[10px] font-[80] py-[100px] my-5 font-metro text-[100px]">
                      <svg
                        className="mt-10 mx-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="41.125"
                        height="9.146"
                      >
                        <path
                          fill="none"
                          stroke="#9C7C57"
                          stroke-miterlimit="10"
                          d="M40.881 8.576L20.562.591.244 8.576"
                        ></path>
                        <path
                          fill="none"
                          stroke="#9C7C57"
                          stroke-miterlimit="10"
                          d="M40.881.591L20.562 8.576.243.591"
                        ></path>
                      </svg>
                      <FMetro>the best dishes</FMetro>
                      <svg
                        className="mt-10 mx-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="41.125"
                        height="9.146"
                      >
                        <path
                          fill="none"
                          stroke="#9C7C57"
                          stroke-miterlimit="10"
                          d="M40.881 8.576L20.562.591.244 8.576"
                        ></path>
                        <path
                          fill="none"
                          stroke="#9C7C57"
                          stroke-miterlimit="10"
                          d="M40.881.591L20.562 8.576.243.591"
                        ></path>
                      </svg>
                    </div>
                    <div className="flex items-center title-item absolute whitespace-nowrap tracking-[10px] font-[80] py-[100px] my-5 font-metro text-[100px] opacity-0">
                      <svg
                        className="mt-10 mx-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="41.125"
                        height="9.146"
                      >
                        <path
                          fill="none"
                          stroke="#9C7C57"
                          stroke-miterlimit="10"
                          d="M40.881 8.576L20.562.591.244 8.576"
                        ></path>
                        <path
                          fill="none"
                          stroke="#9C7C57"
                          stroke-miterlimit="10"
                          d="M40.881.591L20.562 8.576.243.591"
                        ></path>
                      </svg>
                      <FMetro>the finest drinks</FMetro>
                      <svg
                        className="mt-10 mx-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="41.125"
                        height="9.146"
                      >
                        <path
                          fill="none"
                          stroke="#9C7C57"
                          stroke-miterlimit="10"
                          d="M40.881 8.576L20.562.591.244 8.576"
                        ></path>
                        <path
                          fill="none"
                          stroke="#9C7C57"
                          stroke-miterlimit="10"
                          d="M40.881.591L20.562 8.576.243.591"
                        ></path>
                      </svg>
                    </div>
                    <div className="flex items-center title-item absolute whitespace-nowrap tracking-[10px] font-[80] py-[100px] my-5 font-metro text-[100px] opacity-0">
                      <svg
                        className="mt-10 mx-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="41.125"
                        height="9.146"
                      >
                        <path
                          fill="none"
                          stroke="#9C7C57"
                          stroke-miterlimit="10"
                          d="M40.881 8.576L20.562.591.244 8.576"
                        ></path>
                        <path
                          fill="none"
                          stroke="#9C7C57"
                          stroke-miterlimit="10"
                          d="M40.881.591L20.562 8.576.243.591"
                        ></path>
                      </svg>
                      <FMetro>the food heaven</FMetro>
                      <svg
                        className="mt-10 mx-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="41.125"
                        height="9.146"
                      >
                        <path
                          fill="none"
                          stroke="#9C7C57"
                          stroke-miterlimit="10"
                          d="M40.881 8.576L20.562.591.244 8.576"
                        ></path>
                        <path
                          fill="none"
                          stroke="#9C7C57"
                          stroke-miterlimit="10"
                          d="M40.881.591L20.562 8.576.243.591"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center py-5">
                <div
                  id="textbottom"
                  className="text-white relative flex items-center justify-center w-auto my-5 top-[50px]"
                >
                  <div className="absolute w-[800px] textbottom-item font-open-sans-condensed text-[23px] tracking-[2px]">
                    <FOpenSand>
                      We have a porper passion for cooking. Love is the secret
                      ingredient that makes all our meals taste better and
                      magical.
                    </FOpenSand>
                    <Button />
                  </div>
                  <div className="absolute w-[800px] textbottom-item font-open-sans-condensed text-[23px] tracking-[2px] opacity-0">
                    <FOpenSand>
                      From the delicous food to wonderful cocktails, Laurents
                      offer is guaranteed to satisfy all of your taste buds.
                    </FOpenSand>
                    <Button />
                  </div>
                  <div className="absolute w-[800px] textbottom-item font-open-sans-condensed text-[23px] tracking-[2px] opacity-0">
                    <FOpenSand>
                      Experimentation in the kitchen and focus on excellence are
                      among our main driving forces in cooking.
                    </FOpenSand>
                    <Button />
                  </div>
                </div>
              </div>
            </div>
            <button
              className=" transform scale-x-[-1] me-10 mb-10 z-[101]"
              onClick={fadeNext}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25.109px"
                height="34.906px"
                viewBox="0 0 25.109 34.906"
                enable-background="new 0 0 25.109 34.906"
              >
                <polyline
                  fill="none"
                  stroke="#C9AB81"
                  stroke-miterlimit="10"
                  points="24.67,34.59 11.653,17.464 24.67,0.338 "
                ></polyline>
                <polyline
                  fill="none"
                  className="eltdf-popout"
                  stroke="#C9AB81"
                  stroke-miterlimit="10"
                  points="13.688,34.59 0.671,17.464 13.688,0.338 "
                ></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerHome;
