import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddQuizForm = ({ server, courseId, fetchQuiz }) => {
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctAnswer: '' },
  ]);

  const handleInputChange = (index, event) => {
    const values = [...questions];
    if (event.target.name === 'question') {
      values[index].question = event.target.value;
    } else if (event.target.name.startsWith('option')) {
      const optionIndex = parseInt(event.target.name.split('-')[1], 10);
      values[index].options[optionIndex] = event.target.value;
    } else if (event.target.name === 'correctAnswer') {
      values[index].correctAnswer = event.target.value;
    }
    setQuestions(values);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], correctAnswer: '' },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    for (const question of questions) {
      if (!question.options || question.options.length !== 4) {
        toast.error('Each question must have exactly 4 options.');
        return;
      }
    }
  
    const formattedQuestions = questions.map((q) => ({
      question: q.question,
      options: q.options,
      correctAnswerIndex: q.options.indexOf(q.correctAnswer),
    }));

    try {
      const { data } = await axios.post(
        `${server}/api/quiz/${courseId}`, // ✅ Use courseId instead of params.id
        { questions: formattedQuestions },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
      toast.success('Quiz added successfully!');
      fetchQuiz(); // ✅ Call fetchQuiz() without parameters
    } catch (error) {
      toast.error('Failed to add quiz.');
      console.error(error);
    }
  };

  return (
    <div className="quiz-form">
      <h2>Add Quiz</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={index}>
            <label>Question {index + 1}</label>
            <input
              type="text"
              name="question"
              value={q.question}
              onChange={(e) => handleInputChange(index, e)}
              required
            />
            <label>Options</label>
            {q.options.map((option, optIndex) => (
              <input
                key={optIndex}
                type="text"
                name={`option-${optIndex}`}
                value={option}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            ))}
            <label>Correct Answer</label>
            <select
              name="correctAnswer"
              value={q.correctAnswer}
              onChange={(e) => handleInputChange(index, e)}
              required
            >
              <option value="" disabled>Select correct answer</option>
              {q.options.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion}>
          Add Another Question
        </button>
        <button type="submit">Add Quiz</button>
      </form>
    </div>
  );
};

export default AddQuizForm;
