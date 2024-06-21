import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate()
  return (
    <div className="h-screen w-screen bg-[url('src/assets/banner3.jpg')] bg-cover">
      <div className="bg-black h-screen bg-opacity-70">
        <div className=" bg-neutral-900 h-14 bg-opacity-95 flex justify-between items-center px-3 shadow-neutral-700 shadow-xl">
          <h1 className="text-white cursor-pointer text-2xl font-bold" onClick={() => navigate("/")}> VERTEX </h1>
          <div>
            <Button className="border border-white hover:shadow-xl hover:shadow-neutral-700">
              <Mail className="mr-2 h-4 w-4" /> Publish a Blog
            </Button>
          </div>
        </div>
        {/* This is the body section  */}
        <div className="flex flex-col gap-9 justify-center items-center bg-red-00 h-5/6">
          <p className=" text-5xl tracking-wide leading-snug text-center md:text-5xl font-semibold text-neutral-300">
          Discover ideas, ignite passion, and transform your world!
          </p>
          <Button variant={"outline"} className="animate-bounce border-2 border-neutral-600 hover:shadow-xl hover:shadow-neutral-700"> Explore Blogs <ArrowRight/> </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
