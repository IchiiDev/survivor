import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Titlebox from "../components/Titlebox"
import "./Stats.scss";

const Home = () => {
	const [totalClients, setTotalClients] = useState<number>(0);
	const [totalCoaches, setTotalCoaches] = useState<number>(0);
	const apiUrlCust = "http://localhost:3001/customers";
	const apiUrlCoaches = "http://localhost:3001/employees";
	const token = localStorage.getItem("token")
	const navigate = useNavigate();

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
					navigate("/login");
					throw new Error(`Error HTTP: ${response.status}`);
				}

				const customersResponse = await response.json();
				const total = customersResponse.length;
				setTotalClients(total);
		  	} catch (error) {
			console.error("Error in API call", error);
		  	}
		};

		const fetchCoaches = async () => {
			try {
				const response = await fetch(apiUrlCoaches, {
			  		method: "GET",
			  		headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
			  		},
				});

				if (!response.ok) {
					navigate("/login");
					throw new Error(`Error HTTP: ${response.status}`);
				}

				const coachesResponse = await response.json();
				const totalCoach = coachesResponse.length;
				setTotalCoaches(totalCoach);
		  	} catch (error) {
			console.error("Error in API call", error);
		  	}
		};
	fetchCustomers();
	fetchCoaches();
	}, [apiUrlCust, apiUrlCoaches, navigate, token]);
    return (
    	<>
		<Titlebox title=""></Titlebox>
      	<div className="container">
        	<div className="box centered-box">
          		<h3 className="title is-4 dark-text">Customers</h3>
          		<h3 className="subtitle is-2 dark-text">{totalClients}</h3>
        	</div>
        	<div className="box centered-box">
          		<h3 className="title is-4 dark-text">Coaches</h3>
          		<h3 className="subtitle is-2 dark-text">{totalCoaches}</h3>
        	</div>
        	<div className="box centered-box">
          		<h3 className="title is-4 dark-text">Events</h3>
          		<h3 className="subtitle is-2 dark-text">126</h3>
        	</div>
      </div>

      <div className="table-container">
        	<table className="table custom-table-stats">
          		<thead>
            		<tr>
              			<th>Name</th>
              			<th>Date</th>
              			<th>Duration</th>
              			<th>Max Participants</th>
            		</tr>
          		</thead>
          		<tbody>
            		<tr>
              			<td>Event 1</td>
              			<td>2024-09-05</td>
              			<td>2 hours</td>
              			<td>100</td>
            		</tr>
            		<tr>
              			<td>Event 2</td>
              			<td>2024-09-10</td>
              			<td>3 hours</td>
              			<td>50</td>
            		</tr>
            		<tr>
              			<td>Event 3</td>
              			<td>2024-09-15</td>
              			<td>1.5 hours</td>
              			<td>200</td>
            		</tr>
          		</tbody>
        	</table>
      	</div>
      	</>
    )
  };

export default Home;
