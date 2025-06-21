import React from "react";
import { useParams, Link } from "react-router-dom";
import CommentList from "../components/comments/CommentList";
import CommentForm from "../components/comments/CommentForm";

const getMockBlogById = (id) => ({
  id,
  title: "A Deep Dive into React Hooks",
  author: "John Doe",
  date: "2024-06-15",
  content: `
    <p>React Hooks have revolutionized how we write components. In this post, we'll explore the most common Hooks and how to use them effectively.</p>
    <img src="https://source.unsplash.com/random/800x400?code,react" alt="React Code" class="my-4 rounded-lg shadow-md" />
    <h2 class="text-2xl font-bold mt-6 mb-2">useState: The Core of State Management</h2>
    <p>The <strong>useState</strong> Hook is the most fundamental Hook. It lets you add React state to function components...</p>
    <pre class="bg-gray-800 text-white p-4 rounded-md my-4"><code>const [count, setCount] = useState(0);</code></pre>
    <h2 class="text-2xl font-bold mt-6 mb-2">useEffect: Handling Side Effects</h2>
    <p>The <strong>useEffect</strong> Hook lets you perform side effects in function components. Data fetching, subscriptions, or manually changing the DOM are all examples of side effects...</p>
  `,
});

const BlogDetail = () => {
  const { id } = useParams();
  const blog = getMockBlogById(id);

  if (!blog) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Blog not found</h1>
        <Link to="/home" className="text-indigo-600">Go back home</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <article>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{blog.title}</h1>
        <p className="text-gray-500 mb-6">By {blog.author} on {blog.date}</p>
        <div
          className="prose lg:prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
      <hr className="my-8" />
      <section>
        <CommentForm />
        <CommentList />
      </section>
    </div>
  );
};

export default BlogDetail; 