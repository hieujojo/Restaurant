import React, { useState, useEffect } from 'react';

const slides = [
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipisic sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad.',
    author: 'robert chang',
    role: 'Sommelier',
  },
  {
    text: 'Ut enim ad minim venia orem ipsum dolor sit amet, consectetur adipisic sed do. Eiusmod tempor incididunt ut labore et dolore magna..',
    author: 'Jan Winset',
    role: 'Cook',
  },
  {
    text: 'Eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia orem ipsum dolor sit amet, consectetur.',
    author: 'Andrea Chung',
    role: 'Cook',
  }
];

const Slide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const goToSlide = (index: React.SetStateAction<number>) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative flex mt-52 py-10 w-full h-[800px]">
      <div className="absolute h-[800px] z-[1] bg-[#0f1d22] flex justify-center items-center w-[50%]">
        <div className="w-[40%] text-center py-10">
          <img className="my-7 mx-auto" src="images/quote-mark.png" alt="Quote Mark" />
          <div className="w-full overflow-hidden">
            <div className="flex w-full transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {slides.map((slide, index) => (
                <div className="min-w-full" key={index}>
                  <p className="text-[#AFB8B8] my-7 font-miniver text-[22px] leading-[50px]">
                    {slide.text}
                  </p>
                  <p className="my-7 text-[19px] font-caviar_dreamsbold uppercase text-[#C9AB81] whitespace-nowrap tracking-[2px]">
                    {slide.author}
                  </p>
                  <p className="text-white">{slide.role}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`transition-all text-[#C9AB81] text-center px-1 py-1 border-[#c9ab81] ${currentSlide === index ? 'mb-[15px] border-b-4 border-double' : 'border-b'}`}
                onClick={() => goToSlide(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute w-[1000px] h-[800px] bg-cover right-[-50px]">
        <img className="w-[95%] h-full bg-cover" src="https://laurent.qodeinteractive.com/wp-content/uploads/2019/10/main-img-4.jpg" alt="Background" />
      </div>
    </div>
  );
};

export default Slide;

