import { Outlet, Navigate, useNavigate } from "react-router-dom";
import "./pages.scss"
import Sidenav from "../components/Sidenav"
import { useEffect, useState } from "react";

const Layout = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const auth = localStorage.getItem("isAuthenticated");
		setIsAuthenticated(auth === "true");
		setLoading(false)
	}, []);

	const handleLogout = () => {
		localStorage.setItem('isAuthenticated', 'false');
		navigate('/login');
  	};

	if (loading) {
			return <button className="button is-info is-fullwidth is-loading loading-screen">Loading</button>;
	}
	if (isAuthenticated === false) {
		return <Navigate to="/login" />;
	}

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
				<button onClick={handleLogout} className="button is-danger logout" > Logout </button>
      		</nav>
      		<div id="main">
        		<Outlet />
      		</div>
    	</div>
  	)
};

export default Layout;
