const express = require("express");
const { validationResult } = require("express-validator");
const {
	questionCreateController,
	questionEditController,
	questionGetController,
} = require("../controllers/question");
const {
	questionValidator,
	validatorResult,
} = require("../middlewares/validator");

const router = express.Router();

router.post("/", questionValidator, validatorResult, questionCreateController);
router.get("/", questionGetController);
router.put(
	"/:questionId",
	questionValidator,
	validationResult,
	questionEditController
);
// router.get("/:questionId", questionGetByIdController);

module.exports = router;
