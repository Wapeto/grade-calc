import React, { createContext, useState } from "react";
export const ClassListContext = createContext();

export const ClassListProvider = ({ children }) => {
	const [classList, setClassList] = useState({});

	const setOriginalClassList = (classList) => {
		setClassList(classList);
		console.log('%cOriginal classlist saved !', 'color: MediumPurple');
		console.log('%cClasslist :', 'color: MediumPurple', classList);
	};

	const updateClassList = (className, updatedClass) => {
		setClassList((prevState) => ({
			...prevState,
			[className]: updatedClass,
		}));
	};

	return (
		<ClassListContext.Provider value={{ classList, updateClassList, setOriginalClassList}}>
			{children}
		</ClassListContext.Provider>
	);
};
