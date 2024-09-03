import { Outlet, Link } from "react-router-dom";
import "./pages.scss"

const Layout = () => {
  function manageNav() {
    const sidenav = document.getElementById("mySidenav");
    const docnav = document.getElementById("main");
    if (sidenav && docnav) {
      if (sidenav.style.width === "250px") {
        sidenav.style.width = "0px";
        docnav.style.marginLeft = "0px";
      } else {
        sidenav.style.width = "250px";
        docnav.style.marginLeft = "250px";
      }
    }
  }
  return (
    <div>
      <div id="mySidenav" className="sidenav">
        <Link onClick={manageNav} to="/">Home</Link>
        <Link onClick={manageNav} to="/compatibility">Compatibility</Link>
        <Link onClick={manageNav} to="/wardrobe">Wardrobe</Link>
        <Link onClick={manageNav} to="/coaches">Coaches</Link>
        <Link onClick={manageNav} to="/customers">Customers</Link>
        <Link onClick={manageNav} to="/statistics">Statistics</Link>
        <Link onClick={manageNav} to="/tips">Tips</Link>
        <Link onClick={manageNav} to="/events">Events</Link>
      </div>
      <nav className="navbar" role="navigation">
        <img className="navbar-item" onClick={manageNav} src="https://w7.pngwing.com/pngs/267/362/png-transparent-computer-icons-encapsulated-postscript-others-miscellaneous-button-icon-burger-menu.png" alt="Menu"></img>
      </nav>
      <div id="main">
        <Outlet />
      </div>
    </div>
  )
};

export default Layout;
