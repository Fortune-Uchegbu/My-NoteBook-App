import { IoArrowBack } from "react-icons/io5";
import { forwardRef, useState, useEffect, useContext } from "react";
import { List } from './'
import { NoteContext } from "../contexts/NoteContext";

export const Menu = forwardRef(({mobile}, ref) => {
    const { menuOpen, setMenuOpen } = useContext(NoteContext);
    return (
    <aside className={!mobile ? "w-1/5 h-full shrink-0" : ""}>
        { mobile && <nav 
        id="menu"
        ref = {ref}
        className={`fixed z-100 w-4/5 bg-surface h-full py-3 px-default flex flex-col gap-y-2 transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0': '-translate-x-full'}`}>
            <button 
            className="p-2 w-fit self-end" 
            onClick={() => setMenuOpen(false)}>
                <IoArrowBack className="w-6 h-6"/>
            </button>
            <List />
        </nav>}

        { !mobile && <nav 
        id="menu"
        ref = {ref}
        className={`w-full h-full bg-surface py-3 flex shrink-0 flex-col translate-x-0 lg:border-r lg:border-border`}>
            <List />
        </nav>}
    </aside>
    )
})
