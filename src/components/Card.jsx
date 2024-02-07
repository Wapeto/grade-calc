import React, { useState, useEffect } from "react";
import Exam from "./Exam.tsx";
import { calculateAverage } from "../hooks/calculateAverage.js";
import { useClassList } from "../hooks/useClassList.js";
import defaultIcon from "../assets/icons/SVG/Class.svg";

// TODO : Add images for each class
// TODO : Add limit to 20 for the grades
// TODO : Add warning when the grade is over 20, not a number or < 0
// TODO : Add a way to specify max/min grade for an exam (ex: CC1: <20, TP: >10)
// TODO : Add a way to choose between different options

// Simplified image import and selection logic
const images = {
	analyse: ["analyse-1.png", "analyse-2.png"],
	poo: ["poo-1.png", "poo-2.png"],
	anglais: ["anglais-1.png", "anglais-2.png"],
	lpl: ["lpl-1.png", "lpl-2.png"],
	architecture: ["architecture-1.png", "architecture-2.png"],
	sda: ["sda-1.png", "sda-2.png"],
	techdev: ["tech-dev-1.png", "tech-dev-2.png"],
	// ... other classes
};

const getRandomImage = (className) => {
	const imageFiles = images[className] || ["default.png"];
	const randomIndex = Math.floor(Math.random() * imageFiles.length);
	return require(`../assets/images/${imageFiles[randomIndex]}`);
};

const Card = ({
	//.PROPS
	className,
	classCoef,
	classAverage,
	onCardUpdate,
	updateTrigger,
	onCalculationTrigger,
	resetTrigger,
}) => {
	const [imageUrl, setImageUrl] = useState("");
	const [allFilled, setAllFilled] = useState(false);
	const [userEdited, setUserEdited] = useState(false);
	const [average, setAverage] = useState(-1);

	const { classList, editClassAverage, editClassEdited, editExamEdited } = useClassList();
	const startExamList = classList[className].exams;
	const [examList, setExamList] = useState(startExamList);

	useEffect(() => {
		//* Sets the image on mount
		setImageUrl(getRandomImage(className.toLowerCase().replace(/\s+/g, "")));
	}, [className]);

	useEffect(() => {
		//* Sets the values for allFilled and userEdited
		// console.log(`${className} has been %c edited : %c ${userEdited}`, "color: DarkOrchid", `color: ${userEdited ? "green" : "red"}`);
		if (!examList) return;
		let fillCheck = examList.every((exam) => exam.grade !== -1) && userEdited;
		setAllFilled(fillCheck);
		editClassEdited(className, userEdited);

		//update examList
		setExamList(classList[className].exams);

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
		editClassAverage(className, average);
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


	const handleExamUpdate = (examName, examValue) => {
		onCardUpdate(className, examName, examValue);
		if (userEdited === false) {
			// console.log("the grade has been edited for the first time");
			setAverage(-1);
			editClassAverage(className, -1);
		}
		setUserEdited(true);
	};

	const handleGradeUpdate = (examName, edited) => {
		editExamEdited(className, examName, edited);
		// console.log('Edited state for', examName, 'is', edited);
		if (!allFilled) {
			setAverage(-1);
			editClassAverage(className, -1);
		}
	};

	return (
		<div className=" w-[45%] border border-secondary-200 rounded-2xl p-4 flex flex-col items-start gap-4">
			<div className="w-full flex justify-between">
				<img src={defaultIcon} alt="default class icon" className="w-8 h-8" />
				{classList[className].average !== -1 && (
					<span className="inline-flex">
						<p className="text-2xl font-bold text-primary-500">
							{parseFloat(classList[className].average.toFixed(2))}
						</p>
						<p className="text-2xl font-bold text-text-950">{"/20"}</p>
					</span>
				)}
			</div>
			<h3 className="text-2xl font-semibold">{className}</h3>
			<div className="flex flex-wrap gap-x-4 gap-y-2">
				{classList[className].exams.map((exam, index) => (
					<Exam
						key={index}
						exam={exam}
						onExamUpdate={handleExamUpdate}
						updateEditedState={handleGradeUpdate}
					/>
				))}
			</div>
		</div>
	);
};

export default Card;
