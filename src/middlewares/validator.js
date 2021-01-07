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

/***
 * check('items').exists(),
  check('items.*._id').exists()
  check('items.*.item_type').isIn([1,2,3])
 */
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
