const { check, validationResult } = require("express-validator");

exports.examResultValidator = [
	check(".*.question")
		.notEmpty()
		.withMessage("Question field should not be empty")
		.isNumeric()
		.withMessage("Question field should be number"),
	check(".*.answer")
		.notEmpty()
		.withMessage("Answer field is required")
		.isIn([0, 1, 2, 3])
		.withMessage("Answer field should be in range [0,3]")
		.isNumeric(),
];

exports.examValidator = [
	check("candidateName")
		.exists()
		.withMessage("Candidate name is required")
		.notEmpty()
		.withMessage("Candidate should not be empty")
		.isString()
		.withMessage("Name message should be text"),
	check("name")
		.exists()
		.withMessage("Name is required")
		.notEmpty()
		.withMessage("Name should not be empty"),
];

exports.questionValidator = [
	check("text")
		.exists()
		.withMessage("Text field is required")
		.isString()
		.withMessage("Text field should be string")
		.isLength({ min: 10 })
		.withMessage("Question should be at least 10 charecters long"),
	check("duration")
		.exists()
		.withMessage("Duration field is required")
		.isNumeric()
		.withMessage("Duration should be numeric"),
	check("answers")
		.exists()
		.withMessage("Answer field is required  and must be an array"),
	check("answers.*.text")
		.exists()
		.withMessage("Answer text field is required"),
	check("answers.*.isCorrect")
		.exists()
		.withMessage("Answer isCorrect field is required")
		.isIn([true, false])
		.withMessage("Answer isCorrect field should be boolean"),
];
exports.validatorResult = (req, res, next) => {
	const result = validationResult(req);
	const hasError = !result.isEmpty();

	if (hasError) {
		const errorMsg = result.array()[0].msg;
		return res.status(400).json({ success: false, errors: errorMsg });
	}
	next();
};
