import { Facebook, Github, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <div className="h-full md:mx-48 flex flex-col items-center pt-9 gap-4">
      <h1 className="text-3xl md:text-5xl font-bold"> Vertex </h1>
      <p className="text-center">
        Vertex is a blog platform where users can share knowledge, ideas, and
        experiences. It provides a space for writers to publish articles on
        various topics, engage with readers, and build a community around shared
        interests. 
      </p>
      <div className="icons flex gap-9 pt-4 md:pt-9">
        <Facebook className="border p-1 rounded-full border-neutral-900" size={34}/>
        <Instagram className="border p-1 rounded-full border-neutral-900" size={34}/>
        <Mail className="border p-1 rounded-full border-neutral-900" size={34}/>
        <Github className="border p-1 rounded-full border-neutral-900" size={34}/>
        <Linkedin className="border p-1 rounded-full border-neutral-900" size={34}/>
      </div>
    </div>
  );
};
export default Footer;
