import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login: React.FC = () => {
  	const [email, setEmail] = useState("");
  	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState<boolean>(false);
	const apiUrlLogin = "http://localhost:3001/login";
  	const navigate = useNavigate();

	useEffect(() => {
		localStorage.removeItem("token");
	});

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
				throw new Error(`Error HTTP: ${response.status}`);
		  	}
			const rawResponse = await response.json();
			localStorage.setItem("token", rawResponse.token);

		} catch (error) {
		  console.error("Error on API call", error);
		}
	};

	const handleLogin = async (event: React.FormEvent) => {
    	event.preventDefault();
		setLoading(true);

		try {
			await fetchData();

			const token = localStorage.getItem("token");

			if (token) {
				localStorage.setItem("isAuthenticated", "true");
				navigate("/");
			} else {
				alert("Wrong login");
			}
		} catch (error) {
			alert("An error occurred during login");
		} finally {
			setLoading(false);
		}
    };

	if (loading) {
		return <button className="button is-info is-fullwidth is-loading loading-screen">Loading</button>;
	}
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
