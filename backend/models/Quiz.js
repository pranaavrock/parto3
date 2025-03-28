import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Ensure this references the correct model
      required: true,
    },
    questions: [
      {
        question: {
          type: String,
          required: true,
          trim: true,
        },
        options: {
          type: [String],
          validate: {
            validator: function (v) {
              return v.length === 4; // Ensures exactly 4 options
            },
            message: "Each question must have exactly 4 options.",
          },
          required: true,
        },
        correctAnswerIndex: {
          type: Number,
          required: true,
          min: 0,
          max: 3, // Ensures the correct answer is within the options
        },
      },
    ],
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
