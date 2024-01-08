export class ExamModel {
    constructor(name, grade = -1, coef) {
        this.name = name;
        this.grade = grade;
        this.coef = coef;
    }
}