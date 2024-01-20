import React, { useEffect, useState, useContext } from "react";
import LvlDropdown from "../components/LvlDropdown.tsx";
import ClassCardsContainer from "../components/ClassCardsContainer.tsx";
import CalculateButton from "../components/CalculateButton.tsx";
import { useClassList } from "../hooks/useClassList";
import Sidebar from "../components/Sidebar.jsx";
import { createOriginalClasslist } from "../hooks/createOriginalClasslist.js";
import { ClassListContext } from "../ClassListContext";
import ResetButton from "../components/ResetButton.tsx";

// TODO: Add instructions
export default function MainPage() {
	const [chosenCursus, setChosenCursus] = useState("");
	const [chosenLevel, setChosenLevel] = useState("");
	const [targetAverage, setTargetAverage] = useState(10);
	const [isCalculationTriggered, setIsCalculationTriggered] = useState(false);
	const [isResetTriggered, setIsResetTriggered] = useState(false);

	const { setOriginalClassList } = useContext(ClassListContext);
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

	const handleTargetAverageChange = (e) => {
		setTargetAverage(e.target.value);
	};

	// Reset the trigger after calculations are done
	useEffect(() => {
		if (isCalculationTriggered) {
			setIsCalculationTriggered(false);
		}
	}, [isCalculationTriggered]);

	const handleSelectedLevel = async (cursus, level) => {
		setChosenCursus(cursus);
		setChosenLevel(level);
		console.log("cursus :", cursus, "level :", level);
		const ogClassList = await createOriginalClasslist(cursus, level);
		console.log("ogClassList :", ogClassList);
		setOriginalClassList(ogClassList);
	};

	const handleResetClick = () => {
		setIsResetTriggered(true);
	};

	useEffect(() => {
		if (isResetTriggered) {
			setIsResetTriggered(false);
		}
	}, [isResetTriggered]);

	return (
		<div className="main-container bg-white text-center min-w-screen min-h-screen flex ">
			<Sidebar levelHandling={handleSelectedLevel} />
			{chosenCursus !== "" && chosenLevel !== "" ? (
				<div className="flex flex-col flex-grow justify-start items-start p-7 pl-72">
					<div className="p-2 flex w-full items-baseline gap-4 border-b-2 ">
						<h2 className="font-bold text-3xl">{chosenCursus}</h2>
						<h3 className="font-normal text-2xl">{`Semestre ${chosenLevel.slice(
							1
						)}`}</h3>
					</div>
					<ClassCardsContainer isCalculationTriggered={isCalculationTriggered} targetAverage={targetAverage} isResetTriggered={isResetTriggered}/>
					<div className="flex w-full justify-between items-end border-t-2 mt-8 py-4 ">
						<div className="flex flex-col items-start gap-2">
							<p className="text-text-950">Moyenne visée</p>
							<div className="input-field inline-flex items-center">
								<input
									type="number"
									name="target average"
									className="w-24 h-8 border-y border-l border-secondary-200 rounded-l-md p-2 text-base"
									placeholder={targetAverage.toString()}
									onChange={handleTargetAverageChange}
								/>
								<div className="h-8 text-base font-normal text-text-500 bg-white border-y border-r border-secondary-200  rounded-r px-2 flex items-center">
									{"/20"}
								</div>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<ResetButton onClick={handleResetClick}/>
							<CalculateButton onClick={handleCalculateClick} />
						</div>
					</div>
				</div>
			):(
				<div className="flex flex-col flex-grow justify-center items-center p-7 pl-72 text-text-400 text-3xl">
					Choisissez un cursus et un niveau
				</div>
			)
			}
		</div>
	);
}
