import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthProvider";
import api from "@/utils/api";
import { ArrowRight, ChevronsDownIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const {user} = useAuth();

  return (
    <div className="flex flex-col gap-9">
      <div className="h-screen w-screen bg-[url('src/assets/banner4.jpg')] bg-cover">
        <div className="bg-black h-screen bg-opacity-60">
          <div className="h-14 bg-opacity-75 flex justify-between items-center px-3 md:px-6">
            <h1
              className="text-white cursor-pointer text-2xl md:text-4xl font-bold"
              onClick={() => navigate("/")}
            >
              {" "}
              VERTEX{" "}
            </h1>
            <div className="flex gap-3 ">
              <Button
                className="border border-neutral-400 hover:shadow-xl hover:shadow-neutral-700 rounded-xl text-xs md:text-sm"
                onClick={() => navigate("/register")}
              >
                Start Publishing
              </Button>
              <Button
                className="border border-neutral-400 hover:shadow-xl hover:shadow-neutral-700 rounded-xl  text-xs md:text-sm"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </div>
          </div>
          {/* This is the body section  */}
          <div className="flex flex-col gap-9 justify-between items-center bg-red-00 h-5/6">
            <div className="flex flex-col gap-9 items-center mt-52  sm:mt-72">
              {user ? (
                <p className=" text-5xl tracking-wide leading-snug text-center md:text-5xl font-semibold text-neutral-200">
                  Welcome! {user.name}
                </p>
              ) : (
                <p className=" text-5xl tracking-wide leading-snug text-center md:text-5xl font-semibold text-neutral-200">
                  Exploring ideas that matter.
                </p>
              )}

              <Button
                size={"lg"}
                variant={"outline"}
                className="animate-bounce  border-2  border-neutral-600 rounded-xl  hover:shadow-xl hover:shadow-neutral-700"
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
        <div className=" w-5/6 lg:w-3/5 flex flex-col md:flex-row justify-center items-center gap-9">
          <Card className="md:min-h-full md:w-3/4 shadow-xl">
            <div className=" flex justify-center p-5 pb-2 ">
              <img
                src="../src/assets/banner.jpg"
                className=" w-full h-56 rounded-md shadow-md"
              />
            </div>

            <p className="mx-5 font-bold text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>

            <CardContent className="text-justify text-sm">
              <span className=" text-neutral-500">By </span>
              <span className=" font-medium">Nitin Tandukar </span>
              <span className="text-yellow-700">on April 28 2023 </span>
            </CardContent>
          </Card>
          <Card className="md:min-h-full md:w-3/4 shadow-xl">
            <div className=" flex justify-center p-5 pb-2 ">
              <img
                src="../src/assets/banner3.jpg"
                className=" w-full h-56 rounded-md shadow-md"
              />
            </div>

            <p className="mx-5 font-bold text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>

            <CardContent className="text-justify text-sm">
              <span className=" text-neutral-500">By </span>
              <span className=" font-medium">Nitin Tandukar </span>
              <span className="text-yellow-700">on April 28 2023 </span>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="bg-neutral-300 p-9 flex flex-col gap-9 justify-center items-center">
        <h1 className="text-6xl font-light text-center"> Vertex Basics</h1>
        <div className="flex flex-col pt-9 md:grid md:grid-cols-2 gap-3">
          <div className="text-xl font-medium md:text-4xl md:font-thin md:flex md:pl-24 items-center">
            What is Vertex?{" "}
          </div>

          <div className="text-justify md:pr-24">
            Vertex is a blog platform where users can share knowledge, ideas,
            and experiences. It provides a space for writers to publish articles
            on various topics, engage with readers, and build a community around
            shared interests. With an emphasis on content quality and user
            engagement, Vertex aims to facilitate meaningful discussions and the
            exchange of information.
          </div>
        </div>
        <div className="flex flex-col pt-9 md:grid md:grid-cols-2 gap-3">
          <div className="text-xl font-medium md:text-4xl md:font-thin md:flex md:pl-24 items-center">
            Do I need to pay for Vertex?
          </div>

          <div className="text-justify md:pr-24">
            No, you do not need to pay for Vertex. The platform is free to use,
            allowing anyone to create and share content without any cost. Users
            can access a wide range of articles, publish their own posts, and
            participate in the community without any subscription fees or hidden
            charges, making it accessible for everyone interested in sharing and
            discovering knowledge.
          </div>
        </div>

        <div className="flex flex-col pt-9 md:grid md:grid-cols-2 gap-3">
          <div className="text-xl font-medium md:text-4xl md:font-thin md:flex md:pl-24 items-center">
            Will Vertex help me grow my audience?
          </div>

          <div className="text-justify md:pr-24">
            Yes, Vertex will help you grow your audience. The platform is
            designed to connect writers with readers who are interested in their
            content. By publishing high-quality articles and engaging with the
            community, you can attract more followers and build a loyal
            audience. Vertex’s features, such as sharing tools and community
            interactions, facilitate increased visibility and audience growth
            for content creators.
          </div>
        </div>

        <div className="flex flex-col pt-9 md:grid md:grid-cols-2 gap-3">
          <div className="text-xl font-medium md:text-4xl md:font-thin md:flex md:pl-24 items-center">
            How can I start writing on Vertex?
          </div>

          <div className="text-justify md:pr-24">
            To start writing on Vertex, simply create a free account on the
            platform. Once registered, you can set up your profile, start
            writing articles, and publish them directly. The user-friendly
            interface and tools provided by Vertex make it easy to draft, edit,
            and share your content with the community.
          </div>
        </div>

        <div className="flex flex-col pt-9 md:grid md:grid-cols-2 gap-3 ">
          <div className="text-xl font-medium md:text-4xl md:font-thin md:flex md:pl-24 items-center">
            Is Vertex user-friendly?
          </div>

          <div className="text-justify md:pr-24">
            Yes, Vertex is user-friendly. The platform offers intuitive tools
            for drafting, editing, and publishing articles, making it easy for
            users of all skill levels to share their content. With a clean and
            simple interface, users can focus on creating high-quality content
            without technical difficulties. Additionally, Vertex provides
            helpful resources and support to ensure a smooth experience for all
            its users.
          </div>
        </div>
      </div>
      <div className="">
        <div className="bg-[url('src/assets/world2.jpg')] h-[350px] sm:h-[500px]  bg-center bg-cover bg-no-repeat">
          <div className="h-full  bg-black  bg-opacity-60 flex flex-col justify-center items-center gap-5 text-neutral-200">
            <h1 className=" text-xl font-medium md:text-5xl">
              {" "}
              Join millions of others
            </h1>
            <p className="text-center text-sm font-thin px-9 sm:px-16 lg:px-96 md:text-xl">
              Whether sharing your expertise, breaking news, or whatever’s on
              your mind, you’re in good company on Vertex. Sign up to discover
              why millions of people have published their passions here.
            </p>
            <Button
              className="border border-neutral-400 shadow-sm hover:shadow-slate-50"
              onClick={() => navigate("/register")}
            >
              {" "}
              Create Your Blog
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-neutral-200 h-72">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
