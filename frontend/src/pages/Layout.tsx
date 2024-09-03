import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li> <Link to="/">Home</Link> </li>
          <li> <Link to="/compatibility">Compatibility</Link> </li>
          <li> <Link to="/wardrobe">Wardrobe</Link> </li>
          <li> <Link to="/coaches">Coaches</Link> </li>
          <li> <Link to="/customers">Customers</Link> </li>
          <li> <Link to="/statistics">Statistics</Link> </li>
          <li> <Link to="/tips">Tips</Link> </li>
          <li> <Link to="/events">Events</Link> </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </>
  )
};

export default Layout;