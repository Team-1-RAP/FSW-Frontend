import React, { useState } from "react";
import { ChevronDown } from "react-feather";

interface DropdownProps {
  id: string;
  label: string;
  options: string[];
  onChange: (selected: string | null) => void;
}

const DropdownItem: React.FC<DropdownProps> = ({
  id,
  options,
  label,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string | null) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div className="relative inline-block md:w-64 w-full">
      <button
        id={id}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
        className={`w-2/4 md:w-full h-8 bg-white border border-[#1454FB] ${
          isOpen ? "rounded-t-2xl" : "rounded-2xl"
        } flex justify-between items-center px-2`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault(); // Prevent space from scrolling the page
            toggleDropdown();
          }
        }}
        aria-label={selectedOption || label}
      >
        <span className="text-sm">{selectedOption || label}</span>
        <ChevronDown className="w-4 h-4 text-[#1454FB]" />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-labelledby={id}
          className="absolute left-0 w-2/4 md:w-full border border-[#1454FB] border-t-0 bg-white rounded-b-2xl shadow-md z-10"
          tabIndex={-1}
        >
          <li
            role="option"
            aria-selected={selectedOption === null}
            className="cursor-pointer px-2 py-1 hover:bg-[#1454FB] hover:text-white"
            onClick={() => handleOptionClick(null)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOptionClick(null);
              }
            }}
            aria-label="Tidak ada pilihan"
          >
            --
          </li>
          {options.map((option, index) => (
            <li
              key={index}
              role="option"
              aria-selected={selectedOption === option}
              className={`cursor-pointer px-2 py-1 hover:bg-[#1454FB] hover:text-white ${
                index === options.length - 1 ? "hover:rounded-b-2xl" : ""
              }`}
              onClick={() => handleOptionClick(option)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOptionClick(option);
                }
              }}
              aria-label={option}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownItem;
