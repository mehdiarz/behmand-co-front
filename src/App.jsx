import { BrowserRouter, Routes, Route } from "react-router-dom";
import './i18n';

// صفحات عمومی
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Layout from "./components/layout/Layout.jsx";
import ResumeForm from "./pages/ResumeForm.jsx";
import CustomersPage from "./pages/CustomersPage.jsx";

// صفحات بلاگ عمومی
import BlogList from "./pages/BlogList.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";

// صفحات ادمین
import AdminLogin from "./pages/AdminLogin.jsx";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import AdminResumes from "./pages/AdminResumes.jsx";
import AdminMessages from "./pages/AdminMessages.jsx";
import AdminFinancials from "./pages/AdminFinancials.jsx";
import CustomersAdmin from "./pages/CustomersAdmin.jsx";
import AdminBlogs from "./pages/AdminBlogs.jsx";
import AdminBlogForm from "./pages/AdminBlogForm.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* صفحات عمومی سایت */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="resumeForm" element={<ResumeForm />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="contact" element={<Contact />} />

          {/* بلاگ عمومی */}
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/:slug" element={<BlogDetail />} />
        </Route>

        {/* لاگین ادمین */}
        <Route path="admin/login" element={<AdminLogin />} />

        {/* پنل مدیریت */}
        <Route
          path="admin/panel/*"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="customers" element={<CustomersAdmin />} />
          <Route path="resumes" element={<AdminResumes />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="financials" element={<AdminFinancials />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="blogs/new" element={<AdminBlogForm />} />
          <Route path="blogs/edit/:id" element={<AdminBlogForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
