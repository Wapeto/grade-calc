import React, { FC, useState, useRef, useEffect } from "react";
import ArrowIcon from "./ArrowIcon.tsx";

// Simplified image import and selection logic
const images = {
  analyse: ["analyse-1.png", "analyse-2.png"],
  poo: ["poo-1.png", "poo-2.png"],
  anglais: ["anglais-1.png", "anglais-2.png"],
  // ... other classes
};

const getRandomImage = (className) => {
  const imageFiles = images[className] || ["default.png"];
  const randomIndex = Math.floor(Math.random() * imageFiles.length);
  return require(`../assets/images/${imageFiles[randomIndex]}`);
};

interface ClassCardProps {
  classTitle: string;
  examList?: string[];
  onInputChange: (id: string, value: string) => void;
}

const ClassCard: FC<ClassCardProps> = ({classTitle, examList, onInputChange}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFolded, setFolded] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setImageUrl(getRandomImage(classTitle.toLowerCase().replace(/\s+/g, "")));
    // No dependency on 'currentLevel' needed
  }, [classTitle]);

  const handleCardUnfold = () => {
    setFolded(!isFolded);
    if (isFolded && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    exam: string
  ) => {
    onInputChange(`${classTitle}-${exam}`, e.target.value);
  };

  return (
    <div
      ref={cardRef}
      className={`flex flex-col w-48 ${
        isFolded ? "h-48" : "h-64"
      } content-center items-center cursor-pointer`}
      onClick={handleCardUnfold}
    >
      {/* Image */}
      <div
        style={{ "--image-url": `url(${imageUrl})` } as React.CSSProperties}
        className={`class-card-image w-full ${
          isFolded ? "h-32" : "h-28"
        } rounded-t-lg border-primary-500 border-x-2 border-t-2 bg-[image:var(--image-url)]`}
      ></div>
      {/* Bottom */}
      <div
        className={`card-folding-transition w-full overflow-hidden bg-secondary-300 rounded-b-lg border-x-2 border-b-2 border-primary-400 ${
          isFolded
            ? "h-[20%] inline-flex items-center justify-center"
            : "flex flex-col items-center h-full"
        }`}
      >
        <div
          className={`inline-flex justify-center items-center gap-2 ${
            !isFolded && "border-b-2 border-text-950"
          }`}
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
        <div className={`${isFolded ? "hidden" : "block"} mt-2`}>
          {examList?.map((exam, index) => (
            <input
              key={index}
              type="text"
              placeholder={exam}
              onChange={(e) => handleInput(e, exam)}
              className="w-[60%] my-2 bg-primary-300/50 placeholder-black/50 text-center font-bold border-primary-600 border-2 rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
