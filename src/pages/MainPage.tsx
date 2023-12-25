import React from "react";
import LvlDropdown from "../components/LvlDropdown.tsx";
import ClassCardsContainer from "../components/ClassCardsContainer.tsx";

export default function MainPage() {
  return (
    <div className="main-container text-center w-screen h-screen absolute flex flex-col items-center">
      <div className="inline-flex mt-6 p-2 justify-center items-center gap-2 border-b-2 border-black">
        <p className="text-7xl font-light text-text-950">Grade</p>
        <p className="text-7xl font-bold text-no-fill text-stroke-black">
          Calculator
        </p>
      </div>
      <LvlDropdown />
      <ClassCardsContainer />
    </div>
  );
}
