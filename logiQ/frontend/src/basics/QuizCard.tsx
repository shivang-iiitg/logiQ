import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface QuizCardProps {
  id: string;
  image_url: string;
  title: string;
  description: string;
  total_marks: number;
}

function QuizCard({ id,image_url, title, description, total_marks }: QuizCardProps) {

  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate(`/quiz/${id}/questions`);
  };

  const student_id = localStorage.getItem("student_id");

  const [teacher, setTeacher] = useState<string>("");
  const [givenQuiz , setGivenQuiz] = useState<boolean>(false);

  useEffect(() => {
      const fetchTeacher = async () => {
        try {
          const res = await fetch(`http://localhost:3000/api/quizzes/teacher/${id}`);
          const data = await res.json();
  
          if (res.ok) {
            setTeacher(data[0][0].name);
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchTeacher();
    }, [id]);

    useEffect(() => {
      const fetchGivenQuiz = async() => {
        try{
          const res = await fetch(`http://localhost:3000/api/quizzes/given/${student_id}`);
          const data = await res.json();

          if(res.ok){
            let idk_id = [];
            for(let i = 0 ; i < data.quiz_id[0].length ; i++){
              idk_id.push(data.quiz_id[0][i].quiz_id);
            }
            if(idk_id.includes(id)){
              setGivenQuiz(true);
            }
          }
        }catch(error){
          console.error(error);
        }
      }

      
      fetchGivenQuiz();
    },[]);


  return (
    <div className="bg-[#f4f1ea] select-none w-full shadow-xl rounded-2xl overflow-hidden transition font-quicksand transform hover:scale-105 hover:shadow-2xl flex flex-col md:flex-row-reverse items-center border border-gray-300">
      
      <img 
        src={image_url} 
        alt={title} 
        className="w-full h-40 md:w-1/3 md:h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none"
      />

      <div className="p-6 w-full md:w-2/3 text-center md:text-left">
        <h2 className="font-bold text-3xl md:text-4xl text-[#262424]">{title}</h2>
        <p className="text-[#444] mt-3 text-lg">{description}</p>
        <p className="text-[#333] mt-3 text-xl font-semibold">Total Marks: {total_marks}</p>
        <p className="text-[#333] mt-3 text-xl font-semibold">Created by : {teacher}</p>

        

        {
          givenQuiz ? (
            <div className="pt-4">
              <Button
                className=" w-full md:w-auto bg-[#3a3837] cursor-not-allowed"
                style={{
                  fontSize: "1.25rem",  
                  padding: "12px 24px",  
                  minHeight: "50px", 
                }}
              >
                Quiz Completed 🎉
              </Button>
            </div>
          ) : (
            <div className="pt-4">
              <Button
                className="w-full md:w-auto cursor-pointer"
                style={{
                  fontSize: "1.25rem",  
                  padding: "12px 24px",  
                  minHeight: "50px",  
                }} onClick={handleStartQuiz}
              >
                Let’s Get Started!
              </Button>
            </div>
          )
        }


      </div>
    </div>
  );
}

export default QuizCard;
