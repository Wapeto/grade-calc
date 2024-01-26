import React, { useEffect, useState, useContext } from "react";
import ClassCardsContainer from "../components/ClassCardsContainer.tsx";
import CalculateButton from "../components/CalculateButton.tsx";
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
					<ClassCardsContainer
						isCalculationTriggered={isCalculationTriggered}
						targetAverage={targetAverage}
						isResetTriggered={isResetTriggered}
					/>
					<div className="flex w-full justify-between items-end border-t-2 mt-10 pb-2 pt-4 fixed bottom-0 bg-white ">
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
						<div className="flex items-center gap-4 bg-red fixed right-2 bottom-4">
							<ResetButton onClick={handleResetClick} />
							<CalculateButton onClick={handleCalculateClick} />
						</div>
					</div>
				</div>
			) : (
				<div className="flex flex-col flex-grow justify-center items-center p-7 pl-72 text-text-400 text-3xl">
					Choisissez un cursus et un niveau
				</div>
			)}
		</div>
	);
}
