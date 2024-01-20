import React, { useState } from "react";

const Exam = ({ examName, examGradeCoef, onExamUpdate, updateEditedState }) => {
	const [isUserEdited, setIsUserEdited] = useState(false);
	const isCalculatedGrade = examGradeCoef[0] === -1;

	const handleExamValueChange = (e) => {
		// const value = parseFloat(e.target.value);
		const value = e.target.value;
		onExamUpdate(examName, value === "" ? -1 : value);
		setIsUserEdited(value !== "");
		updateEditedState(examName, value !== "");
	};

	return (
		<div className="exam flex flex-col items-start gap-1">
			<label htmlFor={examName} className="text-base font-normal">
				{examName}
			</label>
			<div className="grade-input inline-flex items-center">
				<input
					type="number"
					name={examName}
					id={examName}
					className="w-24 h-8 border-y border-l border-secondary-200 rounded-l-md p-2 text-sm"
					// placeholder={isCalculatedGrade ? "N/A" : examGradeCoef[0]}
					onChange={handleExamValueChange}
				/>
				<div className="h-full text-base font-normal text-text-500 bg-white border-y border-r border-secondary-200  rounded-r px-2 flex items-center">{`Coef ${examGradeCoef[1]}`}</div>
			</div>
		</div>
	);
};

export default Exam;
