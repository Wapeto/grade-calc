import React from "react";

const Exam = ({ exam, onExamUpdate, updateEditedState }) => {

	const handleExamValueChange = (e) => {
		// const value = parseFloat(e.target.value);
		const value = e.target.value;
		onExamUpdate(exam.name, value === "" ? -1 : value);
		updateEditedState(exam.name, value !== "");
	};

	return (
		<div className="exam flex flex-col items-start gap-1">
			<label htmlFor={exam.name} className="text-base font-normal">
				{exam.name}
			</label>
			<div className="input-field inline-flex items-center">
				<input
					type="number"
					name={exam.name}
					id={exam.name}
					className={`w-24 h-8 border-y border-l rounded-l-md py-2 pl-2 text-sm ${
						!exam.isCalculated ? "border-secondary-200" : "border-primary-500"
					}`}
					onChange={handleExamValueChange}
					value={exam.grade === -1 ? "" : exam.grade}
				/>
				<div
					className={`h-full text-base font-normal text-text-500 bg-white border-y border-r rounded-r px-2 flex items-center ${
						!exam.isCalculated ? "border-secondary-200" : "border-primary-500"
					}`}>{`Coef ${exam.coef}`}</div>
			</div>
		</div>
	);
};

export default Exam;
