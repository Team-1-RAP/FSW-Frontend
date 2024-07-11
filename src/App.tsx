import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import LandingPage from "./features/guests/LandingPage"
import NotFound from "./features/NotFound"
import HomePage from "./features/home/HomePage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>

        {/* NotFound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
