import { Outlet } from "react-router-dom";
import { useEffect, useRef, useContext } from "react";
import { Footer, Header, Menu } from '../components';
import { NoteContext } from "../contexts/NoteContext";
import DarkLayer from "../components/DarkLayer";


const RootLayout = () => {
  // context
  const {menuOpen, setMenuOpen, windowSize, setWindowSize, noteList} = useContext(NoteContext);

  // window resize
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
  const mobile = windowSize.width < 1024;

  // accessibility
  const menuRef = useRef(null); //to track menu component
  const handleEscape = (e) => (e.key === 'Escape') && setMenuOpen(false);
  useEffect(() => {
    const header = document.getElementsByTagName('header')[0];
    const main = document.getElementsByTagName('main')[0];
    const footer = document.getElementsByTagName('footer')[0];
    // focus the menu first elem - return button only after dom is fully updated. 
    const timer = setTimeout(() => {
      const firstElem = menuRef.current?.querySelector('button');
      firstElem?.focus();
    }, 0);
    // prevent background scrolling while hidden
    if (menuOpen) {
      document.body.style.overflow = 'hidden'; 
      //also let assistive tech know that it's not to be read 
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
  const outLetClass = "px-default grow w-full";

  return (
      <div aria-label="app-wrapper" className="w-full max-w-360 mx-auto text-text relative h-dvh overflow-hidden">
        {mobile && 
        <Menu
        ref={menuRef} 
        mobile={mobile} />}
        <DarkLayer 
        mobile={mobile} />
        <div 
        aria-label="underlay"
        id="underlay"
        className={`h-full py-2 lg:py-0 grow flex flex-col justify-between `}>
          <Header />
          <main className="lg:px-0 grow lg:flex">
            {!mobile && 
            <Menu 
            ref={menuRef} 
            mobile={mobile} />}
            <Outlet 
            context={{noteList, mobile, outLetClass}}/>
          </main>
          <Footer />
        </div>
      </div>
    
  )
}

export default RootLayout