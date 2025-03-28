// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const server = "http://localhost:5000"; // Updated server URL

// const Test = () => {
//   const { id } = useParams();
//   const [questions, setQuestions] = useState([]); // Array of question objects
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // Fetch quiz data from the new endpoint
//   const fetchQuiz = async () => {
//     try {
//       const { data } = await axios.get(`${server}/api/quiz-details/${id}`, {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       });
//       // Expect data.questions to be an array; limit to maximum 10 questions
//       if (data && data.questions) {
//         setQuestions(data.questions.slice(0, 10));
//       } else {
//         setQuestions([]);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("No quiz available for this subject.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchQuiz();
//   }, [id]);

//   useEffect(() => {
//     if (questions.length === 0) return;
//     // Move to next question every 10 seconds
//     const timer = setTimeout(() => {
//       if (currentIndex < questions.length - 1) {
//         setCurrentIndex((prevIndex) => prevIndex + 1);
//       }
//     }, 10000);
//     return () => clearTimeout(timer);
//   }, [currentIndex, questions]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>Test Page</h1>
//       <p>Course ID: {id}</p>
//       {questions.length > 0 ? (
//         <div>
//           <h2>Question {currentIndex + 1}:</h2>
//           <p>{questions[currentIndex]?.question}</p>
//           <ul>
//             {questions[currentIndex]?.options.map((option, index) => (
//               <li key={index}>{option}</li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p>No quiz available.</p>
//       )}
//     </div>
//   );
// };

// export default Test;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaCheck,
  FaTimes,
  FaArrowRight,
  FaArrowLeft,
  FaListUl,
  FaClock,
  FaTrophy,
  FaRedo,
  FaHome
} from "react-icons/fa";
import Confetti from "react-confetti";

const server = "http://localhost:5000";

const QuizTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [showAnswers, setShowAnswers] = useState(false);
  const [timerActive, setTimerActive] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Fetch quiz data
  const fetchQuiz = async () => {
    try {
      const { data } = await axios.get(`${server}/api/quiz-details/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (data && data.questions) {
        setQuiz(data);
        setQuestions(data.questions.slice(0, 10));
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load quiz. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle window resize for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!timerActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleQuizCompletion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;
    
    setUserAnswers([
      ...userAnswers,
      {
        questionId: currentQuestion._id,
        selectedOption,
        isCorrect,
      },
    ]);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else {
      handleQuizCompletion();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      const prevAnswer = userAnswers.find(
        (a) => a.questionId === questions[currentIndex - 1]._id
      );
      setSelectedOption(prevAnswer ? prevAnswer.selectedOption : null);
    }
  };

  const handleQuizCompletion = () => {
    setTimerActive(false);
    let finalAnswers = [...userAnswers];
    const currentQuestion = questions[currentIndex];
    
    // Include current question if answered
    if (selectedOption !== null && !finalAnswers.some(a => a.questionId === currentQuestion._id)) {
      const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;
      finalAnswers = [
        ...finalAnswers,
        {
          questionId: currentQuestion._id,
          selectedOption,
          isCorrect,
        },
      ];
      setUserAnswers(finalAnswers);
    }
    
    const correctCount = finalAnswers.filter((answer) => answer.isCorrect).length;
    setScore((correctCount / questions.length) * 100);
    setQuizCompleted(true);
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setUserAnswers([]);
    setQuizCompleted(false);
    setScore(0);
    setTimeLeft(600);
    setTimerActive(true);
    setShowAnswers(false);
  };

  const handleExitQuiz = () => {
    navigate(`/course/${id}`);
  };

  if (loading) {
    return (
      <div className="quiz-container loading">
        <div className="loader"></div>
        <p>Loading quiz questions...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="quiz-container">
        <div className="no-quiz">
          <h2>No Quiz Available</h2>
          <p>There are no questions available for this quiz.</p>
          <button onClick={() => navigate(-1)} className="btn-primary">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const correctCount = userAnswers.filter((a) => a.isCorrect).length;

  return (
    <div className="quiz-container">
      {quizCompleted && score >= 80 && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      {!quizCompleted ? (
        <div className="quiz-in-progress">
          <div className="quiz-header">
            <h2>{quiz.title || "Quiz Test"}</h2>
            <div className="quiz-meta">
              <div className="timer">
                <FaClock /> {formatTime(timeLeft)}
              </div>
              <div className="progress">
                Question {currentIndex + 1} of {questions.length}
              </div>
            </div>
          </div>

          <div className="question-card">
            <div className="question-text">
              <h3>{currentQuestion.question}</h3>
            </div>

            <div className="options-container">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`option ${selectedOption === index ? "selected" : ""}`}
                  onClick={() => handleOptionSelect(index)}
                >
                  <div className="option-letter">{String.fromCharCode(65 + index)}</div>
                  <div className="option-text">{option}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="navigation-buttons">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentIndex === 0}
              className="btn-secondary"
            >
              <FaArrowLeft /> Previous
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
              className="btn-primary"
            >
              {currentIndex === questions.length - 1 ? "Submit Quiz" : "Next"}{" "}
              <FaArrowRight />
            </button>
          </div>
        </div>
      ) : (
        <div className="quiz-results">
          <div className="result-header">
            <h2>
              <FaTrophy /> Quiz Results
            </h2>
            <div className="score-display">
              <div 
                className="score-circle"
                style={{
                  background: `conic-gradient(#4CAF50 ${score}%, #f0f0f0 ${score}% 100%)`
                }}
              >
                <span>{Math.round(score)}%</span>
              </div>
              <p className="score-message">
                {score >= 80
                  ? "Excellent work! You've mastered this material."
                  : score >= 60
                  ? "Good job! You're on the right track."
                  : "Keep practicing! Review the material and try again."}
              </p>
              <p className="score-detail">
                You answered {correctCount} out of {questions.length} questions correctly.
              </p>
            </div>
          </div>

          <div className="result-actions">
            <button onClick={handleRestartQuiz} className="btn-secondary">
              <FaRedo /> Retake Quiz
            </button>
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="btn-primary"
            >
              {showAnswers ? "Hide Answers" : "View Answers"}
            </button>
            <button onClick={handleExitQuiz} className="btn-exit">
              <FaHome /> Exit to Course
            </button>
          </div>

          {showAnswers && (
            <div className="answers-review">
              <h3>
                <FaListUl /> Question Review
              </h3>
              {questions.map((question, index) => {
                const userAnswer = userAnswers.find(
                  (a) => a.questionId === question._id
                );
                return (
                  <div key={index} className="answer-item">
                    <div className="question-review">
                      <p className="question-text">
                        <strong>Q{index + 1}:</strong> {question.question}
                      </p>
                      <div
                        className={`answer-status ${
                          userAnswer?.isCorrect ? "correct" : "incorrect"
                        }`}
                      >
                        {userAnswer?.isCorrect ? <FaCheck /> : <FaTimes />}
                        {userAnswer?.isCorrect ? "Correct" : "Incorrect"}
                      </div>
                    </div>
                    <div className="options-review">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`option-review
                            ${optIndex === question.correctAnswerIndex ? "correct-option" : ""}
                            ${
                              optIndex === userAnswer?.selectedOption &&
                              !userAnswer?.isCorrect
                                ? "wrong-selection"
                                : ""
                            }
                          `}
                        >
                          <span className="option-letter">
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                          {option}
                          {optIndex === question.correctAnswerIndex && (
                            <span className="correct-tag">Correct Answer</span>
                          )}
                          {optIndex === userAnswer?.selectedOption &&
                            !userAnswer?.isCorrect && (
                              <span className="your-answer-tag">Your Answer</span>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizTest;
