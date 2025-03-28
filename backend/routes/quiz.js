import express from "express";
import Quiz from "../models/Quiz.js";
import { Courses } from "../models/Courses.js";
const router = express.Router();


router.post("/quiz/:id", async (req, res) => {
  
  try {
    const { questions } = req.body;
    const courseId = req.params.id;

    // Check if the course exists
    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Create a new quiz
    const quiz = new Quiz({
      courseId,
      questions,
    });

    await quiz.save();
    res.status(201).json({ message: "Quiz added successfully", quiz });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/quiz-details/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    const quizzes = await Quiz.find({ courseId }); // Get all quizzes for the course

    if (!quizzes || quizzes.length === 0) {
      return res.status(404).json({ message: "No quizzes found for this course" });
    }

    // Extract required fields from each question in every quiz
    const allQuestions = quizzes.flatMap(quiz =>
      quiz.questions.map(q => ({
        question: q.question,
        options: q.options,
        correctAnswerIndex: q.correctAnswerIndex
      }))
    );

    res.status(200).json({ questions: allQuestions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get quiz for a course
router.get("/quiz/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    const quizzes = await Quiz.find({ courseId }); // ✅ Get all quizzes for the course

    if (!quizzes || quizzes.length === 0) {
      return res.status(404).json({ message: "No quizzes found for this course" });
    }

    // ✅ Extract only the necessary fields
    const allQuestions = quizzes.flatMap(quiz =>
      quiz.questions.map(q => ({
        question: q.question,
        options: q.options
      }))
    );

    res.status(200).json({ questions: allQuestions }); // ✅ Send formatted response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Submit quiz answers
router.post("/quiz/submit/:id", async (req, res) => {
  try {
    const { answers } = req.body;
    const courseId = req.params.id;
    const quiz = await Quiz.findOne({ courseId });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found for this course" });
    }

    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (question.options[question.correctAnswerIndex] === answers[index]) {
          score++;
      }
  });

    res.status(200).json({ score, total: quiz.questions.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
