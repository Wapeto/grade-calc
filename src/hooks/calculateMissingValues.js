import { ClassModel } from "../models/ClassModel";
import { ExamModel } from "../models/ExamModel";

// TODO: Add a function to calculate missing grades
export const calculateMissingValues = (type, values, targetAverage) => {
    if(type === "average"){
        console.log("%cCalculating missing averages...", "color: coral")
        let updatedValues = JSON.parse(JSON.stringify(values));
        // console.log("updatedValues :", updatedValues);
        let missingValues = {};
        let currentPoints = 0;
        let totalCoef = 0;
        let missingCoefs = 0;
        for (const className of Object.keys(values)) {
            if (values[className].average === -1 || values[className].isEdited === false) {
                console.log(`%c${className} average is missing`, `color: red`);
                // Deep copy the class instance
                missingValues[className] = new ClassModel(
                    values[className].level,
                    values[className].name,
                    values[className].exams.map(exam => new ExamModel(exam.name, exam.grade, exam.coef)),
                    values[className].coef,
                    values[className].average
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
        
        for (const className of Object.keys(missingValues)) {
            missingValues[className].average = pointsToGive / missingCoefs;

            calculateMissingGrades(missingValues[className].exams, missingValues[className].average)

            updatedValues[className] = missingValues[className];
            console.log(`%c${className} average is now ${updatedValues[className].average}`, `color: green`);
        }


        
        console.log("total points :", totalPoints);
        console.log("current points :", currentPoints);
        console.log('missing points :', pointsToGive);

        return updatedValues;

    } else if(type === "grade"){
        console.log("%cCalculating missing grades...", "color: BurlyWood")
    }
};

const calculateMissingGrades = (values, targetAverage) => {
    console.log(values, targetAverage)
    for (const exam of values) {
        if (exam.grade === -1) {
            console.log(`%c${exam.name} grade is missing`, `color: red`);
        } else {
            console.log(`%c${exam.name} grade is ${exam.grade}`, `color: green`);
        }
    }
};