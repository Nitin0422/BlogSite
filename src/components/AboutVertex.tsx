import { motion } from "framer-motion";

const AboutVertex = () => {
  return (
    <motion.div className="bg-neutral-30 py-9 flex flex-col gap-9 justify-center items-center overflow-hidden">
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center">
        {" "}
        Vertex Basics
      </h1>

      <div className="min-w-full grid grid-cols-8  gap-5">
        <motion.div
          className="col-span-6 md:col-span-4 bg-neutral-950 text-neutral-200 flex flex-col gap-3 rounded-r-2xl p-5 md:pl-40"
          initial={{ x: -100 }}
          whileInView={{ x: 0 }}
          transition={{ type: "spring", duration: 1.3 }}
        >
          <div className="text-2xl font-bold tracking-tight">
            What is Vertex?{" "}
          </div>
          <div className="text-justify font-thin">
            Vertex is a blog platform where users can share knowledge, ideas,
            and experiences. It provides a space for writers to publish articles
            on various topics, engage with readers, and build a community around
            shared interests.
          </div>
        </motion.div>

        <motion.div
          className="col-span-6 col-start-3 md:col-span-4 md:col-start-5 row-start-2  rounded-l-2xl p-5 md:pr-40 bg-neutral-950 text-neutral-200 flex flex-col gap-3"
          initial={{ x: 100 }}
          whileInView={{ x: 0 }}
          transition={{ type: "spring", duration: 1.3 }}
        >
          <div className="text-2xl font-bold tracking-tight">
            Do I need to pay for Vertex?
          </div>
          <div className="text-justify font-thin">
            No, you do not need to pay for Vertex. The platform is free to use,
            allowing anyone to create and share content without any cost. Users
            can access a wide range of articles, publish their own posts, and
            participate in the community without any subscription fees or hidden
            charges, making it accessible for everyone interested in sharing and
            discovering knowledge.
          </div>
        </motion.div>

        <motion.div
          className="col-span-6 md:col-span-4  row-start-3 bg-neutral-950 text-neutral-200 flex flex-col gap-3 rounded-r-2xl p-5 md:pl-40"
          initial={{ x: -100 }}
          whileInView={{ x: 0 }}
          transition={{ type: "spring", duration: 1.3 }}
        >
          <div className="text-2xl font-bold tracking-tight">
            Will Vertex help me grow my audience?
          </div>
          <div className="text-justify font-thin">
            Yes, Vertex will help you grow your audience. The platform is
            designed to connect writers with readers who are interested in their
            content. By publishing high-quality articles and engaging with the
            community, you can attract more followers and build a loyal
            audience.
          </div>
        </motion.div>

        <motion.div
          className="col-span-6 col-start-3 md:col-span-4 md:col-start-5 row-start-4  bg-neutral-950 text-neutral-200 flex flex-col gap-3  rounded-l-2xl p-5 md:pr-40"
          initial={{ x: 100 }}
          whileInView={{ x: 0 }}
          transition={{ type: "spring", duration: 1.3 }}
        >
          <div className="text-2xl font-bold tracking-tight">
            How can I start writing on Vertex?
          </div>
          <div className="text-justify font-thin">
            To start writing on Vertex, simply create a free account on the
            platform. Once registered, you can set up your profile, start
            writing articles, and publish them directly. The user-friendly
            interface and tools provided by Vertex make it easy to draft, edit,
            and share your content with the community.
          </div>
        </motion.div>

        <motion.div
          className="col-span-6 md:col-span-4 row-start-5 bg-neutral-950 text-neutral-200 flex flex-col gap-3 rounded-r-2xl p-5 md:pl-40"
          initial={{ x: -100 }}
          whileInView={{ x: 0 }}
          transition={{ type: "spring", duration: 1.3 }}
        >
          <div className="text-2xl font-bold tracking-tight">
            Is Vertex user-friendly?
          </div>
          <div className="text-justify font-thin">
            Yes, Vertex is user-friendly. The platform offers intuitive tools
            for drafting, editing, and publishing articles, making it easy for
            users of all skill levels to share their content. With a clean and
            simple interface, users can focus on creating high-quality content
            without technical difficulties.
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutVertex;
