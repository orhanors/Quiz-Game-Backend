const { check, validationResult } = require("express-validator");

exports.examValidator = [
	check("question")
		.notEmpty()
		.isNumeric()
		.withMessage("Question field is required and should be number"),
	check("answer")
		.notEmpty()
		.withMessage("Answer field is required and should be number")
		.isNumeric(),
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
