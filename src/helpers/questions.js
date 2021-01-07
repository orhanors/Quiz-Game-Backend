const { readDB, writeDB } = require("./fileOperations");
const { join } = require("path");

const questionPath = join(__dirname, "../models/question.json");

exports.readQuestion = () => {
	return readDB(questionPath);
};
exports.writeQuestion = async (exam) => {
	const allQuestions = await readDB(questionPath);
	allQuestions.push(exam);
	await writeDB(questionPath, allQuestions);
};

exports.writeAllQuestions = async (questions) => {
	await writeDB(questionPath, questions);
};

exports.findByIdQuestion = async (id) => {
	const allQuestions = await readDB(questionPath);
	const foundQuestion = allQuestions.find((q) => q?._id === id);
	if (foundQuestion) {
		return foundQuestion;
	} else {
		return false;
	}
};
