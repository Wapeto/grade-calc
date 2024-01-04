import React, { useEffect, useState } from "react";
import LvlDropdown from "../components/LvlDropdown.tsx";
import ClassCardsContainer from "../components/ClassCardsContainer.tsx";
import CalculateButton from "../components/CalculateButton.tsx";

export default function MainPage() {
	const [inputValues, setInputValues] = useState({});
	const [chosenLevel, setChosenLevel] = useState("S3");
	const [averages, setAverages] = useState({}); // averages = [{classId: "S3-Analyse", average: 12}, ...
	const [calculatedAverages, setCalculatedAverages] = useState({});
	const [userEnteredAverages, setUserEnteredAverages] = useState({});
	const [targetAverage, setTargetAverage] = useState(10);
	const [isCalculationTriggered, setIsCalculationTriggered] = useState(false);
	const [triggerIsAllFilled, setTriggerIsAllFilled] = useState({});
	const [userEditedCards, setUserEditedCards] = useState({});

	const classList = React.useMemo(() => {
		return {
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
	}, []);

	useEffect(() => {
		// Initialize with all classes set to false
		const initialFilledState = {};
		Object.keys(classList[chosenLevel]).forEach((classId) => {
			initialFilledState[classId] = false;
		});
		setTriggerIsAllFilled(initialFilledState);
	}, [chosenLevel, classList]);

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
				setTriggerIsAllFilled((prevValues) => ({
					...prevValues,
					[classId]: allFilled,
				}));
				
			// console.log(`%c${id} changed from ${prevValues[id]} to ${value} and all the values are filled: ${allFilled}`, "color: purple");
			if (allFilled) {
				const grades = classList[chosenLevel][classId].exams.map(
					([examName]) => updatedValues[`${classId}-${examName}`]
				);
				const average = calculateAverage(
					grades,
					classList[chosenLevel][classId].exams.map(([, coef]) => coef)
				);
				console.log(`%c${classId} average is ${average}`, "color: purple");
				setAverages((prevAverages) => ({
					...prevAverages,
					[`${chosenLevel}-${classId}`]: average,
				}));
				setUserEnteredAverages((prevAverages) => ({
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

	const handleCardsEdit = (editedCards) => {
		setUserEditedCards(editedCards);
		console.log("Edited cards", editedCards);

		const unfilteredList = {};
		Object.keys(editedCards).forEach((key) => {
			unfilteredList[key] = averages[key];
		});
		setUserEnteredAverages(unfilteredList);
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

	const calculateMissingAverages = (values, targetAverage = 10) => {
		setCalculatedAverages(averages);
		const classes = Object.keys(classList[chosenLevel]);
		const missingAverages = classes.filter(
			(className) => !values[`${chosenLevel}-${className}`]
		);
		const total_coef = classes.reduce(
			(acc, className) => acc + classList[chosenLevel][className].coef,
			0
		);
		var missing_coefs = 0;
		for (const className of missingAverages) {
			missing_coefs += classList[chosenLevel][className].coef;
		}
		const totalPoints = targetAverage * total_coef;
		const averages_values_coefs = Object.entries(values).map(([key, average]) => {
			const [lvl, className] = key.split("-");
			console.log(`%c${className} average is ${average}`, "color: orange");
			return [average, classList[lvl][className].coef];
		});
		const currentPoints = averages_values_coefs.reduce((acc, val) => acc + val[0] * val[1], 0);
		var pointsToGive = totalPoints - currentPoints;

		for (const className of missingAverages) {
			const coef = classList[chosenLevel][className].coef;
			const points = pointsToGive * (coef / missing_coefs);
			const neededGrade = parseFloat((points / coef).toFixed(2));
			// console.log(`For ${className}, you need to get ${neededGrade} to get a ${targetAverage} average`);
			setCalculatedAverages((prevAverages) => ({
				...prevAverages,
				[`${chosenLevel}-${className}`]: neededGrade,
			}));
		}
	};

	const calculateMissingGrades = (className, examValues, targetAverage = 10) => {
		if (triggerIsAllFilled[className]) return;
		console.log(`%cCalculating missing grades for ${className}`, "color: yellow");
		const missingExamsGrades = Object.entries(examValues)
			.filter(([examName, grade]) => grade === -1)
			.map(([examName]) => examName);
		console.log(`Missing grades for ${className}: ${missingExamsGrades.join(", ")}`);
		const newExamValues = { ...examValues };
		const sum_of_coefs = classList[chosenLevel][className].exams.reduce(
			(acc, [, coef]) => acc + coef,
			0
		);
		var missing_coefs = 0;
		for (const examName of missingExamsGrades) {
			missing_coefs += classList[chosenLevel][className].exams.find(
				([name]) => name === examName
			)[1];
		}
		const totalPoints = parseFloat((targetAverage * sum_of_coefs).toFixed(2));
		const currentPoints = Object.entries(newExamValues).reduce(
			(acc, [examName, grade]) =>
				grade !== -1
					? acc + (grade as number) * classList[chosenLevel][className].exams.find(([name]) => name === examName)[1]
					: acc,
			0
		);
		console.log(`%cTotal points: ${totalPoints}, %c current points: ${currentPoints}, %c missing points: ${totalPoints - currentPoints}`, "color: teal", "color: green", "color: red");
		var pointsToGive = totalPoints - currentPoints;
		for (const examName of missingExamsGrades) {
			const coef = classList[chosenLevel][className].exams.find(
				([name]) => name === examName
			)[1];
			const points = pointsToGive * (coef / missing_coefs);
			const neededGrade = parseFloat((points / coef).toFixed(2));
			console.log(`For ${examName}, you need to get %c${neededGrade}%c to get a ${targetAverage} average`, "color: green", "color: white");
			newExamValues[examName] = neededGrade;
		}
		return newExamValues;
	};

	useEffect(() => {
		const av = calculateGlobalAverage(calculatedAverages);
		if (av === 0) return;
		if (av !== targetAverage)
			console.log("There was an error calculating the missing averages");
		else console.log("All good");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [calculatedAverages]);

	const handleCalculateClick = () => {
		setIsCalculationTriggered(true);
		console.log("%cStart of calculations", "color: green; font-weight: bold");
		console.log("The current user averages are", userEnteredAverages);
		calculateMissingAverages(userEnteredAverages, targetAverage);
	};

	// Reset the trigger after calculations are done
	useEffect(() => {
		if (isCalculationTriggered) {
			console.log("%cEnd of calculations", "color: green; font-weight: bold");
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
				classList={classList[chosenLevel]}
				currentLevel={chosenLevel}
				onChange={handleInputChange}
				averages={averages}
				calculatedAverages={calculatedAverages}
				onCalculateMissingGrades={calculateMissingGrades}
				isCalculationTriggered={isCalculationTriggered}
				isAllFilledTrigger={triggerIsAllFilled}
				onCardsEdit={handleCardsEdit}
			/>
			<CalculateButton onClick={handleCalculateClick} />
		</div>
	);
}
