import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig";
import UniversityIcon from "../assets/icons/SVG/University.svg";
import ClassIcon from "../assets/icons/SVG/Class.svg";
import SettingsIcon from "../assets/icons/SVG/Settings.svg";
import SupportIcon from "../assets/icons/SVG/Support.svg";

export default function Sidebar({ levelHandling }) {
	const [selectedCursus, setSelectedCursus] = useState("");
	const [selectedLevel, setSelectedLevel] = useState("");
	const [cursusLevelDict, setCursusLevelDict] = useState({});

	const [cursusUnfolded, setCursusUnfolded] = useState(false);
	const [levelUnfolded, setLevelUnfolded] = useState(false);

	const createCursusLevelDict = async () => {
		const cursusLevelDict = {};
		await getDocs(collection(db, "Curriculums")).then((querySnapshot) => {
			querySnapshot.docs.forEach((cursusDoc) => {
				const cursus = cursusDoc.id;
				const levels = [];
				const defaultLevels = ["S1", "S2", "S3", "S4", "S5", "S6"];
				defaultLevels.forEach(async (level) => {
					const levelCollectionRef = collection(db, "Curriculums", cursus, level);
					const querySnapshot = await getDocs(levelCollectionRef);
					if (!querySnapshot.empty) {
						levels.push(level);
					}
				});
				cursusLevelDict[cursus] = levels;
			});
		});
		return cursusLevelDict;
	};

	useEffect(() => {
		// setCursusLevelDict(createCursusLevelDict());
		let tmp = createCursusLevelDict();
		tmp.then((res) => {
			setCursusLevelDict(res);
			console.log(`%cCursusLevelDict :`, "color: MediumPurple", res);
		});
	}, []);

	useEffect(() => {
		if (selectedLevel !== "" && selectedCursus !== "") {
			levelHandling(selectedCursus, selectedLevel);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCursus, selectedLevel]);

	const handleCursusSelect = (cursusID) => {
		setSelectedCursus(cursusID);
		setLevelUnfolded(true);
	};

	const handleLevelSelect = (levelID) => {
		setSelectedLevel(levelID);
	};

	const handleCursusUnfold = () => {
		setCursusUnfolded(!cursusUnfolded);
	};

	const handleLevelUnfold = () => {
		setLevelUnfolded(!levelUnfolded);
	};

	return (
		<div className="sidebar min-h-screen w-64 py-7 px-6 bg-background-50 flex flex-col gap-12 fixed border-r-2">
			<h1 className="text-text-950 font-semibold text-2xl border-b-2 border-b-secondary-200 py-2">
				Grade Calculator
			</h1>
			<div className="content w-full flex flex-col justify-between items-start flex-grow">
				<div className="categories w-full flex flex-col items-start gap-10">
					<div className="cursus w-full flex flex-col gap-3">
						<button
							className="category-title w-full flex flex-row justify-between items-center"
							onClick={handleCursusUnfold}>
							<div className="icon-name flex items-center gap-2">
								<img src={UniversityIcon} alt="University Icon" className="svg" />
								<h2 className="text-2xl text-center font-medium text-text-600">
									Cursus
								</h2>
							</div>
							<p className="text-2xl font-medium">{cursusUnfolded ? "-" : "+"}</p>
						</button>
						<div className="flex flex-col items-start gap-2 pl-10">
							{cursusUnfolded &&
								Object.keys(cursusLevelDict).map((cursus, index) => (
									<button
										key={index}
										onClick={() => handleCursusSelect(cursus)}
										className="text-text-500 hover:text-text-950 transition duration-300 ease-in-out">
										{cursus}
									</button>
								))}
						</div>
					</div>
					<div className="niveau w-full flex flex-col gap-3">
						<button
							className="category-title w-full flex flex-row justify-between items-center"
							onClick={handleLevelUnfold}>
							<div className="icon-name flex items-center gap-2">
								<img src={ClassIcon} alt="University Icon" className="svg" />
								<h2 className="text-2xl text-center font-medium text-text-600">
									Niveau
								</h2>
							</div>
							<p className="text-2xl font-medium">{levelUnfolded ? "-" : "+"}</p>
						</button>
						<div className="flex flex-col items-start gap-2 pl-10">
							{levelUnfolded &&
								(selectedCursus !== "" ? (
									cursusLevelDict[selectedCursus].map((level, index) => (
										<button
											key={index}
											onClick={() => handleLevelSelect(level)}
											className="text-text-500 hover:text-text-950 transition duration-300 ease-in-out">
											{`Semestre ${level[1]}`}
										</button>
									))
								) : (
									<p className="text-text-500 text-sm w-full -ml-6 border-2 border-secondary-500 p-2 rounded-md">
										Veuillez sélectionner un cursus
									</p>
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
