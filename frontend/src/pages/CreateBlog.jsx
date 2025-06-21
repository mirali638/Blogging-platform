import React from "react";
import BlogEditor from "../components/blogs/BlogEditor";

const CreateBlog = () => {
  const handleSave = (newBlogData) => {
    // In a real app, you would send this data to your backend API
    console.log("New blog data to be saved:", newBlogData);
    alert("Blog has been created (mock)! Check the console for the data.");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Create a New Blog Post</h1>
      <BlogEditor onSave={handleSave} />
    </div>
  );
};

export default CreateBlog; 