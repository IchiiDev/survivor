import React, { useEffect, useState } from "react";
import "./Compatibility.css";

const Compatibility: React.FC = () => {
	const [clients, setClients] = useState<string[]>([]);
	const [firstSelectedClient, setFirstSelectedClient] = useState<string | null>(null);
	const [secondSelectedClient, setSecondSelectedClient] = useState<string | null>(null);
	const [compatibilityValue, setCompatibilityValue] = useState<string | null>(null);
	const [data, setData] = useState<string | null>(null);
	const apiUrlLogin = "http://localhost:3001/customers";
	const token = localStorage.getItem("token")

	const fetchCustomers = async () => {
		try {
		  	const response = await fetch(apiUrlLogin, {
				method: "GET",
				headers: {
				  "Content-Type": "application/json",
				  "Authorization": `Bearer ${token}`
				},
			});

		  	if (!response.ok) {
				throw new Error(`Erreur HTTP: ${response.status}`);
		  	}
			const customersResponse = await response.json();
			const updatedClients = customersResponse.map((customer: { name: string; surname: string }) =>
				`${customer.name} ${customer.surname}`
			);
			setClients(updatedClients);
		} catch (error) {
		  console.error("Erreur lors de l'appel API", error);
		}
	};
	fetchCustomers()

	const handleFirstSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setFirstSelectedClient(event.target.value);
	};

	const handleSecondSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSecondSelectedClient(event.target.value);
	};

  	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    	event.preventDefault();
    	if (firstSelectedClient && secondSelectedClient) {
			const addedZodiacSign = `${firstSelectedClient} + ${secondSelectedClient}`;
    		console.log("First selected client:", firstSelectedClient);
    	  	console.log("Second selected client:", secondSelectedClient);
			console.log("Combined Zodiac Signs:", addedZodiacSign);
			fetch("compatibility.json")
    			.then(response => response.json())
    			.then(data => {
    			    if (data.hasOwnProperty(addedZodiacSign)) {
    			        const compatibilityData = data[addedZodiacSign];
    			        if (compatibilityData && compatibilityData.value) {
							setCompatibilityValue(compatibilityData.value.toString());
    			            console.log(compatibilityValue, "compatibility for", addedZodiacSign);
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
