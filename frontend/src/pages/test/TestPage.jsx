import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import AddQuizForm from "../../components/addquiz/Addquiz";
import { server } from "../../main";
import "./TestPage.css"; // Import the CSS file

const TestPage = () => {
  const { id } = useParams(); // Course ID from URL
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddQuiz, setShowAddQuiz] = useState(false);

  const fetchQuiz = async () => {
    try {
      const { data } = await axios.get(`${server}/api/quiz/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setQuiz(data); // Store quiz data in state
    } catch (error) {
      console.log(error);
      toast.error("No quiz available for this subject.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  return (
    <div className={`test-page-container ${showAddQuiz ? "split-view" : ""}`}>
      {/* Left Side - Quiz List */}
      <div className="quiz-section">
        <h1>Course Quiz</h1>
        <button className="add-quiz-btn" onClick={() => setShowAddQuiz(!showAddQuiz)}>
          {showAddQuiz ? "Close Form" : "Add Quiz"}
        </button>
        {loading ? (
          <p>Loading quiz...</p>
        ) : !quiz || !quiz.questions || quiz.questions.length === 0 ? (
          <p className="no-quiz">No quiz available for this subject.</p>
        ) : (
          <div className="quiz-container">
            {quiz.questions.map((question, index) => (
              <div key={question._id} className="quiz-card">
                <h3>Question {index + 1}: {question.question}</h3>
                <ul>
                  {question.options.map((option, oIndex) => (
                    <li key={oIndex}>{option}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Side - Add Quiz Form (Shown when button clicked) */}
      {showAddQuiz && (
        <div className="add-quiz-section">
         <AddQuizForm server={server} courseId={id} fetchQuiz={fetchQuiz} />
        </div>
      )}
    </div>
  );
};

export default TestPage;
