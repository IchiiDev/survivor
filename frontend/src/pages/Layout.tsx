import { Outlet } from "react-router-dom";
import "./pages.scss"
import Sidenav from "../components/Sidenav"

const Layout = () => {
  function manageNav() {
    const sidenav = document.getElementById("mySidenav");
    const docnav = document.getElementById("main");
    if (sidenav && docnav) {
      if (sidenav.style.width === "250px") {
        sidenav.style.width = "0px";
        docnav.style.marginLeft = "0px";
        sidenav.style.borderRight = "0px solid #9e9a9a";
      } else {
        sidenav.style.width = "250px";
        docnav.style.marginLeft = "250px";
        sidenav.style.borderRight = "2px solid #9e9a9a";
      }
    }
  }
  return (
    <div>
      <Sidenav manageNav={manageNav} />
      <nav className="navbar" role="navigation">
        <img onClick={manageNav} className="navbar-item" src="/assets/icon-menu.svg" alt="menu"/>
      </nav>
      <div id="main">
        <Outlet />
      </div>
    </div>
  )
};

export default Layout;
