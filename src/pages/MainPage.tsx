import React, { useEffect, useState } from "react";
import LvlDropdown from "../components/LvlDropdown.tsx";
import ClassCardsContainer from "../components/ClassCardsContainer.tsx";
import CalculateButton from "../components/CalculateButton.tsx";
import { useClassList } from "../hooks/useClassList";

// TODO: Add instructions
export default function MainPage() {
	const [chosenLevel, setChosenLevel] = useState("S3");
	const [targetAverage, setTargetAverage] = useState(10);
	const [isCalculationTriggered, setIsCalculationTriggered] = useState(false);

	const { classList } = useClassList();

	// const classList = React.useMemo(() => {
	// 	return {
	// 		S3: {
	// 			Analyse: {
	// 				exams: [
	// 					new ExamModel("CC1", -1, 1),
	// 					new ExamModel("CC2", -1, 2),
	// 					new ExamModel("Projet", -1, 1),
	// 				],
	// 				coef: 4,
	// 			},
	// 			LPL: {
	// 				exams: [
	// 					new ExamModel("CC1", -1, 35),
	// 					new ExamModel("CC2", -1, 50),
	// 					new ExamModel("TP", -1, 15),
	// 				],
	// 				coef: 5,
	// 			},
	// 			Architecture: {
	// 				exams: [
	// 					new ExamModel("CC1", -1, 2),
	// 					new ExamModel("CC2", -1, 5),
	// 					new ExamModel("Projet", -1, 3),
	// 				],
	// 				coef: 3,
	// 			},
	// 			SDA: {
	// 				exams: [
	// 					new ExamModel("CC1", -1, 2),
	// 					new ExamModel("CC2", -1, 4),
	// 					new ExamModel("TP", -1, 4),
	// 				],
	// 				coef: 6,
	// 			},
	// 			POO: {
	// 				exams: [
	// 					new ExamModel("CC1", -1, 2),
	// 					new ExamModel("TP", -1, 2),
	// 					new ExamModel("Presence", -1, 1),
	// 				],
	// 				coef: 3,
	// 			},
	// 			"Tech Dev": {
	// 				exams: [
	// 					new ExamModel("Rendu 1", -1, 1),
	// 					new ExamModel("Rendu 2", -1, 1),
	// 					new ExamModel("Projet", -1, 1),
	// 				],
	// 				coef: 3,
	// 			},
	// 			Anglais: {
	// 				exams: [
	// 					new ExamModel("CC1", -1, 5),
	// 					new ExamModel("POEM 1", -1, 2),
	// 					new ExamModel("POEM 2", -1, 3),
	// 				],
	// 				coef: 3,
	// 			},
	// 			Option: {
	// 				exams: [
	// 					new ExamModel("CC1", -1, 1),
	// 					new ExamModel("CC2", -1, 1),
	// 					new ExamModel("CC3", -1, 1),
	// 				],
	// 				coef: 3,
	// 			},
	// 		},
	// 		S4: {
	// 			"Proba & Stat": {
	// 				exams: [
	// 					["CC1", 1],
	// 					["CC2", 1],
	// 					["Presence", 1],
	// 				],
	// 				coef: 4,
	// 			},
	// 			Analyse: {
	// 				exams: [
	// 					["CC1", 1],
	// 					["CC2", 1],
	// 					["TP", 1],
	// 				],
	// 				coef: 4,
	// 			},
	// 			Systems: {
	// 				exams: [
	// 					["Projet", 1],
	// 					["CC1", 1],
	// 					["TP", 1],
	// 				],
	// 				coef: 4,
	// 			},
	// 			Reseaux: {
	// 				exams: [
	// 					["CC1", 1],
	// 					["CC2", 1],
	// 					["Projet", 1],
	// 				],
	// 				coef: 4,
	// 			},
	// 			SDA: {
	// 				exams: [
	// 					["CC1", 1],
	// 					["CC2", 1],
	// 					["TP", 1],
	// 				],
	// 				coef: 4,
	// 			},
	// 			POO: {
	// 				exams: [
	// 					["CC1", 1],
	// 					["TP", 1],
	// 					["Projet", 1],
	// 				],
	// 				coef: 4,
	// 			},
	// 			Web: {
	// 				exams: [
	// 					["CC1", 1],
	// 					["CC2", 1],
	// 					["Projet", 1],
	// 				],
	// 				coef: 4,
	// 			},
	// 			Langue: {
	// 				exams: [
	// 					["CC1", 1],
	// 					["CC2", 1],
	// 					["Presence", 1],
	// 				],
	// 				coef: 4,
	// 			},
	// 			Option: {
	// 				exams: [
	// 					["CC1", 1],
	// 					["CC2", 1],
	// 					["CC3", 1],
	// 				],
	// 				coef: 4,
	// 			},
	// 		},
	// 		S5: {},
	// 		S6: {},
	// 	};
	// }, []);

	const handleCalculateClick = () => {
		setIsCalculationTriggered(true);
	};

	// Reset the trigger after calculations are done
	useEffect(() => {
		if (isCalculationTriggered) {
			setIsCalculationTriggered(false);
		}
	}, [isCalculationTriggered]);

	const handleSelectedLevel = (level) => {
		setChosenLevel(level);
	};

	return (
		<div className="main-container text-center min-w-screen min-h-screen flex flex-col items-center px-6">
			<div className="inline-flex mt-6 p-2 justify-center items-center gap-2 border-b-2 border-black">
				<p className="text-7xl font-light text-text-950">Grade</p>
				<p className="text-7xl font-bold text-no-fill text-stroke-black">Calculator</p>
			</div>
			<LvlDropdown levelList={Object.keys(classList)} setChosenLevel={handleSelectedLevel} />
			<ClassCardsContainer
				currentLevel={chosenLevel}
				isCalculationTriggered={isCalculationTriggered}
			/>
			<CalculateButton onClick={handleCalculateClick} />
		</div>
	);
}
