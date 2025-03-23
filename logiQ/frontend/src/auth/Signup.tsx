import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "sonner";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
        toast.error("Signup failed");
      }

      toast.success("Signed Up Successfully");
      navigate("/auth/login");
    } catch (err : any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen select-none font-quicksand flex items-center justify-center bg-[#262424]">
      <div className="bg-[#f1eae1] backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[350px] text-center">
        <h1 className="text-3xl font-bold text-[#262424] mb-6">Join the Challenge!</h1>

        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#f7f3ed] text-[#262424] placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-[#262424]"
          />
          
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        {error && <p className="text-red-500 pt-4 text-sm mt-2">{error}</p>}

        <Button 
          onClick={handleSignup} 
          disabled={loading}
          className="mt-6 w-full py-3 bg-[#262424] text-white text-lg font-semibold rounded-lg hover:bg-[#4a4848] transition"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>

        <p className="mt-4 text-[#262424]">
          Already have an account? 
          <Link to="/auth/login" className="text-[#5c899d] font-semibold hover:underline ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;