export class ExamModel {
    constructor(name, grade = -1, coef, isEdited = false, isCalculated = false) {
        this.name = name;
        this.grade = grade;
        this.coef = coef;
        this.isEdited = isEdited;
        this.isCalculated = isCalculated;
    }
}