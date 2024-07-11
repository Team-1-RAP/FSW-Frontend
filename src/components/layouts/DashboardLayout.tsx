import { useState } from "react"
import Navbar from "../fragments/Dashboard/Navbar"
import SideBar from "../fragments/Dashboard/Sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isAsideOpen, setIsAsideOpen] = useState(false)
  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen)
  }
  const closeAside = () => {
    setIsAsideOpen(false)
  }
  return (
    <div className="flex h-screen">
      {/* Navbar */}
      <Navbar toggleAside={toggleAside} />
      <div className="flex flex-row flex-grow w-full mt-40 lg:mt-20">
        {/* Sidebar */}
        <SideBar isAsideOpen={isAsideOpen} closeAside={closeAside} />
        {/* Main */}
        <main className="flex flex-grow lg:ml-[200px] pt-5 lg:pt-10 bg-gray-50">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
