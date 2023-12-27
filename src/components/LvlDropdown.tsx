import React, { useRef, useState } from "react";
import ArrowIcon from "./ArrowIcon.tsx";

export default function LvlDropdown({ levelList, setChosenLevel }) {
  const [isFolded, setFolded] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(levelList[0]);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleDropdownUnfold = () => {
    setFolded(!isFolded);

    if (dropDownRef.current) {
      setTimeout(() => {
        dropDownRef.current!.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 10);
    }
  };

  const handleLevelClick = (e) => {
    setChosenLevel(e.target.textContent);
    setCurrentLevel(e.target.textContent);
    handleDropdownUnfold();
  }


  return (
    <div ref={dropDownRef} className="relative">
      <div
        className="inline-flex px-4 py-2 mt-20 justify-center items-center gap-3 rounded-lg border-primary-600 border bg-primary-300 cursor-pointer z-10 relative"
        onClick={handleDropdownUnfold}
      >
        <p className="text-3xl text-no-fill text-stroke-black font-bold">{currentLevel}</p>
        <ArrowIcon direction={isFolded ? "down" : "up"} />
      </div>
        <div className={`dropdown-anim mt-[-1rem] pt-4 overflow-hidden ${isFolded ? "max-h-0" : "max-h-24 hover:overflow-auto border-x-2 border-b-2 border-primary-600 rounded-b-lg"}`}>
          {levelList.map((level, index) => (
            <div key={index} className="flex-col gap-4 cursor-pointer hover:bg-black/5 relative" onClick={handleLevelClick}>
              <p className="text-2xl text-no-fill text-stroke-black font-bold">{level}</p>
            </div>
          ))}
        </div>
    </div>
  );
}
