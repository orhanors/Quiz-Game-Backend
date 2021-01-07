const { readDB } = require("./fileOperations");
const { join } = require("path");
const questionPath = join(__dirname, "../models/question.json");

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
