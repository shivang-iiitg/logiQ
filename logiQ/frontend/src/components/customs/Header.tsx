import { Button } from "../ui/button";
import logo_add from "../../assets/logo-lol.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";



function getUsernameFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.username || "User";
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = getUsernameFromToken();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("student_id");
    navigate("/");
  };

  const handleHome = () => {
    navigate("/");
  }

  const [open, setOpen] = useState(false);

  const isQuizPage = location.pathname.startsWith("/quiz/");
  const isLeaderboardPage = location.pathname.startsWith("/leaderboard");

  return (
    <div className="p-3 px-5 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-lg border border-gray-500 select-none bg-[#eee5da]">
      <img
        src={logo_add}
        alt="Logo"
        className="cursor-pointer w-32 sm:w-auto"
        onClick={handleHome}
      />

      {isQuizPage || isLeaderboardPage ? (
        <Button className="cursor-pointer w-full sm:w-auto" onClick={() => navigate("/dashboard")}>
          <span className="sm:hidden">Dashboard</span>
          <span className="hidden sm:inline">Go to Dashboard</span>
        </Button>
      ) : username ? (
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:space-x-10">
          <Link to="/leaderboard" className="w-full sm:w-auto">
            <Button className="font-quicksand cursor-pointer bg-[#262424] w-full sm:w-auto">
              Leaderboard
            </Button>
          </Link>

          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger>
              <span className="text-xl sm:text-3xl font-bold font-quicksand pb-1 cursor-pointer text-gray-700">
                Hello, {username}
              </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Hello, {username} <br/> Do you want to log out?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will be logged out of your account. You can log in again anytime.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </div>
      ) : (
        <Link to={"/auth/login"} className="w-full sm:w-auto">
          <Button className="cursor-pointer w-full sm:w-auto">Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
