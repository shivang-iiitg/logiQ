import Header from "@/components/customs/Header";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Option {
  option_id: number;
  option_text: string;
  is_correct: boolean;
}

interface Question {
  question_id: number;
  question_text: string;
  hardness_level: string;
  options: Option[];
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  total_marks: number;
}

function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number | null }>({});
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/quizzes/${id}`);
        const data = await res.json();

        if (res.ok) {
          setQuiz(data.quiz);
          setQuestions(data.questions);
        } else {
          setError(data.message || "Failed to load quiz");
        }
      } catch (error) {
        setError("Error fetching quiz!");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [id]);

  const handleOptionSelect = (questionId: number, optionId: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: prev[questionId] === optionId ? null : optionId, 
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-400";
      case "medium":
        return "text-orange-400";
      case "hard":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const handleSubmit = async () => {
    const studentId = localStorage.getItem("student_id");  
    if (!studentId) {
      setSubmissionStatus("Error: Student ID not found!");
      return;
    }

    const payload = {
      student_id: studentId,
      quiz_id: id,
      answers: selectedOptions,
    };

    try {
      const res = await fetch("http://localhost:3000/api/submit-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) { 
        setScore(data.score);
        setSubmissionStatus("Quiz submitted successfully!");
        setShowModal(true);
      } else {
        setSubmissionStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setSubmissionStatus("Failed to submit quiz.");
    }
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10 text-xl">{error}</div>;

  return (
    <div>
      <Header />
      <div className="min-h-screen p-6 flex flex-col items-center bg-[#eee5da]">
        <h1 className="text-3xl font-bold font-quicksand text-[#262424]">{quiz?.title}</h1>
        <p className="text-lg font-quicksand text-gray-700 mt-2">{quiz?.description}</p>

        <div className="mt-6 w-[80%] space-y-6">
          {questions.map((question, index) => (
            <div key={question.question_id} className="bg-[#f4f1ea] p-6 rounded-lg shadow-md">
              <h2 className="text-4xl font-semibold font-quicksand text-[#262424]">
                {index + 1}. {question.question_text}
              </h2>

              <p className={`text-sm font-semibold mt-1 ${getDifficultyColor(question.hardness_level)}`}>
                Difficulty : {question.hardness_level}
              </p>

              <div className="mt-4 space-y-2">
                {question.options.map((option, optionIndex) => {
                  const isSelected = selectedOptions[question.question_id] === option.option_id;
                  return (
                    <button
                      key={option.option_id}
                      className={`block w-full cursor-pointer font-quicksand text-left p-3 rounded-md transition border-4 ${
                        isSelected ? "bg-[#262424] text-white border-black" : "bg-[#f5f3f0] hover:bg-[#dbd8d2]"
                      }`}
                      onClick={() => handleOptionSelect(question.question_id, option.option_id)}
                    >
                      <span className="font-bold font-quicksand mr-2">
                        {String.fromCharCode(65 + optionIndex)}.
                      </span>
                      {option.option_text}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
 
        <button
          className="mt-6 px-6 py-3 bg-[#262424] text-white text-lg font-semibold rounded-lg hover:bg-black transition"
          onClick={handleSubmit}
        >
          Submit Quiz
        </button>
 
        {submissionStatus && !showModal && (
          <p className="mt-4 text-lg font-semibold text-red-600">{submissionStatus}</p>
        )}
      </div>
 
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#262424] bg-opacity-50">
          <div className="bg-[#eee5da] font-quicksand  rounded-lg shadow-xl p-8 max-w-md w-full text-center">
            <h2 className="text-4xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-xl mb-6">
              You scored: <span className="font-semibold">{score}</span> out of {questions.length}
            </p>
            <button
              className="px-6 py-3 bg-[#262424] text-white text-lg font-semibold rounded-lg hover:bg-black transition"
              onClick={handleGoToDashboard}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
