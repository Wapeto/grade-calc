export const calculateAverage = (type, values) => {
	// console.log("values", values);
	if (type === "global") {
        const classes = Object.keys(values);
        const missingValues = classes.filter(className => values[className].average === -1);
        if (missingValues.length > 0) {
            console.log(`%c${missingValues.join(", ")} average is missing... Aborting !`, `color: red`);
            return -1;
        }
        let totalScore = 0;
        let totalCoef = 0;
        for (let i = 0; i < classes.length; i++) {
            totalScore += values[classes[i]].average * values[classes[i]].coef;
            totalCoef += values[classes[i]].coef;
        }
        return totalScore / totalCoef;
	}
	if (type === "class") {
		let totalScore = 0;
		let totalCoef = 0;
		for (let i = 0; i < values.length; i++) {
			totalScore += values[i].grade * values[i].coef;
			totalCoef += values[i].coef;
		}
		return totalScore / totalCoef;
	}
    return 0;
};
