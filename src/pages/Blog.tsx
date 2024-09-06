import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { blogID } = useParams();
  const [blog, setBlog] = useState<Blog | undefined>(undefined);

  useEffect(() => {
    setTimeout(() => {
      setBlog({
        userName: "johnDoe",
        blogTitle: "Understanding JavaScript Closures",
        blogDesc: "A deep dive into closures in JavaScript and how they work.",
        blogPostDate: "2024-09-01",
        likes: 120,
        dislikes: 5,
        comments: 20,
        image: "../src/assets/banner.jpg",
        
      });
    }, 2000);
  }, []);

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <h1>{blog.blogTitle}</h1>
      <p>
        <strong>By:</strong> {blog.userName}
      </p>
      <p>
        <strong>Posted on:</strong> {blog.blogPostDate}
      </p>
      <img src={blog.image} alt={blog.blogTitle} />
      
    </div>
  );
};

export default Blog;
