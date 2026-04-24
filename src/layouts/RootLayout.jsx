import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Footer, Header, Menu } from '../components'
// import { toggleTheme } from "../utils";

const RootLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const handleEscape = (e) => (e.key === 'Escape') && setMenuOpen(false);

    const header = document.getElementsByTagName('header')[0];
    const main = document.getElementsByTagName('main')[0];
    const footer = document.getElementsByTagName('footer')[0];

    // focus the first elem - the return button, but only after the dom is fully updated
    const timer = setTimeout(() => {
      const firstElem = menuRef.current?.querySelector('button');
      firstElem?.focus();
    }, 0);

    if (menuOpen) {
      document.body.style.overflow = 'hidden'; // prevent background scrolling while hidden
      
      //let assistive tech know that it's not to be read 
      header.inert = true;
      main.inert = true; 
      footer.inert = true; 
      
      //handle escape key      
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'unset';
      header.inert = false;
      main.inert = false; 
      footer.inert = false; 
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      clearTimeout(timer)
    }
  }, [menuOpen]);

  return (
    <div aria-label="app-wrapper" className="  text-text relative h-dvh overflow-hidden">
      <Menu isOpen = {menuOpen} setIsOpen = {setMenuOpen} ref={menuRef} />
      <div 
      aria-label="underlay"
      id="underlay" 
      className="h-full py-3 grow flex flex-col justify-between"
      onClick={() => {if(menuOpen) setMenuOpen(false)}}>
        <Header setIsOpen = {setMenuOpen} />
        <main className="px-default">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
    
  )
}

export default RootLayout