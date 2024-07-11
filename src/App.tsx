import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import LandingPage from "./features/guests/LandingPage"
import Dashboard from "./features/dashboard/Dashboard"
import NotFound from "./features/NotFound"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/home" element={<Dashboard />}></Route>

        {/* NotFound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
