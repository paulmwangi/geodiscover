import { useState } from 'react';
import Link from 'next/link';
import { Button, Input, Card, } from '@nextui-org/react';


interface BlogPost {
  id: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  image: string;
  eventType: string;
}

const initialFormData = {
  title: '',
  summary: '',
  author: '',
  date: '',
  image: '',
  eventType: '',
};

const Blog: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: "1",
      title: "Exploring the Depths of the Ocean",
      summary: "Join us as we dive into the mysteries of the deep sea...",
      author: "John Doe",
      date: "2023-01-01",
      image: "/img-1.png",
      eventType: "Underwater Adventure",
    },
    {
      id: "2",
      title: "Scaling the World's Highest Peaks",
      summary: "Experience the thrill and challenge of mountain climbing...",
      author: "Jane Smith",
      date: "2023-02-01",
      image: "/img-2.png",
      eventType: "Mountain Expedition",
    },
    // Retain previous blog posts
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form data as needed

    // Add the new blog post to the list
    const newBlogPost: BlogPost = {
      id: String(Date.now()),
      ...formData,
    };

    setBlogPosts((prevPosts) => [newBlogPost, ...prevPosts]);

    // Reset the form
    setFormData(initialFormData);
  };

  return (
    <div className="p-20 relative min-h-screen overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-l from-purple-900 via-pink-700 to-red-500 animate-pulse"></div>
  
    <div className="relative z-15">
      <h1 className="text-4xl font-bold mb-8 text-center">Explore Our Blog</h1>
      <form onSubmit={handleSubmit} className="mb-8 p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-4">Create a New Blog Post</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="bg-transparent border-b-2 border-gray-300 text-gray-700 focus:outline-none"
        />
        <Input
          type="text"
          name="summary"
          placeholder="Summary"
          value={formData.summary}
          onChange={handleChange}
          className="bg-transparent border-b-2 border-gray-300 text-gray-700 focus:outline-none"
        />
        <Input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="bg-transparent border-b-2 border-gray-300 text-gray-700 focus:outline-none"
        />
        <Input
          type="text"
          name="date"
          placeholder="Date"
          value={formData.date}
          onChange={handleChange}
          className="bg-transparent border-b-2 border-gray-300 text-gray-700 focus:outline-none"
        />
        <Input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="bg-transparent border-b-2 border-gray-300 text-gray-700 focus:outline-none"
        />
        <Input
          type="text"
          name="eventType"
          placeholder="Event Type"
          value={formData.eventType}
          onChange={handleChange}
          className="bg-transparent border-b-2 border-gray-300 text-gray-700 focus:outline-none"
        />
      </div>
      <Button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full transition duration-300 ease-in-out focus:outline-none"
      >
        Add Blog Post
      </Button>
    </form>

    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {blogPosts.map((post) => (
    <Link key={post.id} href={`/blog/${post.id}`} passHref>
      <div className="cursor-pointer transform transition-transform hover:scale-105 bg-white rounded-lg overflow-hidden shadow-lg">
        <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
        <div className="p-6">
          <div className="mb-4">
            <span className="text-sm text-black font-semibold">{post.eventType}</span>
          </div>
          <h3 className="text-2xl font-bold mb-2 text-black">{post.title}</h3>
          <p className="text-black mb-4">{post.summary}</p>
          <div className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 mr-1 text-white"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5-10 5z"></path>
            </svg>
            <span className="text-sm text-white">{post.author}</span>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 mr-1 text-white"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
            <span className="text-sm text-white">{post.date}</span>
          </div>
        </div>
      </div>
    </Link>
  ))}
</section>

      </div>
    </div>
  );
};

export default Blog;
