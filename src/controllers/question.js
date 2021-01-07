const {
	writeQuestion,
	readQuestion,
	findByIdQuestion,
	writeAllQuestions,
} = require("../helpers/questions");
const uniqid = require("uniqid");
const { writeDB } = require("../helpers/fileOperations");

exports.questionCreateController = async (req, res, next) => {
	try {
		const newQuestion = { ...req.body, _id: uniqid() };
		await writeQuestion(newQuestion);
		res.status(201).json({ success: true, data: newQuestion });
	} catch (error) {
		console.log("Create question controller error! ", error);
		res.status(500).send({
			success: false,
			errors: "Internal Server Error",
		});
	}
};

exports.questionGetController = async (req, res, next) => {
	try {
		const allQuestions = await readQuestion();
		res.status(200).json({ status: true, data: allQuestions });
	} catch (error) {
		console.log("Question get controlller error", error);
		res.status(500).send({
			success: false,
			errors: "Internal Server Error",
		});
	}
};

// exports.questionGetByIdController = async (req, res, next) => {
// 	try {
//         const { questionId } = req.params;

// 	} catch (error) {
// 		console.log("Question get by id controlller error", error);
// 		res.send({ success: false, errors: "Internal Server Error" });
// 	}
// };

exports.questionEditController = async (req, res, next) => {
	const { questionId } = req.params;
	try {
		const foundQuestion = await findByIdQuestion(questionId);
		if (!foundQuestion) {
			res.status(404).json({ success: false, errors: "NOT FOUND!" });
		} else {
			const editedQuestion = { ...foundQuestion, ...req.body };
			const allQuestions = await readQuestion();
			const newQuestions = allQuestions.filter(
				(q) => q?._id !== questionId
			);

			newQuestions.push(editedQuestion);
			await writeAllQuestions(newQuestions);

			res.status(201).json({ success: true, data: editedQuestion });
		}
	} catch (error) {
		console.log("Question get controlller error", error);
		res.status(500).send({
			success: false,
			errors: "Internal Server Error",
		});
	}
};
