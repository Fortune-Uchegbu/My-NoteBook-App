import { IoArrowBack } from "react-icons/io5";
import { forwardRef } from "react";
import { List } from './'
export const Menu = forwardRef(({isOpen, setIsOpen}, ref) => {
  return (
    <aside>
        <nav 
        id="menu"
        ref = {ref}
        className={`fixed w-4/5 bg-primary h-full py-3 px-default flex flex-col gap-y-2 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0': '-translate-x-full'}`}>
            <button 
            className="md:hidden p-2 w-fit self-end" 
            onClick={() => setIsOpen(false)}>
                <IoArrowBack className="w-6 h-6"/>
            </button>
            <List />
        </nav>
    </aside>
  )
})
