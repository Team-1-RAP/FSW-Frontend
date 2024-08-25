import React, { useState } from "react"
import { AlignJustify, HelpCircle, Search } from "react-feather"
import { Link, useNavigate } from "react-router-dom"
import logo from "../../../assets/images/logo.png"
import logoutIcon from "../../../assets/icons/logout-left.png"
import { services } from "../../../utils/ServiceButtonUtils"
import { useAuth } from "../../../hooks/useAuth"

interface NavbarProps {
  toggleAside?: () => void
  showGreeting?: boolean
  showSearchBar?: boolean
  showHelpButton?: boolean
  showLogoutButton?: boolean
}

const AuthenticatedSection: React.FC<{ showGreeting: boolean }> = ({ showGreeting }) => {
  const { fullname } = useAuth()
  return <>{showGreeting && <p className="text-sm font-normal">Hi, {fullname}</p>}</>
}

const Navbar: React.FC<NavbarProps> = ({ toggleAside, showGreeting = true, showSearchBar = true, showHelpButton = true, showLogoutButton = true }) => {
  const { logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const filteredServices = services.filter((service) => service.label.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setIsDropdownOpen(e.target.value !== "")
  }

  const handleServiceSelect = (link: string) => {
    navigate(link)
    setIsDropdownOpen(false)
    setSearchQuery("")
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="h-25 lg:h-20 bg-[#FFFFFF] top-0 w-full py-5 lg:py-0 fixed shadow z-10" role="banner">
      <div className="flex flex-col justify-between h-full px-4 mb-auto lg:flex-row lg:items-center gap-y-3 md-gap-y-0 lg:px-10">
        <div className="flex flex-col justify-between lg:flex-row lg:items-center gap-x-0 lg:gap-x-2">
          <div className="w-24">
            <img src={logo} alt="Logo" className="w-[62px] h-[62px]" />
          </div>
          {showGreeting && <AuthenticatedSection showGreeting={showGreeting} />}
        </div>
        <div className="flex flex-row">
          {toggleAside && (
            <button className="lg:hidden flex items-center justify-center bg-[#F1F5F9] w-[36px] h-[36px] rounded-full" onClick={toggleAside} aria-label="Toggle navigation menu">
              <AlignJustify className="text-[#235697]" />
            </button>
          )}
          {showSearchBar && (
            <div className="relative flex flex-row ml-[auto]">
              <div className="relative">
                <input
                  className="appearance-none border-2 pl-10 bg-[#F1F5F9] rounded-2xl transition-colors lg:w-[269px] lg:h-[36px] h-[36px] py-2 px-3 text-[#747474] leading-tight focus:outline-none text-base w-[auto]"
                  id="search"
                  type="text"
                  placeholder="Cari layanan..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  aria-label="Cari layanan"
                  aria-expanded={isDropdownOpen}
                  role="combobox"
                  aria-controls="services-dropdown"
                  aria-autocomplete="list"
                />
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <Search className="ml-3 text-[#235697]" aria-hidden="true" />
                </div>

                {isDropdownOpen && filteredServices.length > 0 && (
                  <ul id="services-dropdown" className="absolute z-20 mt-2 w-full bg-white border border-[#F1F5F9] rounded-2xl shadow-md" role="listbox" aria-label="Layanan tersedia">
                    {filteredServices.map((service) => (
                      <li key={service.id} className="cursor-pointer px-4 py-2 hover:bg-[#F1F5F9] rounded-2xl" role="option" onClick={() => handleServiceSelect(service.link)}>
                        {service.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
          {showHelpButton && (
            <Link to="/pusat-bantuan" className="flex items-center justify-center bg-[#F1F5F9] w-[36px] h-[36px] rounded-full" aria-label="Pusat bantuan">
              <HelpCircle className="text-[#235697]" />
            </Link>
          )}
          {showLogoutButton && (
            <button className="flex items-center justify-center bg-[#F1F5F9] w-[36px] h-[36px] rounded-full" onClick={handleLogout} aria-label="Logout">
              <img src={logoutIcon} className="w-[20px] h-[20px]" alt="Logout icon" />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
