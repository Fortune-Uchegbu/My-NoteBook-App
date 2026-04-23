import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Footer, Header, Menu } from '../components'
// import { toggleTheme } from "../utils";

const RootLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);
  console.log(menuOpen);

  return (
    <div aria-label="app-wrapper" className="  text-text relative h-dvh overflow-hidden">
      <Menu isOpen = {menuOpen} setIsOpen = {setMenuOpen}/>
      <div 
      aria-label="underlay" 
      className="h-full px-default py-3 grow flex flex-col justify-between"
      onClick={() => {if(menuOpen) setMenuOpen(false)}}>
        <Header setIsOpen = {setMenuOpen} />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
    
  )
}

export default RootLayout