import { useEffect, useState, CSSProperties } from "react";
import Image from "next/image";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";
import dynamic from "next/dynamic";

const images = [
  "/images/OIP (3).png",
  "/images/Remove-bg.ai_1722764959335.png",
  "/images/Remove-bg.ai_1722764446610.png",
  "/images/Remove-bg.ai_1722764462107.png",
  "/images/spicykimchiramen_1024x684.png",
];

const positions = [
  { zIndex: "8", left: "-48px", top: "-70px", width: "300px", height: "300px" },
  { zIndex: "9", left: "100px", top: "10px", width: "300px", height: "300px" },
  { zIndex: "10", left: "200px", top: "23%", width: "400px", height: "400px" },
  { zIndex: "9", left: "90px", bottom: "0px", width: "300px", height: "300px" },
  { zIndex: "8", left: "-150px", bottom: "-48px", width: "300px", height: "300px" },
];

interface IndexProps {
  numbershow: number;
}

const Index: React.FC<IndexProps> = ({ numbershow }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(numbershow || 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleFormSwitch = (formNumber: number) => {
    setShowForm(formNumber);
  };

  const renderForm = () => {
    switch (showForm) {
      case 1:
        return <Login onSwitchForm={handleFormSwitch} />;
      case 2:
        return <Register onSwitchForm={handleFormSwitch} />;
      case 3:
        return <ResetPassword onSwitchForm={handleFormSwitch} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative bg-[#FFB703] h-screen w-screen overflow-hidden">
      <div
        className="absolute z-[1] h-screen ml-[200px] py-[50%] w-64 bg-blue-500 bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: "url('../images/pngtree-delicious-sushi.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      <div className="relative h-screen">
        {images.map((src, index) => {
          const position = positions[(currentIndex + index) % positions.length];
          return (
            <Image
              key={src}
              src={src}
              width={300}
              height={300}
              alt={`image-${index}`}
              className="absolute transform transition-all duration-1000"
              style={{
                left: position.left,
                top: position.top,
                bottom: position.bottom,
                width: position.width,
                height: position.height,
                zIndex: position.zIndex,
              }}
            />
          );
        })}
      </div>

      {renderForm()}
    </div>
  );
};

export default Index;
