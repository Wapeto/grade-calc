import React, { createContext, useState } from "react";
import { ExamModel } from "./models/ExamModel";
import { ClassModel } from "./models/ClassModel";
export const ClassListContext = createContext();

export const ClassListProvider = ({ children }) => {
	const [classList, setClassList] = useState({
		S3: {
			Analyse: new ClassModel(
				"S3",
				"Analyse",
				[
					new ExamModel("CC1", -1, 1),
					new ExamModel("CC2", -1, 2),
					new ExamModel("Projet", -1, 1),
				],
				4,
				-1
			),
			LPL: new ClassModel(
				"S3",
				"LPL",
				[
					new ExamModel("CC1", -1, 35),
					new ExamModel("CC2", -1, 50),
					new ExamModel("TP", -1, 15),
				],
				5,
				-1
			),
			Architecture: new ClassModel(
				"S3",
				"Architecture",
				[
					new ExamModel("CC1", -1, 2),
					new ExamModel("CC2", -1, 5),
					new ExamModel("Projet", -1, 3),
				],
				3,
				-1
			),
			SDA: new ClassModel(
				"S3",
				"SDA",
				[
					new ExamModel("CC1", -1, 2),
					new ExamModel("CC2", -1, 4),
					new ExamModel("TP", -1, 4),
				],
				6,
				-1
			),
			POO: new ClassModel(
				"S3",
				"POO",
				[
					new ExamModel("CC1", -1, 2),
					new ExamModel("TP", -1, 2),
					new ExamModel("Presence", -1, 1),
				],
				3,
				-1
			),
			"Tech Dev": new ClassModel(
				"S3",
				"Tech Dev",
				[
					new ExamModel("Rendu 1", -1, 1),
					new ExamModel("Rendu 2", -1, 1),
					new ExamModel("Projet", -1, 1),
				],
				3,
				-1
			),
			Anglais: new ClassModel(
				"S3",
				"Anglais",
				[
					new ExamModel("CC1", -1, 5),
					new ExamModel("POEM 1", -1, 2),
					new ExamModel("POEM 2", -1, 3),
				],
				3,
				-1
			),
			Option: new ClassModel(
				"S3",
				"Option",
				[
					new ExamModel("CC1", -1, 1),
					new ExamModel("CC2", -1, 1),
					new ExamModel("CC3", -1, 1),
				],
				3,
				-1
			),
		},
		S4: {},
		S5: {},
		S6: {},
	});

	const updateClassList = (level, className, updatedClass) => {
		setClassList((prevState) => ({
			...prevState,
			[level]: {
				...prevState[level],
				[className]: updatedClass,
			},
		}));
	};

	return (
		<ClassListContext.Provider value={{ classList, updateClassList }}>
			{children}
		</ClassListContext.Provider>
	);
};
