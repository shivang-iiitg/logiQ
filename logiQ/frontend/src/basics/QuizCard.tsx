import { Button } from "@/components/ui/button";
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


  return (
    <div className="bg-[#f4f1ea] w-full shadow-xl rounded-2xl overflow-hidden transition font-quicksand transform hover:scale-105 hover:shadow-2xl flex flex-col md:flex-row-reverse items-center border border-gray-300">
      
      <img 
        src={image_url} 
        alt={title} 
        className="w-full h-40 md:w-1/3 md:h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none"
      />

      <div className="p-6 w-full md:w-2/3 text-center md:text-left">
        <h2 className="font-bold text-3xl md:text-4xl text-[#262424]">{title}</h2>
        <p className="text-[#444] mt-3 text-lg">{description}</p>
        <p className="text-[#333] mt-3 text-xl font-semibold">Total Marks: {total_marks}</p>

        <div className="pt-4">
          <Button
            className="w-full md:w-auto"
            style={{
              fontSize: "1.25rem",  
              padding: "12px 24px",  
              minHeight: "50px",  
            }} onClick={handleStartQuiz}
          >
            Let’s Get Started!
          </Button>
        </div>


      </div>
    </div>
  );
}

export default QuizCard;
