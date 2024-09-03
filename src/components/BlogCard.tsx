import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MessageCircle, Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";

interface BlogCardProps {
  userName: string;
  blogTitle: string;
  blogDesc: string;
  blogPostDate: string;
  likes: number;
  dislikes: number;
  comments: number;
  image: string;
}

const BlogCard = ({
  userName,
  blogTitle,
  blogDesc,
  blogPostDate,
  likes,
  dislikes,
  comments,
  image,
}: BlogCardProps) => {
  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    const initials = nameParts.map((part) => part[0].toUpperCase());
    return initials.join("");
  };

  return (
    <motion.div
      className="grid grid-cols-3 p-1 lg:w-5/6 border-b-2"
      initial={{ opacity: 0.2 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    //   viewport={{ once: true }}
    >
      <div className=" col-span-2  p-1 grid grid-rows-5 gap-3 max-h-48">
        <div className="row-span-1 flex gap-2 items-center">
          <Avatar className="cursor-pointer size-9 border-neutral-300  border">
            <AvatarImage src="" />
            <AvatarFallback className="text-xs">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium">{userName}</span>
        </div>
        <div className=" row-span-3 flex flex-col">
          <span className="font-extrabold tracking-tight md:text-3xl">
            {blogTitle}
          </span>
          <span className="text-[10px] md:text-sm py-1 md:pt-2">
            {blogDesc}
          </span>
        </div>
        <div className="bg-green-5040 row-span-1 flex items-center justify-between">
          <span className="text-[9px] md:text-xs flex items-center gap-1 bg-red-00">
            <Sparkles size={15} stroke="false" fill="black" /> {blogPostDate}{" "}
          </span>
          <div className="bg-red-7400 flex gap-3 md:pr-9">
            <span className="flex gap-1 items-center">
              <ThumbsUp size={15} />
              <p className="text-[10px] md:text-xs">{likes}</p>
            </span>
            <span className="flex gap-1 items-center">
              <ThumbsDown size={15} />
              <p className="text-[10px] md:text-xs">{dislikes}</p>
            </span>
            <span className="flex gap-1 items-center">
              <MessageCircle size={15} />
              <p className="text-[10px] md:text-xs">{comments}</p>
            </span>
          </div>
        </div>
      </div>
      <div className="col-span-1  p-1 overflow-hidden max-h-48">
        <img src={image} className="w-full h-full object-cover" />
      </div>

      {/* <div className=" flex justify-center p-5 pb-2 ">
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
      </CardContent> */}
    </motion.div>
  );
};

export default BlogCard;