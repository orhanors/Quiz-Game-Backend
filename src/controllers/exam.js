const uniqid = require("uniqid");
const {
	randomQuestions,
	calcTotalDuration,
	writeExam,
	findById,
	writeEditedExam,
	readExam,
	calcTotalScore,
} = require("../helpers/exam");

exports.examStartController = async (req, res, next) => {
	try {
		const newExam = {
			...req.body,
			_id: uniqid(),
			examDate: new Date(),
			isCompleted: false,
		};

		//Returns 5 random question from questionslist
		const questions = await randomQuestions();
		newExam.questions = questions;

		//Calculates total duration of selected questions
		newExam.totalDuration = calcTotalDuration(newExam.questions);

		await writeExam(newExam);

		res.status(201).json({ success: true, data: newExam });
	} catch (error) {
		console.log("Exam start error", error);
		res.status(500).json({
			success: false,
			errors: "Internal Server Error",
		});
	}
};

exports.examPostController = async (req, res, next) => {
	try {
		const { examId } = req.params;
		console.log("examid", examId);
		const foundExam = await findById(examId);
		if (!foundExam) {
			res.status(404).json({
				success: false,
				errors: "NOT FOUND! Invalid exam id",
			});
		} else {
			const requestArray = req.body;
			foundExam.questions.map(
				(question, index) =>
					(question.providedAnswer = requestArray[index].answer)
			);

			await writeEditedExam(foundExam);
			res.status(201).json({ success: true, data: foundExam });
		}
	} catch (error) {
		console.log("exam post controller error", error);
		res.status(500).json({
			success: false,
			errors: "Internal Server Error",
		});
	}
};

exports.examGetController = async (req, res, next) => {
	try {
		const { examId } = req.params;

		const foundExam = await findById(examId);
		if (!foundExam) {
			res.status(404).json({
				success: false,
				errors: "NOT FOUND! Invalid exam id",
			});
		} else {
			const totalScore = calcTotalScore(foundExam);

			const examDetails = { score: totalScore };
			res.status(200).json({ success: true, data: examDetails });
		}
	} catch (error) {
		console.log("Exam get controller error", error);
		res.status(500).json({
			success: false,
			errors: "Internal Server Error",
		});
	}
};
