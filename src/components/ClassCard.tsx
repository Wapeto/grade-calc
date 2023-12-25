import React, { FC } from "react";
import ArrowIcon from "./ArrowIcon.tsx";
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
}


const ClassCard: FC<ClassCardProps> = ({ classTitle, imageLink }) => {
  const imageUrl = imageLink ? imageMap[imageLink] : "";

  const customStyle: CustomStyle = {
    '--image-url': `url(${imageUrl})`,
  };

  return (
    <div className="flex flex-col w-48 h-44 content-center items-center">
      <div
        style={customStyle}
        className="class-card-image w-full h-36 rounded-t-lg border-primary-500 border-x-2 border-t-2 bg-[image:var(--image-url)]"
      ></div>
      <div className="inline-flex justify-center items-center gap-2 h-10 w-full bg-secondary-300 rounded-b-lg border-x-2 border-b-2 border-primary-400">
        <p className="text-center text-text-950 text-lg font-semibold">
          {classTitle}
        </p>
        <ArrowIcon />
      </div>
    </div>
  );
};

export default ClassCard;
