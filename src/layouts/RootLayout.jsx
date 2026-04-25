import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Footer, Header, Menu } from '../components';
import DarkLayer from "../components/DarkLayer";
// import { toggleTheme } from "../utils";

const RootLayout = () => {
  // states
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [noteList, setNoteList] = useState([]);
  const mobile = windowSize.width < 1024;
  const handleEscape = (e) => (e.key === 'Escape') && setMenuOpen(false);
  // accessibility
  useEffect(() => {
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
      if (mobile) {
        header.inert = true;
        main.inert = true; 
        footer.inert = true;
      } 
      //handle escape key      
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'unset';
      if(mobile) {
        header.inert = false;
        main.inert = false; 
        footer.inert = false; 
      }
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      clearTimeout(timer)
    }
  }, [menuOpen]);
  // window resize listener
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    // Clean up listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const outLetClass = "px-default py-2";

  return (
    <div aria-label="app-wrapper" className="w-full max-w-360 mx-auto text-text relative h-dvh overflow-hidden">
      {mobile && <Menu isOpen = {menuOpen} setIsOpen = {setMenuOpen} ref={menuRef} mobile={mobile} />}
      <DarkLayer isOpen={menuOpen} setIsOpen={setMenuOpen} mobile={mobile} />
      <div 
      aria-label="underlay"
      id="underlay"
      className={`h-full py-2 lg:py-0 grow flex flex-col justify-between `}
      >
        <Header setIsOpen = {setMenuOpen} />
        <main className="px-default lg:px-0 grow lg:flex ">
          {!mobile && <Menu isOpen = {menuOpen} setIsOpen = {setMenuOpen} ref={menuRef} mobile={mobile} />}
          <Outlet 
          context={{noteList, mobile, outLetClass}}
          />
        </main>
        <Footer />
      </div>
    </div>
    
  )
}

export default RootLayout