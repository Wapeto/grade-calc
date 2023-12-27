import React, { FC, useState } from "react";
import ArrowIcon from "./ArrowIcon.tsx";

// Images
const analyseImage = require("../assets/images/analyse.png");
const pooImage = require("../assets/images/poo.png");

const imageMap = {
  "analyse.png": analyseImage,
  "poo.png": pooImage,
  // Add other images to this map
};
interface CustomStyle extends React.CSSProperties {
  "--image-url"?: string;
}

interface ClassCardProps {
  classTitle: string;
  imageLink?: string;
  examList?: string[];
}

const ClassCard: FC<ClassCardProps> = ({ classTitle, imageLink, examList }) => {
  const imageUrl = imageLink ? imageMap[imageLink] : '';
  const [isFolded, setFolded] = useState(true);
  
  const customStyle: CustomStyle = {
    '--image-url': `url(${imageUrl})`,
  };
  
  const handleCardUnfold = () => {
    setFolded(!isFolded);
  };

  return (
    <div
      className={`flex flex-col w-48 ${isFolded ? 'h-48' : 'h-64'} content-center items-center cursor-pointer`}
      {...(isFolded && { onClick: handleCardUnfold })}
    >
      {/* Image */}
      <div
        style={customStyle}
        className={`class-card-image w-full ${isFolded ? 'h-32' : 'h-28'} rounded-t-lg border-primary-500 border-x-2 border-t-2 bg-[image:var(--image-url)]`}
      ></div>

      {/* Bottom */}
      <div className={`card-folding-transition w-full overflow-hidden bg-secondary-300 rounded-b-lg border-x-2 border-b-2 border-primary-400  ${isFolded ? 'h-[20%] inline-flex items-center justify-center' : 'flex flex-col items-center h-full'}`}>
        <div className={`inline-flex justify-center items-center gap-2 ${!isFolded && 'border-b-2 border-text-950'}`} {... (!isFolded && {onClick: handleCardUnfold})}>
          <p className={`text-center text-text-950 text-lg font-semibold ${!isFolded && 'mt-1'}`}>
            {classTitle}
          </p>
          <ArrowIcon direction={isFolded ? "down" : "up"} />
        </div>
        <div className={`mt-2 ${isFolded ? 'hidden' : 'block'}`}>
        {examList?.map((exam, index) => (
          <input type="text" key={index} placeholder={exam} className="w-[60%] my-2 bg-primary-300/50 placeholder-black/50 text-center font-bold border-primary-600 border-2 rounded-lg"/>
        ))}
      </div>
      </div>
    </div>
  );
};

export default ClassCard;