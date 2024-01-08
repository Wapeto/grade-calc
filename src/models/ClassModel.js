export class ClassModel {
    constructor(level, name, exams, coef, average, isEdited = false) {
        this.level = level;
        this.name = name;
        this.exams = exams;
        this.coef = coef;
        this.average = average;
        this.isEdited = isEdited;
    }
}