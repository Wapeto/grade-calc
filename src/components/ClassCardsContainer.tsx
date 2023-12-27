import React from "react";
import ClassCard from "./ClassCard.tsx";

export default function ClassCardsContainer({classList, currentLevel, onChange}) {



  return (
    <div className="inline-flex max-w-70 justify-center items-start content-center gap-9 flex-wrap mt-28">
      {Object.keys(classList).map((classTitle, index) => (
        <ClassCard key={index} classTitle={classTitle} imageLink={classList[classTitle].imageName} examList={classList[classTitle].exams} onInputChange={onChange} currentLevel={currentLevel}/>
      ))}
    </div>
  );
}
