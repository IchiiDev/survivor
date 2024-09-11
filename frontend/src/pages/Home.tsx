import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Stats.scss";

const Home = () => {
	const [totalClients, setTotalClients] = useState<number>(0);
	const [totalCoaches, setTotalCoaches] = useState<number>(0);
	const [totalEvent, setTotalEvent] = useState<number>(0);
	const [events, setEvents] = useState<any[]>([]);
	const apiUrlCust = "http://localhost:3001/customers";
	const apiUrlCoaches = "http://localhost:3001/employees";
	const apiUrlEvent = "http://localhost:3001/events";
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
					throw new Error(`Error HTTP: ${response.status}`);
				}

				const coachesResponse = await response.json();
				const totalCoach = coachesResponse.length;
				setTotalCoaches(totalCoach);
		  	} catch (error) {
			console.error("Error in API call", error);
		  	}
		};
		const fetchEvents = async () => {
			try {
				const response = await fetch(apiUrlEvent, {
			  		method: "GET",
			  		headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
			  		},
				});

				if (!response.ok) {
					throw new Error(`Error HTTP: ${response.status}`);
				}

				const eventResponse = await response.json();
				const totalEvent = eventResponse.length;

				const sortedEvents = eventResponse.sort(
					(a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
				);

				const lastFiveEvents = sortedEvents.slice(0, 5);

				setEvents(lastFiveEvents);
				setTotalEvent(totalEvent);
		  	} catch (error) {
			console.error("Error in API call", error);
		  	}
		}
	fetchCustomers();
	fetchCoaches();
	fetchEvents();
	}, [apiUrlCust, apiUrlCoaches, apiUrlEvent, navigate, token]);
    return (
    	<>
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
          		<h3 className="subtitle is-2 dark-text">{totalEvent}</h3>
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
            		{events.map((event) => (
              			<tr key={event.id}>
							<td>{event.name}</td>
							<td>{new Date(event.date).toISOString().split('T')[0]}</td>
							<td>{event.location_name}</td>
							<td>{event.max_participants}</td>
						</tr>
            		))}
          		</tbody>
        	</table>
      	</div>
      	</>
    )
  };

export default Home;
