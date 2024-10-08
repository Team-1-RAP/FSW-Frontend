import React, { useRef, useEffect, useCallback } from "react"
import { ModalProps } from "./type"
import WarningIcon from "../../../assets/icons/Warning.png"
import { X } from "react-feather"

const Modal: React.FC<ModalProps> = ({ title, description, visible, buttonLabel, onButtonClick, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (visible) {
      document.addEventListener("mousedown", handleOutsideClick)
    } else {
      document.removeEventListener("mousedown", handleOutsideClick)
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [visible, handleOutsideClick])

  if (!visible) return null

  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto bg-black bg-opacity-50"
      role="dialog"
      aria-live="assertive"
      aria-atomic="true"
      aria-label={title}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div ref={modalRef} className="relative text-center bg-white rounded-md shadow-lg max-w-[734px] w-full px-32 py-16">
        <button type="button" onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900" aria-label="Close modal">
          <X className="w-6 h-6" />
        </button>
        <div className="relative flex flex-col gap-[30px] ">
          <img src={WarningIcon} alt="warning alert" className="mx-auto mb-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
          <h3 id="modal-title" className="text-[20px] font-bold text-black">
            {title}
          </h3>
          <p id="modal-description" className="text-[14px] px-20 font-normal text-black">
            {description}
          </p>
          <button type="button" onClick={onButtonClick} className="w-full text-white bg-[#0066AE] hover:bg-[#0d314b] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-[18px] text-sm px-5 py-2.5 text-center">
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
