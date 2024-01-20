import React, { useEffect, useState } from "react";
import { collection, getDocs} from "firebase/firestore";
import { db } from "../firebaseconfig";
import UniversityIcon from "../assets/icons/SVG/University.svg";
import ClassIcon from "../assets/icons/SVG/Class.svg";
import SettingsIcon from "../assets/icons/SVG/Settings.svg";
import SupportIcon from "../assets/icons/SVG/Support.svg";

export default function Sidebar({levelHandling}) {
	const [cursusList, setCursusList] = useState<{ id: string }[]>([]);
	const [selectedCursus, setSelectedCursus] = useState<string>("");
	const [levelsList, setLevelsList] = useState<string[]>([]);
	const [selectedLevel, setSelectedLevel] = useState<string>("");

	const getCursus = async () => {
		await getDocs(collection(db, "Curriculums")).then((querySnapshot) => {
			const cursus = querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data()}));
			setCursusList(cursus);
		});
	};

	const getLevels = async (cursusID: string) => {
		const defaultLevels = ["S1", "S2", "S3", "S4", "S5", "S6"];
		const foundLevels: string[] = [];
		for (const level of defaultLevels) {
			const levelCollectionRef = collection(db, "Curriculums", cursusID, level);
			const querySnapshot = await getDocs(levelCollectionRef);

			if (!querySnapshot.empty) {
				foundLevels.push(`Semestre ${level[1]}`);
			}
		}
		if (foundLevels.length > 0) {
			setLevelsList(foundLevels);
		} else {
			setLevelsList(["No level found" ]);
		}
	};

	useEffect(() => {
		getCursus();
	}, []);

	useEffect(() => {
		if (selectedCursus !== "") {
			getLevels(selectedCursus);
		}
	}, [selectedCursus]);

	useEffect(() => {
		if (selectedLevel !== "" && selectedCursus !== "") {
			levelHandling(selectedCursus, selectedLevel);
		}
	}, [levelHandling, selectedCursus, selectedLevel]);

	const handleCursusSelect = (cursusID: string) => {
		setSelectedCursus(cursusID);
	};

	const handleLevelSelect = (levelID: string) => {
		setSelectedLevel(levelID);
	};

	return (
		<div className="sidebar min-h-screen w-64 py-7 px-6 bg-background-100 flex flex-col gap-12">
			<h1 className="text-text-950 font-semibold text-2xl border-b-2 border-b-secondary-200 py-2">
				Grade Calculator
			</h1>
			<div className="content w-full flex flex-col justify-between items-start flex-grow">
				<div className="categories w-full flex flex-col items-start gap-10">
					<div className="cursus w-full flex flex-col gap-3">
						<div className="category-title w-full flex flex-row justify-between items-center">
							<div className="icon-name flex items-center gap-2">
								<img src={UniversityIcon} alt="University Icon" className="svg" />
								<h2 className="text-2xl text-center font-medium text-text-600">
									Cursus
								</h2>
							</div>
							<button className="text-2xl font-medium">+</button>
						</div>
						<div className="flex flex-col items-start gap-2 pl-10">
							{cursusList.map((cursus, index) => (
								<button
									key={index}
									onClick={() => handleCursusSelect(cursus.id)}
									className="text-text-500 hover:text-text-950 transition duration-300 ease-in-out">
									{cursus.id}
								</button>
							))}
						</div>
					</div>
					<div className="niveau w-full flex flex-col gap-3">
						<div className="category-title w-full flex flex-row justify-between items-center">
							<div className="icon-name flex items-center gap-2">
								<img src={ClassIcon} alt="University Icon" className="svg" />
								<h2 className="text-2xl text-center font-medium text-text-600">
									Niveau
								</h2>
							</div>
							<button className="text-2xl font-medium">+</button>
						</div>
						<div className="flex flex-col items-start gap-2 pl-10">
							{levelsList.map((level, index) => (
								<button
									key={index}
									onClick={() => handleLevelSelect(level)}
									className="text-text-500 hover:text-text-950 transition duration-300 ease-in-out">
									{level}
								</button>
							))}
						</div>
					</div>
				</div>
				<div className="footer flex flex-col items-start gap-4">
					<a href="/support">
						<div className="icon-name flex items-center gap-2">
							<img src={SupportIcon} alt="University Icon" className="svg" />
							<h2 className="text-xl text-center font-medium text-text-600">
								Support
							</h2>
						</div>
					</a>
					<a href="/parametres">
						<div className="icon-name flex items-center gap-2">
							<img src={SettingsIcon} alt="University Icon" className="svg" />
							<h2 className="text-xl text-center font-medium text-text-600">
								Paramètres
							</h2>
						</div>
					</a>
				</div>
			</div>
		</div>
	);
}
