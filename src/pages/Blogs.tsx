import BlogCard from "@/components/BlogCard";
import Footer from "@/components/footer";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";

const Blogs = () => {
  const blogs: Blog[] = [
    {
      userName: "johnDoe",
      blogTitle: "Understanding JavaScript Closures",
      blogDesc: "A deep dive into closures in JavaScript and how they work.",
      blogPostDate: "2024-09-01",
      likes: 120,
      dislikes: 5,
      comments: 20,
      image: "../src/assets/banner.jpg",
    },
    {
      userName: "janeSmith",
      blogTitle: "Mastering React Hooks",
      blogDesc:
        "An in-depth guide to React Hooks and how to use them effectively.",
      blogPostDate: "2024-08-28",
      likes: 230,
      dislikes: 10,
      comments: 45,
      image: "../src/assets/banner3.jpg",
    },
    {
      userName: "codeMaster",
      blogTitle: "Introduction to Django REST Framework",
      blogDesc: "Learn how to build APIs using Django REST Framework.",
      blogPostDate: "2024-09-03",
      likes: 150,
      dislikes: 3,
      comments: 30,
      image: "../src/assets/banner2.jpg",
    },
    {
      userName: "devGuru",
      blogTitle: "Exploring Tailwind CSS",
      blogDesc:
        "A beginner's guide to Tailwind CSS and how to style your web applications.",
      blogPostDate: "2024-09-05",
      likes: 180,
      dislikes: 8,
      comments: 25,
      image: "../src/assets/banner.jpg",
    },
  ];

  return (
    <div className="space-y-9">
      <div className="bg-neutral-950">
        <Header />
      </div>

      <div className="flex flex-col items-center gap-9  lg:mx-40">
        {blogs.map((blog) => (
          <>
            <BlogCard
              userName={blog.userName}
              blogTitle={blog.blogTitle}
              blogDesc={blog.blogDesc}
              blogPostDate={blog.blogPostDate}
              likes={blog.likes}
              dislikes={blog.dislikes}
              comments={blog.comments}
              image={blog.image}
            />
            <Separator />
          </>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
