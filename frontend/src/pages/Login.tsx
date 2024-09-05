import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login: React.FC = () => {
  	const [username, setUsername] = useState("");
  	const [password, setPassword] = useState("");
  	const navigate = useNavigate();

  	const handleLogin = (event: React.FormEvent) => {
    	event.preventDefault();

    	if (username === "oui" && password === "non") {
    	    localStorage.setItem("isAuthenticated", "true");
    	    navigate("/");
    	} else {
    		alert("Wrong login");
    	}
  	};

  	return (
    	<div className="login-page">
    		<form onSubmit={handleLogin} className="login-form">
    	    	<h2>Connection</h2>
    	    	<input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
    	    	<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
    	    	<button type="submit">Sign In</button>
    	  	</form>
    	</div>
  	);
};

export default Login;
