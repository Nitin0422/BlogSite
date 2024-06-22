import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ChevronsDownIcon, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-9">
      <div className="h-screen w-screen bg-[url('src/assets/banner4.jpg')] bg-cover">
        <div className="bg-black h-screen bg-opacity-60">
          <div className=" bg--900 h-14 bg-opacity-75 flex justify-between items-center px-3 md:px-6">
            <h1
              className="text-white cursor-pointer text-2xl md:text-4xl font-bold"
              onClick={() => navigate("/")}
            >
              {" "}
              VERTEX{" "}
            </h1>
            <div className="flex gap-3 ">
              <Button className="border border-neutral-400 hover:shadow-xl hover:shadow-neutral-700 rounded-xl text-xs md:text-sm">
                Start Publishing
              </Button>
              <Button className="border border-neutral-400 hover:shadow-xl hover:shadow-neutral-700 rounded-xl  text-xs md:text-sm">
                Login
              </Button>
            </div>
          </div>
          {/* This is the body section  */}
          <div className="flex flex-col gap-9 justify-between items-center bg-red-00 h-5/6">
            <div className="flex flex-col gap-9 items-center bg-slate-00 mt-52 md:mt-72">
              <p className=" text-5xl tracking-wide leading-snug text-center md:text-5xl font-semibold text-neutral-200">
                Exploring ideas that matter.
              </p>
              <Button
                variant={"outline"}
                className="animate-bounce border-2 w-2/7 border-neutral-600 rounded-xl  hover:shadow-xl hover:shadow-neutral-700"
                onClick={() => navigate("/blogs")}
              >
                {" "}
                Explore Blogs <ArrowRight className="ml-2" />{" "}
              </Button>
            </div>
            <ChevronsDownIcon className=" text-neutral-500" />
          </div>
        </div>
      </div>

      <h1 className="text-center font-light text-3xl md:text-5xl pt-9">
        {" "}
        Embark on a journey of discovery and inspiration 
      </h1>
      <div className=" flex justify-center">
        <div className=" w-5/6 sm:w-3/5 flex flex-col lg:flex-row justify-center items-center gap-3">
          <Card className="lg:w-3/4 shadow-xl">
            <div className=" flex justify-center p-5 pb-2 ">
                <img src="../src/assets/banner.jpg" className=" w-full h-56 rounded-md shadow-md"/>
            </div>
            
            <p className="mx-5 font-bold text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            
            <CardContent>
            
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate quod fuga laudantium itaque amet. Saepe vel minus
              accusamus perferendis, quos dolorem atque, quisquam eum fugit
              asperiores facilis eaque explicabo, blanditiis quod tempore
              tenetur. Vero, quibusdam?
            </CardContent>
          </Card>
          <Card className="lg:w-3/4 shadow-xl">
            <div className=" flex justify-center p-5 pb-2 ">
                <img src="../src/assets/banner3.jpg" className=" w-full h-56 rounded-md shadow-md"/>
            </div>
            
            <p className="mx-5 font-bold text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            
            <CardContent>
            
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate quod fuga laudantium itaque amet. Saepe vel minus
              accusamus perferendis, quos dolorem atque, quisquam eum fugit
              asperiores facilis eaque explicabo, blanditiis quod tempore
              tenetur. Vero, quibusdam?
            </CardContent>
          </Card>
          
        </div>
      </div>
      <div>Some advertisement of the website</div>
      <div>A button to start reading</div>
    </div>
  );
};

export default HomePage;
