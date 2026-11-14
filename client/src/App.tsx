import { Navigate, Route, Routes } from 'react-router-dom'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import HomePage from '@/pages/HomePage'
import ArticlesPage from '@/pages/ArticlesPage'
import SkillsPage from '@/pages/SkillsPage'
import ContactPage from '@/pages/ContactPage'

function App() {
  return (
    // Column layout: on short pages the footer still sits at the bottom of the screen.
    <div className="flex min-h-svh flex-col">
      <Navbar />
      {/* Full-width wrapper: decorative shapes may stick out past the screen edge, and this
          cuts them off there so they can never create a sideways scrollbar. */}
      <div className="flex-1 overflow-x-clip">
        <main className="mx-auto max-w-5xl px-4 pt-14">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default App
