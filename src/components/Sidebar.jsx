import React from "react";
import UniversityIcon from "../assets/icons/SVG/University.svg";
import ClassIcon from "../assets/icons/SVG/Class.svg";
import SettingsIcon from "../assets/icons/SVG/Settings.svg";
import SupportIcon from "../assets/icons/SVG/Support.svg";

export default function Sidebar() {
	return (
		<div className="sidebar min-h-screen w-64 py-7 px-6 bg-background-100 absolute left-0 top-0 flex flex-col gap-12">
			<h1 className="text-text-950 font-semibold text-2xl border-b-2 border-b-secondary-200">
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
							<p className="text-2xl font-medium">+</p>
						</div>
						<div className="flex flex-col items-start gap-2 pl-10">
							<a
								href="/informatique"
								className="text-text-500 hover:text-text-950 transition duration-300 ease-in-out">
								Informatique
							</a>
							<a
								href="/mathematiques"
								className="text-text-500 hover:text-text-950 transition duration-300 ease-in-out">
								Mathématiques
							</a>
							<a
								href="/psychologie"
								className="text-text-500 hover:text-text-950 transition duration-300 ease-in-out">
								Psychologie
							</a>
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
							<p className="text-2xl font-medium">+</p>
						</div>
						<div className="flex flex-col items-start gap-2 pl-10">
							<a
								href="/informatique/Semestre1"
								className="text-text-500 hover:text-text-950 transition duration-300 ease-in-out">
								Semestre 1
							</a>
							<a
								href="/informatique/Semestre2"
								className="text-text-500 hover:text-text-950 transition duration-300 ease-in-out">
								Semestre 2
							</a>
							<a
								href="/informatique/Semestre3"
								className="text-text-500 hover:text-text-950 transition duration-300 ease-in-out">
								Semestre 3
							</a>
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
