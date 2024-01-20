import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { ClassModel } from "../models/ClassModel";
import { ExamModel } from "../models/ExamModel";

export const createOriginalClasslist = async (cursus, level) => {
	console.log("%cCreating original classlist...", "color: coral");

	let defaultList = {};
    let finalList = {};
	const getOriginalClasslist = async () => {
		const collectionRef = collection(db, "Curriculums", cursus, level);
		const collectionSnapshot = await getDocs(collectionRef);
		collectionSnapshot.forEach((doc) => {
			defaultList[doc.id] = doc.data();
		});
		// console.log("Found classlist :", defaultList);

		for (const [className, value] of Object.entries(defaultList)) {
			const examList = [];
			for (const [examName, examCoef] of Object.entries(value.exams)) {
				const examObject = new ExamModel(examName, -1, examCoef);
				examList.push(examObject);
			}
			//Sort examList by exam Name
			examList.sort((a, b) => (a.name > b.name ? 1 : -1));
			const classObject = new ClassModel(level, className, examList, value.coef, -1);
			// console.log(`%c${classObject.name} :`, "color: coral", classObject);
            finalList[className] = classObject;
		}
        // console.log('%cOriginal classlist created !', 'color: coral');
        // console.log(finalList);
        return finalList;
	};
	let list = await getOriginalClasslist();
    return list;
};
