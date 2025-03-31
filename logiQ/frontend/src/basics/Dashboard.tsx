import { useState, useEffect } from "react";
import QuizCard from "./QuizCard";
import { toast } from "sonner";
 
interface Quiz {
  id: string;
  image_url: string;
  title: string;
  description: string;
  total_marks: number;
}

function Dashboard() {
  const [userMarks, setUserMarks] = useState<number>(0);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const fetchUserMarks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("User not authenticated!");
          return;
        }

        const res = await fetch("http://localhost:3000/api/user/marks", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setUserMarks(data.marks);
        } else {
          toast.error(data.message || "Failed to fetch marks");
        }
      } catch (error) {
        toast.error("Error fetching marks!");
        console.error(error);
      }
    };

    const fetchQuizzes = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/quizzes");
        const data: Quiz[] = await res.json();

        if (res.ok) {
          setQuizzes(data);
        } else {
          toast.error("Failed to load quizzes");
        }
      } catch (error) {
        toast.error("Error fetching quizzes!");
        console.error(error);
      }
    };

    fetchUserMarks();
    fetchQuizzes();
  }, []);

  return (
    <div className="min-h-screen p-6 select-none bg-[#eee5da]">
      <h1 className="text-3xl font-quicksand font-bold text-[#262424] mb-6 text-start">
        Your current marks are: <span className="text-[#000000]">{userMarks}</span>
      </h1>

      <div className="flex flex-wrap gap-6 px-6 "> 
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} {...quiz} /> 
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
