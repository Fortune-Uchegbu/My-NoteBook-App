import { IoArrowBack } from "react-icons/io5";
import { forwardRef, useState, useEffect, useContext, useRef } from "react";
import { List } from './'
import { NoteContext } from "../contexts/NoteContext";

export const Menu = ({mobile}) => {
    const { menuOpen, setMenuOpen } = useContext(NoteContext);
    const menuRef = useRef(null);
    useEffect(()=>{
        // focus the menu first elem 
        const firstElem = menuRef.current?.querySelector('button');
        if(firstElem) firstElem.focus();
        // console.log(firstElem)
    },[menuOpen])
    return (
        <nav 
        id="menu"
        className="w-full py-2 h-full bg-surface flex grow flex-col translate-x-0 lg:border-r lg:border-border"
        ref = {menuRef}>
            {mobile && <button
            id="closeMenu"
            className="p-2 w-fit self-end shrink-0" 
            onClick={() => setMenuOpen(false)}>
                <IoArrowBack className="w-6 h-6"/>
            </button>}

            {
            
            <div className='h-full overflow-y-scroll px-2 grow'>
                <List />
            </div>
            }

        </nav>
    )
}
