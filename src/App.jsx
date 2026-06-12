import { Routes, Route } from 'react-router-dom'

// Public Pages
import Home from './pages/Home'
import News from './pages/News'
import Directory from './pages/Directory'
import Tours from './pages/Tours'
import Events from './pages/Events'
import Conservation from './pages/Conservation'
import Contact from './pages/Contact'
import SinglePost from './pages/SinglePost'

// Admin Pages
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminCreate from './pages/admin/CreatePost'
import AdminEdit from './pages/admin/EditPost'

// Layout
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Routes>
        {/* Admin routes - no navbar/footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute><AdminDashboard /></ProtectedRoute>
        } />
        <Route path="/admin/create" element={
          <ProtectedRoute><AdminCreate /></ProtectedRoute>
        } />
        <Route path="/admin/edit/:id" element={
          <ProtectedRoute><AdminEdit /></ProtectedRoute>
        } />

        {/* Public routes - with navbar/footer */}
        <Route path="/*" element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/news" element={<News />} />
                <Route path="/directory" element={<Directory />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/events" element={<Events />} />
                <Route path="/conservation" element={<Conservation />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/post/:id" element={<SinglePost />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </div>
  )
}