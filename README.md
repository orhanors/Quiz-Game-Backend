# Quiz Game Backend
Backend operations for quiz game using express and local filesytem as database. Frontend implemantation can be found <a href="https://github.com/orhanors/Quiz-Game-Frontend">here</a>

### Features

<details>
<summary><b> Crete an exam for a spesific user </b></summary>
  </br>
    <p> Each user has 5 randomly generated questions to answer </p>

```javascript
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
```

</details>


<details>
<summary><b> Calculate score </b></summary>
  </br>
    <p> After exam finished user will be able to see the score </p>

```javascript
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
```

</details>


<details>
<summary><b> Process json file </b></summary>
  </br>
    <p> You can check the code out to see how question-exam logic implemented to create an exam using fs module </p>

</details>

