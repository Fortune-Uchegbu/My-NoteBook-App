import { IoArrowBack } from "react-icons/io5";
import { forwardRef } from "react";
import { List } from './'
import { useState, useEffect } from "react";

export const Menu = forwardRef(({isOpen, setIsOpen, mobile}, ref) => {

  return (
    <aside className={!mobile ? "w-1/5 h-full" : ""}>
        { mobile && <nav 
        id="menu"
        ref = {ref}
        className={`fixed z-100 w-4/5 bg-surface h-full py-3 px-default flex flex-col gap-y-2 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0': '-translate-x-full'}`}>
            <button 
            className="p-2 w-fit self-end" 
            onClick={() => setIsOpen(false)}>
                <IoArrowBack className="w-6 h-6"/>
            </button>
            <List />
        </nav>}

        { !mobile && <nav 
        id="menu"
        ref = {ref}
        className={`w-full h-full bg-surface py-3 flex flex-col translate-x-0 lg:border-r`}>
            <List />
        </nav>}
    </aside>
  )
})
