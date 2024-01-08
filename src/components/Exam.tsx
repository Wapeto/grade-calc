import React, {useState } from "react";

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
		<input
			type="text"
			placeholder={examName}
			value={isCalculatedGrade ? "" : examGradeCoef[0]}
			onInput={(e) => handleExamValueChange(e)}
			className={`w-[60%] my-2 bg-primary-300/50 placeholder-black/50 text-center font-bold border-primary-600 border-2 rounded-lg ${
				!isUserEdited ? "calculated-grade-class" : "user-grade-class"
			}`}
		/>
	);
};

export default Exam;
