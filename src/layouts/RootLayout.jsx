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
    }
  }, [menuOpen]);
  const outLetClass = "px-default grow min-w-0 h-full w-full";

  return (
    // refactor in progress ⛑⛑
    <div aria-label="app-wrapper" 
    className="w-full h-dvh max-w-360 mx-auto text-text grid 
    grid-cols-1 grid-rows-[auto_1fr_auto] 
    lg:grid-cols-[25%_1fr] lg:[grid-template-areas:'header_header''aside_main''footer_footer']">
      <DarkLayer 
      mobile={mobile} />
      <Header classes='lg:[grid-area:header] col-span-1' />
      <aside 
      className= {`fixed w-4/5 z-100 inset-y-0 left-0 py-3 px-default transition-transform duration-300 ease-in-out 
      lg:[grid-area:aside] lg:translate-x-0 lg:static lg:z-0 lg:h-full lg:px-0 lg:py-0
      ${!menuOpen ? '-translate-x-full ' : 'translate-x-0'} 
      flex flex-col gap-y-2 bg-surface`}>
        <Menu
        ref={menuRef} 
        mobile={mobile} />
      </aside>
      <main className="col-span-1 lg:[grid-area:main] w-full lg:px-0 lg:flex h-full overflow-y-scroll">
        <Outlet 
        context={{noteList, mobile, outLetClass}}/>
      </main>
      <Footer />
    </div>
    
  )
}

export default RootLayout