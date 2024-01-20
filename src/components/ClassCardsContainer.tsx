import React, { useEffect, useState } from "react";
import { ClassListContext } from "../ClassListContext";
import { useClassList } from "../hooks/useClassList";
import Card from "./Card.tsx";
import { calculateMissingValues } from "../hooks/calculateMissingValues.js";
import { calculateAverage } from "../hooks/calculateAverage.js";

const ClassCardsContainer = ({isCalculationTriggered }) => {
	const { classList, editExamGrade } = useClassList();
	const { updateClassList } = React.useContext(ClassListContext);

	const [updateTrigger, setUpdateTrigger] = useState(0);

	const handleCardsEdit = (className, examName, examValue) => {
		editExamGrade(className, examName, examValue);

		setUpdateTrigger((oldValue) => oldValue + 1);
	};

	console.log("The values before edit are : ", classList);
	// console.log(Object.keys(classList));

	useEffect(() => {
		if (isCalculationTriggered) {
			for (const className of Object.keys(classList)) {
				for (const exam of classList[className].exams) {
					if (!exam.isEdited){
						exam.grade = -1;
					}
				}
			}
			console.log("%cStart of calculations", "color: green");
			// console.log('Values going into the calculation : ', classList[level]);
			const updatedValues = calculateMissingValues(classList, 10);

			// Update the context state with new values
			Object.keys(updatedValues).forEach((className) => {
				updateClassList(className, updatedValues[className]);
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
	}, [isCalculationTriggered, classList, updateClassList]);

	return (
		<div className="inline-flex justify-center items-start content-center gap-9 flex-wrap mt-28">
			{Object.keys(classList).map((classTitle, index) => (
				<Card
					key={index}
					className={classTitle}
					classCoef={classList[classTitle].coef}
					classAverage={-1}
					// examList={classList[level][classTitle].exams}
					onCardUpdate={handleCardsEdit}
					updateTrigger={updateTrigger}
					onCalculationTrigger={isCalculationTriggered}
				/>
			))}
		</div>
	);
};

export default ClassCardsContainer;
