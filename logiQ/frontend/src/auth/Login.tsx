import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast, Toaster } from "sonner";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        toast.success("Login successful!");

        localStorage.setItem("student_id", data.student_id);

        setTimeout(() => navigate("/dashboard"), 50);
      } else {
        toast.error(data.message || "Login failed!");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again!");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="h-screen select-none font-quicksand flex items-center justify-center bg-[#262424]">
      <div className="bg-[#f1eae1] backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[350px] text-center">
        <h1 className="text-3xl font-bold text-[#262424] mb-6">welcome back :)</h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#f7f3ed] text-[#262424] placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-[#262424]"
          />
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-lg bg-[#f7f3ed] text-[#262424] placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-[#262424]"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-[#262424]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
            </button>
          </div>
        </div>

        <Button
          onClick={handleLogin}
          className="mt-6 w-full py-3 bg-[#262424] text-white text-lg font-semibold rounded-lg hover:bg-[#4a4848] transition"
        >
          Login
        </Button>

        <p className="mt-4 text-[#262424]">
          Not a member? 
          <Link to="/auth/signup" className="text-[#5c899d] font-semibold hover:underline ml-1">
            Sign up
          </Link>
        </p>
      </div>

      <Toaster richColors />
    </div>
  );
}

export default Login;
