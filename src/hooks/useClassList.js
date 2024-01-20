import { useContext } from 'react';
import { ClassListContext } from '../ClassListContext';

export const useClassList = () => {
  const { classList, updateClassList } = useContext(ClassListContext);

  const editExamGrade = (className, examName, examValue) => {
    const updatedClass = { ...classList[className] };
    const examIndex = updatedClass.exams.findIndex(exam => exam.name === examName);
    if (examIndex !== -1) {
      updatedClass.exams[examIndex].grade = examValue;
      updateClassList(className, updatedClass);
    }
  };

  const editClassAverage = (className, averageValue) => {
    // console.log(`%c${className}'s new average is ${averageValue}`, `color: DarkTurquoise`);
    const updatedClass = { ...classList[className] };
    updatedClass.average = averageValue;
    updateClassList(className, updatedClass);
  };

  const editClassEdited = (className, isEdited) => {
    const updatedClass = { ...classList[className] };
    updatedClass.isEdited = isEdited;
    updateClassList(className, updatedClass);
  };

  const editExamEdited = (className, examName, isEdited) => {
    const updatedClass = { ...classList[className] };
    const examIndex = updatedClass.exams.findIndex(exam => exam.name === examName);
    if (examIndex !== -1) {
      updatedClass.exams[examIndex].isEdited = isEdited;
      updateClassList(className, updatedClass);
    }
  };

  // Add more functions here if needed

  return { classList, editExamGrade, editClassAverage, editClassEdited, editExamEdited};
};
