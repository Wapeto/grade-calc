import React, { FC, useState, useRef, useEffect } from "react";
import ArrowIcon from "./ArrowIcon.tsx";

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

interface ClassCardProps {
	classTitle: string;
	examList?: string[];
	onInputChange: (id: string, value: string) => void;
	_average?: number;
	calculatedAverage?: number;
	onCalculateMissingGrades: (
		className: string,
		examValues: ExamGrades,
		targetAverage?: number
	) => ExamGrades;
	isCalculationTriggered: boolean;
	isAllFilled: boolean;
}

interface ExamGrades {
	[examName: string]: number | string;
}

const ClassCard: FC<ClassCardProps> = ({
	classTitle,
	examList,
	onInputChange,
	_average,
	calculatedAverage,
	onCalculateMissingGrades,
	isCalculationTriggered,
	isAllFilled,
}) => {
	//#region State & Refs
	const cardRef = useRef<HTMLDivElement>(null);
	const [isFolded, setFolded] = useState(true);
	const [imageUrl, setImageUrl] = useState("");
	const [average, setAverage] = useState(-1);
	const [isOriginalAverage, setIsOriginalAverage] = useState(true);
	const [examGrades, setExamGrades] = useState<ExamGrades>({});
	const [newExamValues, setNewExamValues] = useState<ExamGrades>({});


	//#endregion

	useEffect(() => {
		//Set image on mount
		setImageUrl(getRandomImage(classTitle.toLowerCase().replace(/\s+/g, "")));
	}, [classTitle]);

	useEffect(() => {
		//Set average to the one passed in props
		if (_average !== undefined) {
			setAverage(_average);
		}
	}, [_average]);

	useEffect(() => {
		//Set isOriginalAverage to true if all grades are filled
		if (isAllFilled) {
			setIsOriginalAverage(true);
			console.log(`%c${classTitle} is all filled`, "color: green");
		} else {
			setIsOriginalAverage(false);
		}
	}, [isAllFilled, classTitle]);

	useEffect(() => {
		if (
			(calculatedAverage === undefined ||
				calculatedAverage === -1 ||
				calculatedAverage === average) &&
			!(isCalculationTriggered && examList)
		) {
			return;
		}

		setAverage(calculatedAverage ?? -1);

		if (isCalculationTriggered && examList) {
			const updatedGrades = { ...examGrades };
			examList.forEach((exam) => {
				if (updatedGrades[exam[0]] === undefined) {
					updatedGrades[exam[0]] = -1;
				}
			});
			setExamGrades(updatedGrades);
			// const newExamValues = onCalculateMissingGrades(classTitle, updatedGrades, calculatedAverage);
			setNewExamValues(
				onCalculateMissingGrades(classTitle, updatedGrades, calculatedAverage)
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isCalculationTriggered, calculatedAverage, examGrades, examList]);

	useEffect(() => {
		if (!newExamValues || !Object.keys(newExamValues).length) {
			return;
		}
		// if (Object.keys(newExamValues).length === 0) {
		// 	return;
		// }
		console.log(`%c${classTitle} new exam values`, "color: green", newExamValues);
		setExamGrades(newExamValues);
	}, [newExamValues]);

	const handleCardUnfold = () => {
		setFolded(!isFolded);
		if (isFolded && cardRef.current) {
			cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	const handleInput = (examName: string, value: string) => {
		if (value === "") {
			// Directly set to empty string when input is cleared
			setExamGrades((prevGrades) => ({
				...prevGrades,
				[examName]: "",
			}));
		} else {
			// Parse and set as number otherwise
			const numericValue = parseFloat(value);
			setExamGrades((prevGrades) => ({
				...prevGrades,
				[examName]: !isNaN(numericValue) ? numericValue : -1,
			}));
		}
		onInputChange(`${classTitle}-${examName}`, value);
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
						average !== -1 ? "opacity-100" : "opacity-0"
					} average-show-transition text-center ${
						average === calculatedAverage && !isOriginalAverage
							? "text-red-500"
							: "text-text-950/75"
					} text-2xl font-semibold bg-primary-200/70 rounded-lg border-2 border-primary-800 px-3 py-1`}>
					{average !== -1 ? average : ""}
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
						{classTitle}
					</p>
					<ArrowIcon direction={isFolded ? "down" : "up"} />
				</div>
				<div className={`${isFolded ? "hidden" : "block"} mt-2`}>
					{examList?.map((exam, index) => {
						const examName = exam[0];
						// const isCalculated = newExamValues.hasOwnProperty(examName) && examGrades[examName] === -1;
						return (
							<input
								key={index}
								type="text"
								placeholder={exam[0]}
								value={examGrades[exam[0]] !== undefined ? examGrades[exam[0]] : ""}
								onChange={(e) => handleInput(exam[0], e.target.value)}
								className={`w-[60%] my-2 bg-primary-300/50 placeholder-black/50 text-center font-bold border-primary-600 border-2 rounded-lg`}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ClassCard;
