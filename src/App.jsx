import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage  from './pages/LandingPage.jsx'
import ChatPage     from './pages/ChatPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<LandingPage />}  />
        <Route path="/chat"      element={<ChatPage />}     />
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}