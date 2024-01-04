import React, { useEffect, useState } from "react";
import ClassCard from "./ClassCard.tsx";

export default function ClassCardsContainer({ classList, currentLevel, onChange, averages , calculatedAverages, onCalculateMissingGrades, isCalculationTriggered, isAllFilledTrigger, onCardsEdit}) {
	const [editedCards, setEditedCards] = useState({});

	const handleEdit = (classTitle, isEdited) => {
		setEditedCards(prev => ({
			...prev,
			[`${currentLevel}-${classTitle}`]: isEdited
		}));
	};

	useEffect(() => {
		onCardsEdit(editedCards);
	}, [editedCards]);

	return (
		<div className="inline-flex max-w-70 justify-center items-start content-center gap-9 flex-wrap mt-28">
			{Object.keys(classList).map((classTitle, index) => (
				<ClassCard
					key={index}
					classTitle={classTitle}
					examList={classList[classTitle].exams}
					onInputChange={onChange}
					_average={averages[`${currentLevel}-${classTitle}`] || -1}
					calculatedAverage={calculatedAverages[`${currentLevel}-${classTitle}`] || -1}
					onCalculateMissingGrades={onCalculateMissingGrades}
					isCalculationTriggered={isCalculationTriggered}
					isAllFilled={isAllFilledTrigger[classTitle]}
					onEdit={handleEdit}
				/>
			))}
		</div>
	);
}
