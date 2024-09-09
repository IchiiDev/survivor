import { Outlet, useNavigate } from "react-router-dom";
import "./pages.scss"
import Sidenav from "../components/Sidenav"
import { useEffect, useState } from "react";

const Layout = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [showPopup, setShowPopup] = useState(false);
	const apiUrlMe = "http://localhost:3001/employees/me";
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

	const fetchMe = async (newPassword: string) => {
		try {
			const requestBody = {
				password: newPassword
			};
			const jsonBody = JSON.stringify(requestBody);
			const response = await fetch(apiUrlMe, {
				  method: "PUT",
				  headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				  },
				body: jsonBody,
			});

			if (!response.ok) {
				throw new Error(`Error HTTP: ${response.status}`);
			}
		} catch (error) {
			console.error("Error in API call", error);
		}
	};

	const handleLogout = () => {
		localStorage.setItem("isAuthenticated", "false");
		navigate("/login");
  	};

	const handleSetting = () => {
		  setShowPopup(true);
	};

    const handleClosePopup = (event: React.MouseEvent<HTMLButtonElement>) => {
        const inputElement = document.getElementById("password-input") as HTMLInputElement;
        if (inputElement) {
            const newPassword = inputElement.value;
			fetchMe(newPassword);
            console.log("Nouveau mot de passe :", newPassword);
        }
        setShowPopup(false);
    };

	if (loading) {
			return <button className="button is-info is-fullwidth is-loading loading-screen">Loading</button>;
	}

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
      		<Sidenav manageNav={manageNav} />
			<div>
				<img onClick={manageNav} className="navbar-item menu-button" src="/assets/icon-menu.svg" alt="menu"/>
				<button onClick={handleSetting} className="button is-light setting" >
					<img src="assets/setting-icon.svg" alt="Settings" style={{ width: '100%', height: '100%' }} />
				</button>x
				{showPopup && (
                	<div className="popup">
                	    <div className="popup-inner">
                	        <h2>New Password:</h2>
                	        <input type="password" id="password-input" placeholder="Enter new password"/>
                	        <button onClick={handleClosePopup}>Submit</button>
                	    </div>
                	</div>
           		)}
				<button onClick={handleLogout} className="button is-danger logout" > Logout </button>
			</div>
      		<div id="main">
        		<Outlet />
      		</div>
    	</div>
  	)
};

export default Layout;
