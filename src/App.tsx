import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import LandingPage from "./features/guests/LandingPage"
import NotFound from "./features/NotFound"
import HomePage from "./features/home/HomePage"
import Profile from "./features/profile/Profile"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/test" element={<Profile />}></Route>

        {/* NotFound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
