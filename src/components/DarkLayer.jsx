import React from 'react'

const DarkLayer = ({ isOpen, setIsOpen, mobile }) => {
  return (
    <>{mobile && 
        <div 
        onClick={() => {if(isOpen) setIsOpen(false)}}
        className={`fixed z-50 ${isOpen && 'inset-0 bg-black opacity-40'}`}>
        </div>
    }</>
  )
}

export default DarkLayer