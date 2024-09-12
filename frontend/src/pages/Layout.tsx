import { Outlet, useNavigate } from "react-router-dom";
import "./pages.scss"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react";

const Layout = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const token = localStorage.getItem("token")
	const navigate = useNavigate();

	useEffect(() => {
	  	const token = localStorage.getItem("token");
	  	const auth = localStorage.getItem("isAuthenticated");

		if (token === null || auth !== "true") {
			navigate("/login");
	  	}
	  	setLoading(false);
	}, [navigate, token]);

	if (loading) {
			return <button className="button is-info is-fullwidth is-loading loading-screen">Loading</button>;
	}

  	return (
    	<div>
      		<Navbar />
      		<div id="main">
        		<Outlet />
      		</div>
    	</div>
  	)
};

export default Layout;
