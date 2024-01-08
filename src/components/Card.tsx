import React, { useState, useRef, useEffect } from "react";
import ArrowIcon from "./ArrowIcon.tsx";
import Exam from "./Exam.tsx";
import { calculateAverage } from "../hooks/calculateAverage.js";
import { useClassList } from "../hooks/useClassList";

// TODO : Add images for each class
// TODO : Add limit to 20 for the grades
// TODO : Add warning when the grade is over 20, not a number or < 0
// TODO : Add a way to specify max/min grade for an exam (ex: CC1: <20, TP: >10)

// Simplified image import and selection logic
const images = {
	analyse: ["analyse-1.png", "analyse-2.png"],
	poo: ["poo-1.png", "poo-2.png"],
	anglais: ["anglais-1.png", "anglais-2.png"],
	// ... other classes
};

const getRandomImage = (className) => {
	const imageFiles = images[className] || ["default.png"];
	const randomIndex = Math.floor(Math.random() * imageFiles.length);
	return require(`../assets/images/${imageFiles[randomIndex]}`);
};
const Card = ({
	//.PROPS
	classLevel,
	className,
	classCoef,
	classAverage,
	onCardUpdate,
	updateTrigger,
	onCalculationTrigger,
}) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const [isFolded, setFolded] = useState(true);
	const [imageUrl, setImageUrl] = useState("");
	const [allFilled, setAllFilled] = useState(false);
	const [userEdited, setUserEdited] = useState(false);
	const [average, setAverage] = useState(-1);

	const { classList, editClassAverage, editClassEdited } = useClassList();
	const startExamList = classList[classLevel][className].exams;
	const [examList, setExamList] = useState(startExamList);

	useEffect(() => {
		//* Sets the image on mount
		setImageUrl(getRandomImage(className.toLowerCase().replace(/\s+/g, "")));
	}, [className]);

	useEffect(() => {
		//* Sets the values for allFilled and userEdited
		// console.log(`${className} has been %c edited : %c ${userEdited}`, "color: DarkOrchid", `color: ${userEdited ? "green" : "red"}`);

		let fillCheck = examList.every((exam) => exam.grade !== -1) && userEdited;
		setAllFilled(fillCheck);
		editClassEdited(classLevel, className, userEdited);

		//update examList
		setExamList(classList[classLevel][className].exams);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [examList, updateTrigger, userEdited]);

	useEffect(() => {
		//* Calculates the average if allFilled is true, else sets it to -1
		// console.log(`${className} is %c filled : %c ${allFilled}`, "color: DarkKhaki", `color: ${allFilled ? "green" : "red"}`);
		if (allFilled) setAverage(calculateAverage("class", examList));
		else {
			setAverage(-1);
		}
	}, [allFilled, examList, updateTrigger]);

	useEffect(() => {
		//* Updates the average in the classList
		// console.log('%cUpdating average for ', 'color: DarkOrchid', className, 'to', average);
		editClassAverage(classLevel, className, average);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [average]);

	useEffect(() => {
		//* Checks if the calculation has been triggered and if allFilled is true to reset userEdited
		if (onCalculationTrigger) {
			if (!allFilled) {
				// console.log('Not all grades are filled for :', className);
				setUserEdited(false);
				return;
			}
		}
	}, [onCalculationTrigger, allFilled, className]);

	const handleCardUnfold = () => {
		setFolded(!isFolded);
		if (isFolded && cardRef.current) {
			cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	const handleExamUpdate = (examName, examValue) => {
		onCardUpdate(className, examName, examValue);
		if (userEdited === false) {
			console.log("the grade has been edited for the first time");
			setAverage(-1);
			editClassAverage(classLevel, className, -1);
		}
		setUserEdited(true);
	};

	return (
		<div
			ref={cardRef}
			className={`flex flex-col w-48 ${
				isFolded ? "h-48" : "h-64"
			} content-center items-center cursor-pointer`}
			{...(isFolded && { onClick: handleCardUnfold })}>
			{/* Image */}
			<div
				style={{ "--image-url": `url(${imageUrl})` } as React.CSSProperties}
				className={`inline-flex items-center justify-center class-card-image w-full ${
					isFolded ? "h-32" : "h-28"
				} rounded-t-lg border-primary-500 border-x-2 border-t-2 bg-[image:var(--image-url)]`}
				{...(!isFolded && { onClick: handleCardUnfold })}>
				<p
					className={`${
						classList[classLevel][className].average !== -1
							? "opacity-100"
							: "opacity-0"
					} average-show-transition text-center ${
						!userEdited ? "text-red-500" : "text-text-950/75"
					} text-2xl font-semibold bg-primary-200/70 rounded-lg border-2 border-primary-800 px-3 py-1`}>
					{classList[classLevel][className].average !== -1
						? parseFloat(classList[classLevel][className].average.toFixed(2))
						: ""}
				</p>
			</div>
			{/* Bottom */}
			<div
				className={`card-folding-transition w-full overflow-hidden bg-secondary-300 rounded-b-lg border-x-2 border-b-2 border-primary-400 ${
					isFolded
						? "h-[20%] inline-flex items-center justify-center"
						: "flex flex-col items-center h-full"
				}`}>
				<div
					className={`inline-flex justify-center items-center gap-2 ${
						!isFolded && "border-b-2 border-text-950"
					}`}
					{...(!isFolded && { onClick: handleCardUnfold })}>
					<p
						className={`text-center text-text-950 text-lg font-semibold ${
							!isFolded && "mt-1"
						}`}>
						{className}
					</p>
					<ArrowIcon direction={isFolded ? "down" : "up"} />
				</div>
				<div className={`${isFolded ? "hidden" : "block"} mt-2`}>
					{classList[classLevel][className].exams.map((exam, index) => (
						<Exam
							key={index}
							examName={exam.name}
							examGradeCoef={[exam.grade, exam.coef]}
							onExamUpdate={handleExamUpdate}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Card;
