import React, { useEffect, useState } from "react";
import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";
import AddQuizForm from "../../components/addquiz/Addquiz";

const Lecture = ({ user }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quiz, setQuiz] = useState(null);
const [userAnswers, setUserAnswers] = useState([]);
const [quizResult, setQuizResult] = useState(null);
const [showQuizForm, setShowQuizForm] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setvideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    setSelectedQuiz(null); // Reset quiz when a lecture is selected
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  }
  

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setvideo(file);
    };
  };

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setvideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };
  const fetchQuiz = async (lectureId) => {
    try {
      const { data } = await axios.get(`${server}/api/quiz/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setQuiz(data);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };
  
  
  
  // Call fetchQuiz when a lecture is selected
  useEffect(() => {
    if (lecture?._id) {
      fetchQuiz(lecture._id);
    }
  }, [lecture]);

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const [completed, setCompleted] = useState("");
  const [completedLec, setCompletedLec] = useState("");
  const [lectLength, setLectLength] = useState("");
  const [progress, setProgress] = useState([]);

  async function fetchProgress() {
    try {
      const { data } = await axios.get(
        `${server}/api/user/progress?course=${params.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setCompleted(data.courseProgressPercentage);
      setCompletedLec(data.completedLectures);
      setLectLength(data.allLectures);
      setProgress(data.progress);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAnswerChange = (questionIndex, answerIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answerIndex; 
    setUserAnswers(newAnswers);
};
  
  const submitQuiz = async () => {
    try {
      const { data } = await axios.post(
        `${server}/api/quiz/submit/${params.id}`,
        { answers: userAnswers },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setQuizResult(data);
      toast.success("Quiz submitted successfully!");
      if (data.score < data.total) {
        toast.error("Review your answers. The correct answers will be shown below.");
    }
    
    } catch (error) {
      toast.error("Failed to submit quiz.");
      console.log(error);
    }
  };
  
  const addQuiz = async (quizData) => {
    console.log("Fetching data from:", `http://localhost:5000/api/quiz/${params.id}`);
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/quiz/${params.id}`,
        quizData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success("Quiz added successfully!");
      setShowQuizForm(false);
      fetchQuiz(lecture._id); // Refresh the quiz
    } catch (error) {
      toast.error("Failed to add quiz.");
      console.log(error);
    }
  };

  const addProgress = async (id) => {
    try {
      const { data } = await axios.post(
        `${server}/api/user/progress?course=${params.id}&lectureId=${id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data.message);
      await fetchProgress();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(progress);

  useEffect(() => {
    fetchLectures();
    fetchProgress();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="progress">
            Lecture completed - {completedLec} out of {lectLength} <br />
            <progress value={completed || 0} max={100}></progress>{" "}
            {completed ? completed.toFixed(2) : 0} %
          </div>
  
          <div className="lecture-page">
            {/* Left Section - Video or Quiz */}
            <div className="left">
              {lecLoading ? (
                <Loading />
              ) : selectedQuiz ? (
                <div className="quiz-section">
                  <h2>Quiz</h2>
                  {selectedQuiz.questions.map((question, index) => (
                    <div key={index} className="quiz-question">
                      <h3>{question.question}</h3>
                      {question.options.map((option, optIndex) => (
                        <label key={optIndex}>
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={optIndex}
                            onChange={() => handleAnswerChange(index, optIndex)}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  ))}
                  <button onClick={submitQuiz}>Submit Quiz</button>
                </div>
              ) : lecture.video ? (
                <>
                  <video
                    src={`${server}/${lecture.video}`}
                    width={"100%"}
                    controls
                    autoPlay
                    onEnded={() => addProgress(lecture._id)}
                  ></video>
                  <h1>{lecture.title}</h1>
                  <h3>{lecture.description}</h3>
                </>
              ) : (
                <h1>Please Select a Lecture or Quiz</h1>
              )}
            </div>
  
            {/* Right Section - Lecture List & Admin Controls */}
            <div className="right">
              {user?.role === "admin" && (
                <button className="common-btn" onClick={() => setShow(!show)}>
                  {show ? "Close" : "Add Lecture +"}
                </button>
              )}
  
              {show && (
                <div className="lecture-form">
                  <h2>Add Lecture</h2>
                  <form onSubmit={submitHandler}>
                    <label htmlFor="text">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
  
                    <label htmlFor="text">Description</label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
  
                    <input
                      type="file"
                      placeholder="Choose Video"
                      onChange={changeVideoHandler}
                      required
                    />
  
                    {videoPrev && (
                      <video src={videoPrev} width={300} controls></video>
                    )}
  
                    <button
                      disabled={btnLoading}
                      type="submit"
                      className="common-btn"
                    >
                      {btnLoading ? "Please Wait..." : "Add"}
                    </button>
                  </form>
                </div>
              )}
  
              {lectures?.length > 0 ? (
                lectures.map((e, i) => (
                  <div key={e._id}>
                    <div
                      onClick={() => fetchLecture(e._id)}
                      className={`lecture-number ${
                        lecture._id === e._id ? "active" : ""
                      }`}
                    >
                      {i + 1}. {e.title}{" "}
                      {progress[0]?.completedLectures.includes(e._id) && (
                        <span
                          style={{
                            background: "red",
                            padding: "2px",
                            borderRadius: "6px",
                            color: "greenyellow",
                          }}
                        >
                          <TiTick />
                        </span>
                      )}
                    </div>
                    {user?.role === "admin" && (
                      <button
                        className="common-btn"
                        style={{ background: "red" }}
                        onClick={() => deleteHandler(e._id)}
                      >
                        Delete {e.title}
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p>No Lectures Yet!</p>
              )}
            </div>
          </div>
          <button 
  className="test-btn" 
  onClick={() => {
    if (user?.role === "admin") {
      navigate(`/testpage/${params.id}`);
    } else {
      navigate(`/test/${params.id}`);
    }
  }}
>
  Test
</button>



        </>
      )}
    </>
  );
  
};
export default Lecture;
