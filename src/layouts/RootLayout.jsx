import { Outlet } from "react-router-dom";
// import { toggleTheme } from "../utils";

const RootLayout = () => {
  return (
    <>
    <MobileMenu />
    <Hero />
    <Outlet />
    <Footer />
    </>
  )
}

export default RootLayout