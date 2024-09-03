import BlogCard from "@/components/BlogCard";
import Footer from "@/components/footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import { ArrowRight, ChevronsDownIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AboutVertex from "@/components/AboutVertex";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <motion.div
      className="flex flex-col gap-9"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-screen w-screen bg-[url('src/assets/banner4.jpg')] bg-cover">
        <div className="bg-black h-screen bg-opacity-60 ">
          <Header />
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

      <h1 className="text-center font-extrabold tracking-tight text-3xl md:text-5xl pt-9">
        {" "}
        Popular Blogs
      </h1>
      <div className=" flex justify-center">
        <div className="w-full lg:w-5/6 flex flex-col  justify-center items-center gap-3 md:gap-9">
          <BlogCard
            userName="Samagya Pradhan"
            blogTitle="The resume that got software engineer a $300,000 job at Google."
            blogDesc="Above is the resume I used to apply to Google and land an exciting $300,000 offer."
            blogPostDate="16th Nov"
            likes={445}
            dislikes={10}
            comments={99}
            image="../src/assets/banner3.jpg"
          />
          <BlogCard
            userName="Tari Ibabha"
            blogTitle="5 amazing new JavaScript features in ES15 (2024)"
            blogDesc="From sophisticated async features to syntactic array sugar and modern regex, JavaScript coding is now easier and faster than ever."
            blogPostDate="14th Oct"
            likes={695}
            dislikes={77}
            comments={100}
            image="../src/assets/banner.jpg"
          />
        </div>
      </div>
      {/* <motion.div
        className="bg-neutral-300 p-9 flex flex-col gap-9 justify-center items-center"
        initial={{ x: -800 }}
        whileInView={{ x: 0 }}
        transition={{ type: "spring", duration: 2 }}
      >
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
      </motion.div> */}
      <AboutVertex />
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
    </motion.div>
  );
};

export default HomePage;
