import { useState } from "react"
import Navbar from "../fragments/Navbar"
import SideBar from "../fragments/Sidebar"
import { Outlet } from "react-router-dom"

const DashboardLayout = () => {
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
      <Navbar toggleAside={toggleAside} showGreeting={true} showSearchBar={true} showHelpButton={true} showLogoutButton={true} />
      <div className="flex flex-row flex-grow w-full mt-40 lg:mt-20">
        {/* Sidebar */}
        <SideBar isAsideOpen={isAsideOpen} closeAside={closeAside} />
        {/* Main */}
        <main className="lg:mx-auto lg:flex flex-grow lg:ml-[200px] pt-5 lg:pt-7 bg-gray-50 h-[fit-content] px-[5%] lg:px-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
