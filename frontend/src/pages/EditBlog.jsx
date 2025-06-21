import React from "react";
import { useParams } from "react-router-dom";
import BlogEditor from "../components/blogs/BlogEditor";

// Mock data fetch function
const getMockBlogById = (id) => {
  return {
    id: id,
    title: `Editing Blog Post #${id}`,
    content: "This is the existing content of the blog post. You can now make changes to it.",
    thumbnail: "https://source.unsplash.com/random/800x600?blog,edit",
  };
};

const EditBlog = () => {
  const { id } = useParams();
  const existingBlog = getMockBlogById(id);

  const handleUpdate = (updatedBlogData) => {
    // In a real app, you would send this data to your backend API
    console.log("Updated blog data to be saved:", updatedBlogData);
    alert(`Blog post #${id} has been updated (mock)! Check the console for the data.`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Blog Post</h1>
      <BlogEditor
        onSave={handleUpdate}
        initialTitle={existingBlog.title}
        initialContent={existingBlog.content}
        initialThumbnail={existingBlog.thumbnail}
      />
    </div>
  );
};

export default EditBlog; 