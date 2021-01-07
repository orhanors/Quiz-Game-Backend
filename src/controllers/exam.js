const uniqid = require("uniqid");
const { randomQuestions, calcTotalDuration } = require("../helpers/exam");

exports.examStartController = async (req, res, next) => {
	try {
		const newExam = {
			...req.body,
			_id: uniqid(),
			examDate: new Date(),
			isCompleted: false,
		};

		/* we give the reduce method our reducer function
            and our initial value */

		const questions = await randomQuestions();
		newExam.questions = questions;

		newExam.totalDuration = calcTotalDuration(newExam.questions);
	} catch (error) {
		console.log("Exam start error", error);
		res.status(500).json({
			success: false,
			errors: "Internal Server Error",
		});
	}
};

exports.examPostController = async (req, res, next) => {};
