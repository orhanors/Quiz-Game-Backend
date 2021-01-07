const express = require("express");
const { validationResult } = require("express-validator");
const {
	examPostController,
	examStartController,
	examGetController,
} = require("../controllers/exam");
const {
	examResultValidator,
	validatorResult,
	examValidator,
} = require("../middlewares/validator");

const router = express.Router();

router.get("/:examId", examGetController);

router.post("/start", examValidator, validatorResult, examStartController);

//TODO  It should not be possible to answer the same question twice.
router.post(
	"/:examId/answer",

	examPostController
);

module.exports = router;

// 1- When client sends a POST(/start) req, we need to generate an exam object
// 2- [{q:0,a:1},{q:1,a:2}]
