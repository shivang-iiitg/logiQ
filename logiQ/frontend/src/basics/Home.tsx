import Header from '@/components/customs/Header';
import { Button } from '@/components/ui/button';
import Spline from '@splinetool/react-spline';
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();

  const handleStart = () => {
    const token = localStorage.getItem("token");
    if (token){
      navigate("/dashboard");
    }else{
      navigate("/auth/login");
    }
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden select-none">
      <Header />

      <div className="flex-1 flex items-center justify-between bg-[#262424] px-12">
        <div className="text-[#eee5da] text-6xl space-y-6">
          <h1 className="font-quicksand">Challenge Your Mind.</h1>
          <h1 className="font-mono">Test Your Skills.</h1>
          <h1 className="font-outfit">Rise to the Top.</h1>

            <Button onClick={handleStart} className="bg-[#eee5da] cursor-pointer text-[#262424] text-xl py-8 px-10 rounded-lg font-semibold hover:bg-[#d1c9be]">
              Get Started
            </Button>

        </div>

        <div className="w-1/2">
          <Spline scene="https://prod.spline.design/Vn105zt4GBsgEpkN/scene.splinecode" />
        </div>
      </div>
    </div>
  );
}

export default Home;