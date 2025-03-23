import { useEffect, useState } from "react";
import Header from "@/components/customs/Header";

interface Student {
  id: number;
  name: string;
  marks: number;
}

function Leaderboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/leaderboard");
        const data = await res.json();

        if (res.ok) {
          setStudents(data.students);
        } else {
          setError(data.message || "Failed to fetch leaderboard");
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setError("Error fetching leaderboard!");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-[#eee5da]">
      <Header />
      <div className="p-6 flex select-none flex-col items-center min-h-screen">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 mt-6 bg-[#262424] bg-clip-text text-transparent animate-fade-in">
          Leaderboard
        </h1>

        {loading ? (
          <div className="flex flex-col items-center mt-12 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500"></div>
            <p className="text-gray-600 text-lg">Loading rankings...</p>
          </div>
        ) : error ? (
          <div className="mt-8 p-4 bg-red-50 rounded-lg flex items-center space-x-3">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        ) : (
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden mt-6">
            <div className="px-6 py-4 bg-[#262424]">
              <div className="grid grid-cols-3 text-center">
                <span className="text-white font-semibold">Rank</span>
                <span className="text-white font-semibold">Name</span>
                <span className="text-white font-semibold">Marks</span>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {students.map((student, index) => (
                <div 
                  key={student.id}
                  className="grid grid-cols-3 items-center py-4 px-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-center">
                    <span className={`text-lg font-medium ${
                      index === 0 ? 'bg-yellow-400 text-white' :
                      index === 1 ? 'bg-gray-400 text-white' :
                      index === 2 ? 'bg-[#CD7F32] text-white' : 'bg-white'
                    } text-[#262424] rounded-full w-8 h-8 flex items-center justify-center`}>
                      {index + 1}
                    </span>
                  </div>
                  <div className="text-center text-gray-800 font-medium">
                    {student.name}
                    {index === 0 && <span className="ml-2">🏆</span>}
                  </div>
                  <div className="text-center">
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {student.marks} Points
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
