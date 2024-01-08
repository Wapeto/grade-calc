import { useContext } from 'react';
import { ClassListContext } from '../ClassListContext';

export const useClassList = () => {
  const { classList, updateClassList } = useContext(ClassListContext);

  const editExamGrade = (level, className, examName, examValue) => {
    const updatedClass = { ...classList[level][className] };
    const examIndex = updatedClass.exams.findIndex(exam => exam.name === examName);
    if (examIndex !== -1) {
      updatedClass.exams[examIndex].grade = examValue;
      updateClassList(level, className, updatedClass);
    }
  };

  const editClassAverage = (level, className, averageValue) => {
    // console.log(`%c${className}'s new average is ${averageValue}`, `color: DarkTurquoise`);
    const updatedClass = { ...classList[level][className] };
    updatedClass.average = averageValue;
    updateClassList(level, className, updatedClass);
  };

  const editClassEdited = (level, className, isEdited) => {
    const updatedClass = { ...classList[level][className] };
    updatedClass.isEdited = isEdited;
    updateClassList(level, className, updatedClass);
  };

  // Add more functions here if needed

  return { classList, editExamGrade, editClassAverage, editClassEdited};
};
