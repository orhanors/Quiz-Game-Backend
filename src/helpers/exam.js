const { readDB, writeDB } = require("./fileOperations");
const { join } = require("path");
const { examGetController } = require("../controllers/exam");

const questionPath = join(__dirname, "../models/question.json");

const examFilePath = join(__dirname, "../models/exam.json");

function shuffle(array) {
	let newArray = [...array];
	let currentIndex = newArray.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = newArray[currentIndex];
		newArray[currentIndex] = newArray[randomIndex];
		newArray[randomIndex] = temporaryValue;
	}

	return newArray;
}

exports.randomQuestions = async () => {
	const allQuestions = await readDB(questionPath);
	const shuffledQuestions = shuffle(allQuestions);

	const questions = shuffledQuestions.slice(0, 5);

	return questions;
};

exports.calcTotalDuration = (questions) => {
	let totalDuration = 0;
	for (let question of questions) {
		totalDuration += question.duration;
	}
	return totalDuration;
};

exports.readExam = () => {
	return readDB(examFilePath);
};

exports.writeExam = async (exam) => {
	const allExams = await readDB(examFilePath);
	allExams.push(exam);
	await writeDB(examFilePath, allExams);
};

exports.findById = async (id) => {
	const allExams = await readDB(examFilePath);
	const foundExam = allExams.find((exam) => exam._id === id);
	if (foundExam) {
		return foundExam;
	} else {
		return false;
	}
};

exports.writeEditedExam = async (exam) => {
	const { _id } = exam;

	let allExams = await readDB(examFilePath);
	let foundExam = allExams.find((exam) => exam._id === _id);
	allExams = allExams.filter((exam) => exam._id !== _id);
	foundExam.questions = exam.questions;

	allExams.push(foundExam);
	await writeDB(examFilePath, allExams);
};

exports.calcTotalScore = (exam) => {
	//for every question find the true answer index
	//compare true answer index with providedAnwer index
	// change the total score

	let totalScore = 0;

	for (let question of exam.questions) {
		const trueIndex = question.answers.findIndex(
			(answer) => answer.isCorrect === true
		);

		if (trueIndex === question?.providedAnswer) {
			totalScore += 1;
		}
	}

	return totalScore;
};
