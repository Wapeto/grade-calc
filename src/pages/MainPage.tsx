import React, { useEffect, useState } from "react";
import LvlDropdown from "../components/LvlDropdown.tsx";
import ClassCardsContainer from "../components/ClassCardsContainer.tsx";
import CalculateButton from "../components/CalculateButton.tsx";
import { useClassList } from "../hooks/useClassList";


export default function MainPage() {
	const [chosenLevel, setChosenLevel] = useState("S3");
	const [targetAverage, setTargetAverage] = useState(10);
	const [isCalculationTriggered, setIsCalculationTriggered] = useState(false);

	const { classList } = useClassList();

	// const classList = React.useMemo(() => {
	// 	return {
	// 		S3: {
	// 			Analyse: {
	// 				exams: [
	// 					new ExamModel("CC1", -1, 1),
	// 					new ExamModel("CC2", -1, 2),
	// 					new ExamModel("Projet", -1, 1),
	// 				],
	// 				coef: 4,
	// 			},
	// 			LPL: {
	// 				exams: [
	// 					new ExamModel("CC1", -1, 35),
	// 					new ExamModel("CC2", -1, 50),
	// 					new ExamModel("TP", -1, 15),
	// 				],
	// 				coef: 5,
	// 			},
	// 			Architecture: {
	// 				exams: [
	// 					new ExamModel("CC1", -1, 2),
	// 					new ExamModel("CC2", -1, 5),
	// 					new ExamModel("Projet", -1, 3),
	// 				],
	// 				coef: 3,
	// 			},
	// 			SDA: {
	// 				exams: [
	// 					new ExamModel("CC1", -1, 2),
	// 					new ExamModel("CC2", -1, 4),
	// 					new ExamModel("TP", -1, 4),
	// 				],
	// 				coef: 6,
	// 			},
	// 			POO: {
	// 				exams: [
	// 					new ExamModel("CC1", -1, 2),
	// 					new ExamModel("TP", -1, 2),
	// 					new ExamModel("Presence", -1, 1),
	// 				],
	// 				coef: 3,
	// 			},
	// 			"Tech Dev": {
	// 				exams: [
	// 					new ExamModel("Rendu 1", -1, 1),
	// 					new ExamModel("Rendu 2", -1, 1),
	// 					new ExamModel("Projet", -1, 1),
	// 				],
	// 				coef: 3,
	// 			},
	// 			Anglais: {
	// 				exams: [
	// 					new ExamModel("CC1", -1, 5),
	// 					new ExamModel("POEM 1", -1, 2),
	// 					new ExamModel("POEM 2", -1, 3),
	// 				],
	// 				coef: 3,
	// 			},
	// 			Option: {
	// 				exams: [
	// 					new ExamModel("CC1", -1, 1),
	// 					new ExamModel("CC2", -1, 1),
	// 					new ExamModel("CC3", -1, 1),
	// 				],
	// 				coef: 3,
	// 			},
	// 		},
	// 		S4: {
	// 			"Proba & Stat": {
	// 				exams: [
	// 					["CC1", 1],
	// 					["CC2", 1],
	// 					["Presence", 1],
	// 				],
	// 				coef: 4,
	// 			},
	// 			Analyse: {
	// 				exams: [
	// 					["CC1", 1],
	// 					["CC2", 1],
	// 					["TP", 1],
	// 				],
	// 				coef: 4,
	// 			},
	// 			Systems: {
	// 				exams: [
	// 					["Projet", 1],
	// 					["CC1", 1],
	// 					["TP", 1],
	// 				],
	// 				coef: 4,
	// 			},
	// 			Reseaux: {
	// 				exams: [
	// 					["CC1", 1],
	// 					["CC2", 1],
	// 					["Projet", 1],
	// 				],
	// 				coef: 4,
	// 			},
	// 			SDA: {
	// 				exams: [
	// 					["CC1", 1],
	// 					["CC2", 1],
	// 					["TP", 1],
	// 				],
	// 				coef: 4,
	// 			},
	// 			POO: {
	// 				exams: [
	// 					["CC1", 1],
	// 					["TP", 1],
	// 					["Projet", 1],
	// 				],
	// 				coef: 4,
	// 			},
	// 			Web: {
	// 				exams: [
	// 					["CC1", 1],
	// 					["CC2", 1],
	// 					["Projet", 1],
	// 				],
	// 				coef: 4,
	// 			},
	// 			Langue: {
	// 				exams: [
	// 					["CC1", 1],
	// 					["CC2", 1],
	// 					["Presence", 1],
	// 				],
	// 				coef: 4,
	// 			},
	// 			Option: {
	// 				exams: [
	// 					["CC1", 1],
	// 					["CC2", 1],
	// 					["CC3", 1],
	// 				],
	// 				coef: 4,
	// 			},
	// 		},
	// 		S5: {},
	// 		S6: {},
	// 	};
	// }, []);

	const calculateAverage = (values, coefficients) => {
		let totalScore = 0;
		let totalCoefficients = 0;
		for (let i = 0; i < values.length; i++) {
			const score = values[i];
			const coef = coefficients[i];

			if (score !== undefined && !isNaN(score) && coef !== undefined && !isNaN(coef)) {
				totalScore += score * coef;
				totalCoefficients += coef;
			}
		}

		return totalCoefficients > 0 ? parseFloat((totalScore / totalCoefficients).toFixed(2)) : 0;
	};

	const calculateGlobalAverage = (values) => {
		if (Object.keys(values).length === 0) return 0;

		const classes = Object.keys(classList[chosenLevel]);
		const missingAverages = classes.filter(
			(className) => !values[`${chosenLevel}-${className}`]
		);
		if (missingAverages.length > 0) {
			console.log(`Missing averages for ${missingAverages.join(", ")}`);
			return 0;
		}
		const averages_values_coefs = Object.entries(values).map(([key, average]) => {
			const [lvl, className] = key.split("-");
			return [average, classList[lvl][className].coef];
		});
		const globalAverage = calculateAverage(
			averages_values_coefs.map(([average]) => average),
			averages_values_coefs.map(([, coef]) => coef)
		);
		console.log(`The global average is ${globalAverage}`);
		return globalAverage;
	};

	// const calculateMissingAverages = (values, targetAverage = 10) => {
	// 	setCalculatedAverages(averages);
	// 	const classes = Object.keys(classList[chosenLevel]);
	// 	const missingAverages = classes.filter(
	// 		(className) => !values[`${chosenLevel}-${className}`]
	// 	);
	// 	const total_coef = classes.reduce(
	// 		(acc, className) => acc + classList[chosenLevel][className].coef,
	// 		0
	// 	);
	// 	var missing_coefs = 0;
	// 	for (const className of missingAverages) {
	// 		missing_coefs += classList[chosenLevel][className].coef;
	// 	}
	// 	const totalPoints = targetAverage * total_coef;
	// 	const averages_values_coefs = Object.entries(values).map(([key, average]) => {
	// 		const [lvl, className] = key.split("-");
	// 		console.log(`%c${className} average is ${average}`, "color: orange");
	// 		return [average, classList[lvl][className].coef];
	// 	});
	// 	const currentPoints = averages_values_coefs.reduce((acc, val) => acc + val[0] * val[1], 0);
	// 	var pointsToGive = totalPoints - currentPoints;

	// 	for (const className of missingAverages) {
	// 		const coef = classList[chosenLevel][className].coef;
	// 		const points = pointsToGive * (coef / missing_coefs);
	// 		const neededGrade = parseFloat((points / coef).toFixed(2));
	// 		// console.log(`For ${className}, you need to get ${neededGrade} to get a ${targetAverage} average`);
	// 		setCalculatedAverages((prevAverages) => ({
	// 			...prevAverages,
	// 			[`${chosenLevel}-${className}`]: neededGrade,
	// 		}));
	// 	}
	// };

	// const calculateMissingGrades = (className, examValues, targetAverage = 10) => {
	// 	if (triggerIsAllFilled[className]) return;
	// 	console.log(`%cCalculating missing grades for ${className}`, "color: yellow");
	// 	const missingExamsGrades = Object.entries(examValues)
	// 		.filter(([examName, grade]) => grade === -1)
	// 		.map(([examName]) => examName);
	// 	console.log(`Missing grades for ${className}: ${missingExamsGrades.join(", ")}`);
	// 	const newExamValues = { ...examValues };
	// 	const sum_of_coefs = classList[chosenLevel][className].exams.reduce(
	// 		(acc, [, coef]) => acc + coef,
	// 		0
	// 	);
	// 	var missing_coefs = 0;
	// 	for (const examName of missingExamsGrades) {
	// 		missing_coefs += classList[chosenLevel][className].exams.find(
	// 			([name]) => name === examName
	// 		)[1];
	// 	}
	// 	const totalPoints = parseFloat((targetAverage * sum_of_coefs).toFixed(2));
	// 	const currentPoints = Object.entries(newExamValues).reduce(
	// 		(acc, [examName, grade]) =>
	// 			grade !== -1
	// 				? acc +
	// 				  (grade as number) *
	// 						classList[chosenLevel][className].exams.find(
	// 							([name]) => name === examName
	// 						)[1]
	// 				: acc,
	// 		0
	// 	);
	// 	console.log(
	// 		`%cTotal points: ${totalPoints}, %c current points: ${currentPoints}, %c missing points: ${
	// 			totalPoints - currentPoints
	// 		}`,
	// 		"color: teal",
	// 		"color: green",
	// 		"color: red"
	// 	);
	// 	var pointsToGive = totalPoints - currentPoints;
	// 	for (const examName of missingExamsGrades) {
	// 		const coef = classList[chosenLevel][className].exams.find(
	// 			([name]) => name === examName
	// 		)[1];
	// 		const points = pointsToGive * (coef / missing_coefs);
	// 		const neededGrade = parseFloat((points / coef).toFixed(2));
	// 		console.log(
	// 			`For ${examName}, you need to get %c${neededGrade}%c to get a ${targetAverage} average`,
	// 			"color: green",
	// 			"color: white"
	// 		);
	// 		newExamValues[examName] = neededGrade;
	// 	}
	// 	return newExamValues;
	// };

	// useEffect(() => {
	// 	const av = calculateGlobalAverage(calculatedAverages);
	// 	if (av === 0) return;
	// 	if (av !== targetAverage)
	// 		console.log("There was an error calculating the missing averages");
	// 	else console.log("All good");
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [calculatedAverages]);

	const handleCalculateClick = () => {
		setIsCalculationTriggered(true);
	};

	// Reset the trigger after calculations are done
	useEffect(() => {
		if (isCalculationTriggered) {
			setIsCalculationTriggered(false);
		}
	}, [isCalculationTriggered]);

	const handleSelectedLevel = (level) => {
		setChosenLevel(level);
	};

	return (
		<div className="main-container text-center min-w-screen min-h-screen flex flex-col items-center px-6">
			<div className="inline-flex mt-6 p-2 justify-center items-center gap-2 border-b-2 border-black">
				<p className="text-7xl font-light text-text-950">Grade</p>
				<p className="text-7xl font-bold text-no-fill text-stroke-black">Calculator</p>
			</div>
			<LvlDropdown levelList={Object.keys(classList)} setChosenLevel={handleSelectedLevel} />
			<ClassCardsContainer
				currentLevel={chosenLevel}
				isCalculationTriggered={isCalculationTriggered}
			/>
			<CalculateButton onClick={handleCalculateClick} />
		</div>
	);
}
