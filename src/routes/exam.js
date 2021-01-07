const express = require("express");
const { examValidator, validatorResult } = require("../middlewares/validator");

const router = express.Router();

router.post(
	"exams/:examId/answer",
	examValidator,
	validatorResult,
	examPostController
);
