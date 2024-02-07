import { get } from "http";
import React from "react";

const Exam = ({ exam, onExamUpdate, updateEditedState }) => {
	const handleExamValueChange = (e) => {
		// const value = parseFloat(e.target.value);
		const value = e.target.value;
		onExamUpdate(exam.name, value === "" ? -1 : value);
		updateEditedState(exam.name, value !== "");
	};

	const getBorderColor = () => {
		if (exam.isCalculated) return "border-primary-500";
		else if (exam.grade > 20 || (exam.grade < 0 && exam.grade !== -1)) return "border-red-500";
		else return "border-secondary-200";
	};

	return (
		<div className="exam flex flex-col items-start gap-1">
			<label htmlFor={exam.name} className="text-base font-normal">
				{exam.name}
			</label>
			<div className="input-field inline-flex items-center w-[100%] max-w-40">
				<input
					type="number"
					name={exam.name}
					id={exam.name}
					className={`w-[70%] h-8 border-y border-l rounded-l-md py-2 pl-2 text-sm ${
						getBorderColor()
					}`}
					onChange={handleExamValueChange}
					value={exam.grade === -1 ? "" : exam.grade}
				/>
				<div
					className={`min-w-fit h-8 text-base font-normal text-text-500 bg-white border-y border-r rounded-r px-2 flex items-center ${getBorderColor()}`}>{`Coef ${exam.coef}`}</div>
			</div>
		</div>
	);
};

export default Exam;
