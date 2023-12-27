import React, { useState } from "react";
import LvlDropdown from "../components/LvlDropdown.tsx";
import ClassCardsContainer from "../components/ClassCardsContainer.tsx";
import CalculateButton from "../components/CalculateButton.tsx";

export default function MainPage() {
  const [inputValues, setInputValues] = useState({});
  const [chosenLevel, setChosenLevel] = useState("S3");

  const classList = {
    S3: {
      Analyse: {
        exams: ["CC1", "CC2", "Projet"],
        imageName: "analyse",
      },
      LPL: {
        exams: ["CC1", "CC2", "TP"],
        imageName: "lpl",
      },
      Architecture: {
        exams: ["CC1", "CC2", "Projet"],
        imageName: "architecture",
      },
      POO: {
        exams: ["CC1", "TP", "Presence"],
        imageName: "poo",
      },
      "Tech Dev": {
        exams: ["Rendu 1", "Rendu 2", "Projet"],
        imageName: "techdev",
      },
      Anglais: {
        exams: ["CC1", "POEM 1", "POEM 2"],
        imageName: "english",
      },
      Option: {
        exams: ["CC1", "CC2", "CC3"],
        imageName: "option",
      },
    },
    S4: {
      "Proba & Stat": {
        exams: ["CC1", "CC2", "Presence"],
        imageName: "proba",
      },
      Analyse: {
        exams: ["CC1", "CC2", "TP"],
        imageName: "analyse",
      },
      Systems: {
        exams: ["Projet", "CC1", "TP"],
        imageName: "systems",
      },
      Reseaux : {
        exams: ["CC1", "CC2", "Projet"],
        imageName: "reseaux",
      },
      SDA : {
        exams: ["CC1", "CC2", "TP"],
        imageName: "sda",
      },
      POO: {
        exams: ["CC1", "TP", "Projet"],
        imageName: "poo",
      },
      Web : {
        exams: ["CC1", "CC2", "Projet"],
        imageName: "web",
      },
      Langue : {
        exams: ["CC1", "CC2", "Presence"],
        imageName: "langue",
      },
      Option: {
        exams: ["CC1", "CC2", "CC3"],
        imageName: "option",
      },
    },
    S5 :{},
    S6 :{},
  };

  const handleInputChange = (id, value) => {
    setInputValues({ ...inputValues, [id]: value });
  };

  const handleCalculateClick = () => {
    console.log(inputValues);
  };

  const handleSelectedLevel = (level) => {
    setChosenLevel(level);
  };

  return (
    <div className="main-container text-center min-w-screen min-h-screen flex flex-col items-center px-6">
      <div className="inline-flex mt-6 p-2 justify-center items-center gap-2 border-b-2 border-black">
        <p className="text-7xl font-light text-text-950">Grade</p>
        <p className="text-7xl font-bold text-no-fill text-stroke-black">
          Calculator
        </p>
      </div>
      <LvlDropdown
        levelList={Object.keys(classList)}
        setChosenLevel={handleSelectedLevel}
      />
      <ClassCardsContainer
        classList={classList[chosenLevel]}
        currentLevel={chosenLevel}
        onChange={handleInputChange}
      />
      <CalculateButton onClick={handleCalculateClick} />
    </div>
  );
}
