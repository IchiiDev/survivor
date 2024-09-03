import { Outlet, Link } from "react-router-dom";
import "./pages.scss"

const Layout = () => {
  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="dropdown navigation">
        <div className="navbar-item has-dropdown is-hoverable">
          <div className="navbar-link">
            <img src="https://w7.pngwing.com/pngs/267/362/png-transparent-computer-icons-encapsulated-postscript-others-miscellaneous-button-icon-burger-menu.png" alt="Menu" />
          </div>
          <div className="navbar-dropdown">
            <Link className="navbar-item" to="/">Home</Link>
            <Link className="navbar-item" to="/compatibility">Compatibility</Link>
            <Link className="navbar-item" to="/wardrobe">Wardrobe</Link>
            <Link className="navbar-item" to="/coaches">Coaches</Link>
            <Link className="navbar-item" to="/customers">Customers</Link>
            <Link className="navbar-item" to="/statistics">Statistics</Link>
            <Link className="navbar-item" to="/tips">Tips</Link>
            <Link className="navbar-item" to="/events">Events</Link>
            {/* <hr className="navbar-divider"/>
            <div className="navbar-item">
              Version 0.1.0
            </div> */}
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  )
};

export default Layout;
