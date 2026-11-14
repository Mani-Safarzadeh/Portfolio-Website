import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import HomePage from '@/pages/HomePage'
import ArticlesPage from '@/pages/ArticlesPage'
import SkillsPage from '@/pages/SkillsPage'
import ContactPage from '@/pages/ContactPage'

function App() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 pt-14">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*"element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  )
}

export default App
