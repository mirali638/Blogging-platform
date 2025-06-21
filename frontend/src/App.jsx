import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MyBlogs from './pages/MyBlogs';
import Blogs from './pages/Blogs';
import EditBlog from './pages/EditBlog';
import CreateBlog from './pages/CreateBlog';
import BlogDetail from './pages/BlogDetail';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminCategories from './pages/admin/AdminCategories';
import AdminUsers from './pages/admin/AdminUsers';
import AdminLogs from './pages/admin/AdminLogs';
import UserDashboard from './pages/UserDashboard';
import Contact from './pages/Contact';
import About from './pages/About';
import './index.css';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        
        <Route path="/user/dashboard" element={<UserDashboard />}>
          <Route index element={<Profile />} />
          <Route path="my-blogs" element={<MyBlogs />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="my-blogs" element={<MyBlogs />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="edit-blog/:id" element={<EditBlog />} />
          <Route path="create-blog" element={<CreateBlog />} />
          <Route path="blog/:id" element={<BlogDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="logs" element={<AdminLogs />} />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
} 