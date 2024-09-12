import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.scss";

const Navbar = () => {
	const [showPopup, setShowPopup] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const apiUrlMe = "http://localhost:3001/me";
	const token = localStorage.getItem("token")
	const navigate = useNavigate();
	const location = useLocation()

	const isActive = (path: string) => {
		return location.pathname === path ? "active" : "";
	};

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

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

			if (response.status === 422) {
				alert("Need minimum 8 characters, 1 upcase, 1 lowcase, 1 number and 1 special");
				return;
			}

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

    const handleSubmitPopup = (event: React.MouseEvent<HTMLButtonElement>) => {
        const inputElement = document.getElementById("password-input") as HTMLInputElement;
        if (inputElement) {
            const newPassword = inputElement.value;
			fetchMe(newPassword);
            console.log("New password :", newPassword);
        }
        setShowPopup(false);
    };

	const handleClosePopup = (event: React.MouseEvent<HTMLButtonElement>) => {
		setShowPopup(false);
	}

	const logoRedirect = () => {
		navigate("/");
  	};

  return (
    <nav className="navbar">
  	<div className="navbar-left">
    	<img onClick={logoRedirect} className="navbar-item menu-button" src="/assets/soul-connection-title-logo.png" alt="menu" />
  	</div>

  	<ul className="navbar-center">
    	<li >
    	  	<Link to="/" className={isActive("/")}>
    	  		<img className="Link-icon" src="/assets/icon-home.svg" alt="home" />
    	  		Home
    	  	</Link>
    	</li>
    	<li>
    	  	<Link to={"/compatibility"} className={isActive("/compatibility")}>
    	  	  	<img className="Link-icon" src="/assets/icon-heart.svg" alt="compatibility" />
    	  	  	Compatibility
    	  	</Link>
    	</li>
    	<li >
    	  	<Link to={"/wardrobe"} className={isActive("/wardrobe")}>
    	  		<img className="Link-icon" src="/assets/icon-dress.svg" alt="wardrobe" />
    	  		Wardrobe
    	  	</Link>
    	</li>
    	<li >
    	  	<Link to={"/coaches"} className={isActive("/coaches")}>
    	  		<img className="Link-icon" src="/assets/icon-customer-service.svg" alt="coaches" />
    	  		Coaches
    	  	</Link>
    	</li>
    	<li >
    	  	<Link to={"/customers"} className={isActive("/customers")}>
    	  		<img className="Link-icon" src="/assets/icon-character.svg" alt="customers" />
    	  		Customers
    	  	</Link>
    	</li>
    	<li >
    	  	<Link to={"/statistics"} className={isActive("/statistics")}>
    	  		<img className="Link-icon" src="/assets/icon-stats.svg" alt="statistics" />
    	  		Statistics
    	  	</Link>
    	</li>
    	<li >
    	  	<Link to={"/tips"} className={isActive("/tips")}>
    	  		<img className="Link-icon" src="/assets/icon-light-bulb.svg" alt="tips" />
    	  		Tips
    	  	</Link>
    	</li>
    	<li >
    	  	<Link to={"/events"} className={isActive("/events")}>
    	  	  	<img className="Link-icon" src="/assets/icon-events.svg" alt="events" />
    	  	  	Events
    	  	</Link>
    	</li>
    	<li >
    	  	<Link to={"/document"} className={isActive("/document")}>
    	    	<img className="Link-icon" src="/assets/icon-document.svg" alt="document" />
    	    	Document
			</Link>
    	</li>
  	</ul>

  	<div className="navbar-right">
	  	<button>
			<img className="Link-icon move-icon" src="/assets/chat-icon.svg" alt="chat"/>
		</button>
		<button>
			<img className="Link-icon move-icon" src="/assets/usa-flag.png" alt="flag"/>
		</button>
		<div className="dropdown">
        	<button onClick={toggleDropdown} className="character-dropdown">
            	<img className="Link-icon" src="/assets/icon-character.svg" alt="profile"/>
          	</button>
          	{showDropdown && (
            <div className="dropdown-menu">
            	<button onClick={handleSetting} className="dropdown-item is-dark">
                Settings
              	</button>
              	<button onClick={handleLogout} className="dropdown-item is-danger">
                Logout
              	</button>
            </div>
          	)}
        </div>
  	</div>

  	{showPopup && (
    <div className="popup">
      	<div className="popup-inner">
        	<h2>New Password:</h2>
        	<input type="password" id="password-input" placeholder="Enter new password" />
        	<div className="popup-button">
				<button onClick={handleClosePopup} style={{color: "red"}}>Cancel</button>
				<button onClick={handleSubmitPopup} style={{color: "green"}}>Submit</button>
        	</div>
      	</div>
    </div>
  	)}
	</nav>
	);
};

export default Navbar;
