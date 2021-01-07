const express = require("express");
const {
	examPostController,
	examStartController,
} = require("../controllers/exam");
const { examValidator, validatorResult } = require("../middlewares/validator");

const router = express.Router();

router.post("/start", examStartController);

/**
 * Randomize array
 * Extract file from array
 */
router.post(
	"/:examId/answer",
	examValidator,
	validatorResult,
	examPostController
);

module.exports = router;

// 1- When client sends a POST(/start) req, we need to generate an exam object
// 2- [{q:0,a:1},{q:1,a:2}]
