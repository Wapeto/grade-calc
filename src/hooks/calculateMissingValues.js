import { ClassModel } from "../models/ClassModel";
import { ExamModel } from "../models/ExamModel";

// TODO: Handle when the average is already above the target average
export const calculateMissingValues = (values, targetAverage) => {
    console.clear();
	console.log("%cCalculating missing averages...", "color: coral");
	let updatedValues = JSON.parse(JSON.stringify(values));
	// console.log("updatedValues :", updatedValues);
	let missingValues = {};
	let currentPoints = 0;
	let totalCoef = 0;
	let missingCoefs = 0;
	for (const className of Object.keys(values)) {
        const allGradesSet = checkIfAllGradesAreSet(values[className].exams);
		if (values[className].average === -1 || values[className].isEdited === false || allGradesSet === false) {
			console.log(`%c${className} average is missing`, `color: red`);
			// Deep copy the class instance
			missingValues[className] = new ClassModel(
				values[className].level,
				values[className].name,
				values[className].exams.map(
					(exam) => new ExamModel(exam.name, exam.grade, exam.coef, exam.isEdited)
				),
				values[className].coef,
				-1,
			);
			missingCoefs += values[className].coef;
		} else {
			console.log(`%c${className} average is ${values[className].average}`, `color: green`);
			currentPoints += values[className].average * values[className].coef;
		}
		totalCoef += values[className].coef;
	}

	const totalPoints = targetAverage * totalCoef;
	const pointsToGive = totalPoints - currentPoints;

    console.log('\n');
	for (const className of Object.keys(missingValues)) {
		missingValues[className].average = pointsToGive / missingCoefs;
		console.log("%cCalculating missing grades for", "color: BurlyWood", className, "...");
		const newGradesValues = calculateMissingGrades(missingValues[className].exams, missingValues[className].average);

        // console.log('New grades values :', newGradesValues, 'for', missingValues[className].average);

        missingValues[className].exams = newGradesValues;

		updatedValues[className] = missingValues[className];
		console.log(
			`%c${className} average is now ${updatedValues[className].average}`,
			`color: green`
		);
	}
    // console.log('Updated values :', updatedValues);
	return updatedValues;
};

const checkIfAllGradesAreSet = (values) => {
    for (const exam of values) {
        if (exam.grade === -1) {
            return false;
        }
    }
    return true;
};

const calculateMissingGrades = (values, targetAverage) => {
	// console.log(values, targetAverage)
	let missingGrades = {};
	let currentPoints = 0;
	let totalCoef = 0;
	let missingCoefs = 0;
	for (const exam of values) {
		if (exam.grade === -1) {
			console.log(`%c${exam.name} grade is missing`, `color: red`);
			// Deep copy the class instance
			missingGrades[exam.name] = new ExamModel(exam.name, exam.grade, exam.coef, exam.isEdited);
			missingCoefs += exam.coef;
		} else {
			console.log(`%c${exam.name} grade is ${exam.grade}`, `color: green`);
			currentPoints += exam.grade * exam.coef;
		}
		totalCoef += exam.coef;
	}

	const totalPoints = targetAverage * totalCoef;
	const pointsToGive = totalPoints - currentPoints;

	for (const examName of Object.keys(missingGrades)) {
		missingGrades[examName].grade = (pointsToGive / missingCoefs).toFixed(2);
		console.log(`%c${examName} grade is now ${missingGrades[examName].grade}`, `color: green`);
	}
    
    const updatedValues = values.map((exam) => {
        if (missingGrades[exam.name]) {
            return missingGrades[exam.name];
        } else {
            return exam;
        }
    });

    // console.log('Updated values :', updatedValues);
    return updatedValues;
};
