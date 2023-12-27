import React, { useState } from "react";
import LvlDropdown from "../components/LvlDropdown.tsx";
import ClassCardsContainer from "../components/ClassCardsContainer.tsx";
import CalculateButton from "../components/CalculateButton.tsx";

export default function MainPage() {
  const [inputValues, setInputValues] = useState({});
  const [chosenLevel, setChosenLevel] = useState("S3");

  const classList = {
    S3: {
      Analyse: ["CC1", "CC2", "Projet"],
      LPL: ["CC1", "CC2", "TP"],
      Architecture: ["CC1", "CC2", "Projet"],
      POO: ["CC1", "TP", "Presence"],
      "Tech Dev": ["Rendu 1", "Rendu 2", "Projet"],
      Anglais: ["CC1", "POEM 1", "POEM 2"],
      Option: ["CC1", "CC2", "CC3"],
    },
    S4: {
      "Proba & Stat": ["CC1", "CC2", "Presence"],
      Analyse: ["CC1", "CC2", "TP"],
      Systems: ["Projet", "CC1", "TP"],
      Reseaux : ["CC1", "CC2", "Projet"],
      SDA : ["CC1", "CC2", "TP"],
      POO: ["CC1", "TP", "Projet"],
      Web : ["CC1", "CC2", "Projet"],
      Langue : ["CC1", "CC2", "Presence"],
      Option: ["CC1", "CC2", "CC3"],
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
