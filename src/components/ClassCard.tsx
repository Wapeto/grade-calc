import React, { FC, useState, useRef, useEffect } from "react";
import ArrowIcon from "./ArrowIcon.tsx";

// Images
const defaultImage = require("../assets/images/default.png");
const analyseImage1 = require("../assets/images/analyse-1.png");
const analyseImage2 = require("../assets/images/analyse-2.png");
const pooImage1 = require("../assets/images/poo-1.png");
const pooImage2 = require("../assets/images/poo-2.png");
const englishImage1 = require("../assets/images/english-1.png");
const englishImage2 = require("../assets/images/english-2.png");

const imageMap = {
  analyse: [analyseImage1, analyseImage2],
  poo: [pooImage1, pooImage2],
  english: [englishImage1, englishImage2],
  // Add other images to this map
};

const getRandomImage = (className) => {
  const images = imageMap[className];
  if (!images) return defaultImage;
  return images[Math.floor(Math.random() * images.length)]; // Randomly select one of the images
};

interface CustomStyle extends React.CSSProperties {
  "--image-url"?: string;
}

interface ClassCardProps {
  classTitle: string;
  imageLink?: string;
  examList?: string[];
  onInputChange: (id: string, value: string) => void;
  currentLevel: string;
}

const ClassCard: FC<ClassCardProps> = ({classTitle, imageLink, examList, onInputChange, currentLevel}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFolded, setFolded] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!imageLink) {
      setImageUrl(defaultImage);
      return;
    }
    const initialImageUrl = getRandomImage(
      imageLink.toLowerCase().replace(/\s+/g, "")
    );
    setImageUrl(initialImageUrl);
    setFolded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLevel]);

  const customStyle: CustomStyle = {
    "--image-url": `url(${imageUrl})`,
  };

  const handleCardUnfold = () => {
    setFolded(!isFolded);

    if (isFolded && cardRef.current) {
      setTimeout(() => {
        cardRef.current!.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 10);
    }
  };

  function handleInput(e: any, exam: string): void {
    onInputChange(`${classTitle}-${exam}`, e.target.value);
  }



  return (
    <div
      ref={cardRef}
      className={`flex flex-col w-48 ${
        isFolded ? "h-48" : "h-64"
      } content-center items-center cursor-pointer`}
      {...(isFolded && { onClick: handleCardUnfold })}
    >
      {/* Image */}
      <div
        style={customStyle}
        className={`class-card-image w-full ${
          isFolded ? "h-32" : "h-28"
        } rounded-t-lg border-primary-500 border-x-2 border-t-2 bg-[image:var(--image-url)]`}
        {...(!isFolded && { onClick: handleCardUnfold })}
      ></div>

      {/* Bottom */}
      <div
        className={`card-folding-transition w-full overflow-hidden bg-secondary-300 rounded-b-lg border-x-2 border-b-2 border-primary-400  ${
          isFolded
            ? "h-[20%] inline-flex items-center justify-center"
            : "flex flex-col items-center h-full"
        }`}
      >
        <div
          className={`inline-flex justify-center items-center gap-2 ${
            !isFolded && "border-b-2 border-text-950"
          }`}
          {...(!isFolded && { onClick: handleCardUnfold })}
        >
          <p
            className={`text-center text-text-950 text-lg font-semibold ${
              !isFolded && "mt-1"
            }`}
          >
            {classTitle}
          </p>
          <ArrowIcon direction={isFolded ? "down" : "up"} />
        </div>
        <div className={`mt-2 ${isFolded ? "hidden" : "block"}`}>
          {examList?.map((exam, index) => (
            <input
              type="text"
              key={index}
              placeholder={exam}
              className="w-[60%] my-2 bg-primary-300/50 placeholder-black/50 text-center font-bold border-primary-600 border-2 rounded-lg"
              onChange={(e) => handleInput(e, exam)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
