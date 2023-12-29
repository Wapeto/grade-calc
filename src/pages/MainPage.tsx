import React, { useState } from "react";
import LvlDropdown from "../components/LvlDropdown.tsx";
import ClassCardsContainer from "../components/ClassCardsContainer.tsx";
import CalculateButton from "../components/CalculateButton.tsx";

export default function MainPage() {
	const [inputValues, setInputValues] = useState({});
	const [chosenLevel, setChosenLevel] = useState("S3");
	const [averages, setAverages] = useState({}); // averages = [{classId: "S3-Analyse", average: 12}, ...

	const classList = {
		S3: {
			Analyse: {
				exams: [
					["CC1", 1],
					["CC2", 2],
					["Projet", 1],
				],
				coef: 4,
			},
			LPL: {
				exams: [
					["CC1", 35],
					["CC2", 50],
					["TP", 15],
				],
				coef: 5,
			},
			Architecture: {
				exams: [
					["CC1", 2],
					["CC2", 5],
					["Projet", 3],
				],
				coef: 3,
			},
			SDA: {
				exams: [
					["CC1", 2],
					["CC2", 4],
					["TP", 4],
				],
				coef: 6,
			},
			POO: {
				exams: [
					["CC1", 2],
					["TP", 2],
					["Presence", 1],
				],
				coef: 3,
			},
			"Tech Dev": {
				exams: [
					["Rendu 1", 1],
					["Rendu 2", 1],
					["Projet", 1],
				],
				coef: 3,
			},
			Anglais: {
				exams: [
					["CC1", 5],
					["POEM 1", 2],
					["POEM 2", 3],
				],
				coef: 3,
			},
			Option: {
				exams: [
					["CC1", 1],
					["CC2", 1],
					["CC3", 1],
				],
				coef: 3,
			},
		},
		S4: {
			"Proba & Stat": {
				exams: [
					["CC1", 1],
					["CC2", 1],
					["Presence", 1],
				],
				coef: 4,
			},
			Analyse: {
				exams: [
					["CC1", 1],
					["CC2", 1],
					["TP", 1],
				],
				coef: 4,
			},
			Systems: {
				exams: [
					["Projet", 1],
					["CC1", 1],
					["TP", 1],
				],
				coef: 4,
			},
			Reseaux: {
				exams: [
					["CC1", 1],
					["CC2", 1],
					["Projet", 1],
				],
				coef: 4,
			},
			SDA: {
				exams: [
					["CC1", 1],
					["CC2", 1],
					["TP", 1],
				],
				coef: 4,
			},
			POO: {
				exams: [
					["CC1", 1],
					["TP", 1],
					["Projet", 1],
				],
				coef: 4,
			},
			Web: {
				exams: [
					["CC1", 1],
					["CC2", 1],
					["Projet", 1],
				],
				coef: 4,
			},
			Langue: {
				exams: [
					["CC1", 1],
					["CC2", 1],
					["Presence", 1],
				],
				coef: 4,
			},
			Option: {
				exams: [
					["CC1", 1],
					["CC2", 1],
					["CC3", 1],
				],
				coef: 4,
			},
		},
		S5: {},
		S6: {},
	};

	const handleInputChange = (id, value) => {
		setInputValues((prevValues) => {
			const updatedValues = { ...prevValues, [id]: parseFloat(value) };

			const classId = id.split("-")[0];

			// Check if all inputs for this class are filled
			const allFilled = classList[chosenLevel][classId].exams.every(
				([examName]) =>
					updatedValues[`${classId}-${examName}`] !== undefined &&
					!isNaN(updatedValues[`${classId}-${examName}`])
			);

			if (allFilled) {
				const grades = classList[chosenLevel][classId].exams.map(
					([examName]) => updatedValues[`${classId}-${examName}`]
				);
				const average = calculateAverage(grades, classList[chosenLevel][classId].exams.map(([, coef]) => coef));
				setAverages((prevAverages) => ({
					...prevAverages,
					[`${chosenLevel}-${classId}`]: average,
				}));
			} else {
				setAverages((prevAverages) => {
					const newAverages = { ...prevAverages };
					delete newAverages[`${chosenLevel}-${classId}`];
					return newAverages;
				});
			}

			return updatedValues;
		});
	};

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

	const findGlobalAverage = (values) => {
		if (Object.keys(values).length === 0) return 0;

		const averages_values_coefs = Object.entries(values).map(([key, average]) => {
			const [lvl, className] = key.split("-");
			return [average, classList[lvl][className].coef];
		});
		console.log(averages_values_coefs);

		// for (const [key, average] of Object.entries(values)) {
		// 	const [lvl, className] = key.split("-");
		// 	console.log(`The average for ${className} is ${average}`);
		// }
		// // get missing classes
		const classes = Object.keys(classList[chosenLevel]);
		const missingAverages = classes.filter((className) => !values[`${chosenLevel}-${className}`]);
		if (missingAverages.length > 0) {
			console.log(`Missing averages for ${missingAverages.join(", ")}`);
			return 0;
		}
		console.log(values)
		for (const level_course of Object.keys(averages)){
			
		}
		
	};

	const handleCalculateClick = () => {
		// console.log(inputValues);
		const globalAv = findGlobalAverage(averages);
		console.log(globalAv);
	};

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
				classList={classList[chosenLevel]}
				currentLevel={chosenLevel}
				onChange={handleInputChange}
				averages={averages}
			/>
			<CalculateButton onClick={handleCalculateClick} />
		</div>
	);
}
