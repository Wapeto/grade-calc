import React, { useEffect, useState } from "react";
import { ClassListContext } from "../ClassListContext";
import { useClassList } from "../hooks/useClassList";
import Card from "./Card.tsx";
import { calculateMissingValues } from "../hooks/calculateMissingValues.js";
import { calculateAverage } from "../hooks/calculateAverage.js";

const ClassCardsContainer = ({ currentLevel, isCalculationTriggered }) => {
	const { classList, editExamGrade } = useClassList();
	const { updateClassList } = React.useContext(ClassListContext);

	const [updateTrigger, setUpdateTrigger] = useState(0);

	const handleCardsEdit = (className, examName, examValue) => {
		editExamGrade(currentLevel, className, examName, examValue);

		setUpdateTrigger((oldValue) => oldValue + 1);
	};

	// console.log("The values before edit are : ", classList[currentLevel]);

	useEffect(() => {
		if (isCalculationTriggered) {
			console.log("%cStart of calculations", "color: green");
			const updatedValues = calculateMissingValues(classList[currentLevel], 10);

			// Update the context state with new values
			Object.keys(updatedValues).forEach((className) => {
				updateClassList(currentLevel, className, updatedValues[className]);
			});

			console.log("%cEnd of calculations", "color: green");

			const globalAverage = calculateAverage("global", updatedValues);
	
			console.log("\n%cGlobal average : ", "color: green", globalAverage);
			if (parseFloat(globalAverage.toFixed(2)) === 10){
				console.log('%cAll good !', 'color: green');
			}else{
				console.log('%cNot good (there was an error calculating the missing averages or grades) :(', 'color: red');
			}
		}
	}, [isCalculationTriggered, classList, currentLevel, updateClassList]);

	return (
		<div className="inline-flex max-w-70 justify-center items-start content-center gap-9 flex-wrap mt-28">
			{Object.keys(classList[currentLevel]).map((classTitle, index) => (
				<Card
					key={index}
					classLevel={currentLevel}
					className={classTitle}
					classCoef={classList[currentLevel][classTitle].coef}
					classAverage={-1}
					// examList={classList[currentLevel][classTitle].exams}
					onCardUpdate={handleCardsEdit}
					updateTrigger={updateTrigger}
					onCalculationTrigger={isCalculationTriggered}
				/>
			))}
		</div>
	);
};

export default ClassCardsContainer;
