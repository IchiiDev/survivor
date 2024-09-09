import React, { useEffect, useState } from "react";
import Titlebox from "../components/Titlebox";
import "./Compatibility.css";

const Compatibility: React.FC = () => {
	const [clients, setClients] = useState<string[]>([]);
	const [firstSelectedClient, setFirstSelectedClient] = useState<string | null>(null);
	const [secondSelectedClient, setSecondSelectedClient] = useState<string | null>(null);
	const [compatibilityValue, setCompatibilityValue] = useState<string | null>(null);
	const [data, setData] = useState<any[]>([]);
	const apiUrlCust = "http://localhost:3001/customers";
	const token = localStorage.getItem("token")

	useEffect(() => {
		const fetchCustomers = async () => {
			try {
			  	const response = await fetch(apiUrlCust, {
					method: "GET",
					headers: {
					  "Content-Type": "application/json",
					  "Authorization": `Bearer ${token}`
					},
				});

			  	if (!response.ok) {
					throw new Error(`Error HTTP: ${response.status}`);
			  	}
				const customersResponse = await response.json();
				const updatedClients = customersResponse.map((customer: { name: string; surname: string }) =>
					`${customer.name} ${customer.surname}`
				);
				setData(customersResponse)
				setClients(updatedClients);
			} catch (error) {
			  console.error("Error on API call", error);
			}
		};
	fetchCustomers();
	}, [apiUrlCust, token]);
	const findAstrologicalSign = (fullName: string | null) => {
		if (!fullName || !data)
			return null;

		const [name, surname] = fullName.split(" ");
		const client = data.find((customer: { name: string; surname: string }) =>
		  customer.name === name && customer.surname === surname
		);

		return client ? client.astrological_sign : null;
	};

	const handleFirstSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setFirstSelectedClient(event.target.value);
	};

	const handleSecondSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSecondSelectedClient(event.target.value);
	};

  	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    	event.preventDefault();
    	if (firstSelectedClient && secondSelectedClient) {
			const firstClientSign = findAstrologicalSign(firstSelectedClient);
			const secondClientSign = findAstrologicalSign(secondSelectedClient);
			const addedZodiacSign = `${firstClientSign} + ${secondClientSign}`;
			fetch("compatibility.json")
    			.then(response => response.json())
    			.then(data => {
    			    if (data.hasOwnProperty(addedZodiacSign)) {
    			        const compatibilityData = data[addedZodiacSign];
    			        if (compatibilityData && compatibilityData.value) {
							setCompatibilityValue(compatibilityData.value.toString());
    			        } else {
    			            console.log("Compatibility data not found for", addedZodiacSign);
    			        }
    			    } else {
    			        console.log("No data found for the combined zodiac sign:", addedZodiacSign);
    			    }
    			})
    			.catch(error => {
    			    console.error("Error fetching or processing the JSON data:", error);
    			});
    	} else {
    	  	console.log("Please select a client in both dropdowns.");
    	}
  	};

  	return (
    	<>
		<Titlebox title="Compatibility"></Titlebox>
      	<form onSubmit={handleSubmit} className="compatibility-form">
      	  	<div className="compatibility-container">
      	    	<div className="select-container">
      	      		<div className="select is-responsive">
      	        		<select onChange={handleFirstSelectChange} value={firstSelectedClient || ""}>
      	          			<option value="" disabled>Select first client</option>
      	          			{clients.map((client, index) => (
      	            			<option key={index} value={client}> {client} </option>
      	          			))}
      	        		</select>
      	      		</div>
      	    	</div>

      	    	<div className="heart-container">
      	      		<img className="heart-image" src="assets/compatibility-heart.png" alt="Heart" />
					<h1 className="compatibility-percentage"> {compatibilityValue ? `${compatibilityValue}%` : null} </h1>
      	    	</div>

      	    	<div className="select-container">
      	      		<div className="select is-responsive">
      	        		<select onChange={handleSecondSelectChange} value={secondSelectedClient || ""}>
      	          			<option value="" disabled>Select second client</option>
      	          				{clients.map((client, index) => (
      	            				<option key={index} value={client}> {client} </option>
      	          				))}
      	        		</select>
      	      		</div>
      	    	</div>
			</div>
      	  		<div className="submit-container">
      	    		<button className="button is-danger submit-button" type="submit"> Submit </button>
      	  		</div>
      	</form>
    	</>
  	);
};

export default Compatibility;
