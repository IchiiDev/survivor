import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login: React.FC = () => {
  	const [email, setEmail] = useState("");
  	const [password, setPassword] = useState("");
	const apiUrlLogin = "http://localhost:3001/login";
  	const navigate = useNavigate();

	const fetchData = async () => {
		try {
			const requestBody = {
				email: email,
				password: password
			};
			const jsonBody = JSON.stringify(requestBody);
		  	const response = await fetch(apiUrlLogin, {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				},
				body: jsonBody,
			});

		  	if (!response.ok) {
				throw new Error(`Erreur HTTP: ${response.status}`);
		  	}
			const rawResponse = await response.json();
			localStorage.setItem("token", rawResponse.token);
		} catch (error) {
		  console.error("Erreur lors de l'appel API", error);
		}
	};

  	const handleLogin = (event: React.FormEvent) => {
    	event.preventDefault();
		fetchData();
		if (email === "salutc.moi@gmail.com" && password === "naouLeA82oeirn!") {
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
    	    	<input type="text" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)}/>
    	    	<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
    	    	<button type="submit">Sign In</button>
    	  	</form>
    	</div>
  	);
};

export default Login;
