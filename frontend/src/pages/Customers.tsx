import { useState, useEffect } from 'react';
import './Customers.scss';
import { Link } from "react-router-dom";

const Customers = () => {
	const [clients, setClients] = useState([]);
	const [payments, setPayments] = useState<any>([]);

	const fetchCustomers = async () => {
		try {
		  	const response = await fetch("http://localhost:3001/customers", {
				method: "GET",
				headers: {
				  "Content-Type": "application/json",
				  "Authorization": `Bearer ${localStorage.getItem("token")}`
				},
			});
		  	if (!response.ok) {
				throw new Error(`Erreur HTTP: ${response.status}`);
		  	}
			const data = await response.json();
			setClients(data);
		} catch (error) {
		  console.error("Erreur lors de l'appel API", error);
		}
	};

	const fetchPayements = async () => {
		try {
		  	const response = await fetch("http://localhost:3001/payments", {
				method: "GET",
				headers: {
				  "Content-Type": "application/json",
				  "Authorization": `Bearer ${localStorage.getItem("token")}`
				},
			});
		  	if (!response.ok) {
				throw new Error(`Erreur HTTP: ${response.status}`);
		  	}
			const data = await response.json();
			setPayments(data);
		} catch (error) {
		  console.error("Erreur lors de l'appel API", error);
		}
	};

	useEffect(() => {
		fetchCustomers();
		fetchPayements();
	}, []);

    return (
    	<>
			<div className='title-line'>
				<div className='title-left'>
					<h1 className='title'>Customers List</h1>
					<p className='basic-text-color'>You have total {clients.length} customers.</p>
				</div>
				<div className='title-right'>
					<button className='btn btn-primary'>Add new customer</button>
				</div>
			</div>
			<div className="table-container">
				<table className='table table-customers is-light'>
					<thead>
						<tr>
							<th colSpan={6}>
								<div className='param-tab'>
									<div className="select is-responsive is-info">
      	        						<select value={"default" || "delete"}>
      	        							<option value="default" disabled>Bulk Action</option>
											<option value="delete">Delete</option>
      	        						</select>
      	      						</div>
									<button className='button is-light' disabled>Apply</button>
									<span className='icon'>
										<img src="/assets/icon-search.svg" alt='search' />
									</span>
									<div className='vertical-bar'></div>
									<span className='icon'>
										<img src="/assets/icon-menu-alt.svg" alt='filter' />
									</span>
									<span className='icon'>
										<img src="/assets/icon-settings.svg" alt='settings' />
									</span>
								</div>
							</th>
						</tr>
						<tr>
							<th>
                        	    <input type="checkbox" className='checkbox' />
                        	</th>
							<th>Customer</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Payment Methods</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{clients.map((client: any) => (
						<tr key={client.id}>
							<td>
								<input type="checkbox" className='checkbox' />
							</td>
							<td>
								<Link to={`/customers/${client.id}`}>
								{client.name} {client.surname}
								</Link>
							</td>
							<td>{client.email}</td>
							<td>{client.phone}</td>
							<td>
								{payments.length > 0 && (
									<>
									{/* {payments[client.id].paymentHistory.map((payment: any) => (
										<p key={payment.id}>{payment.method} </p>
									))} */}
									oui
									</>
								)}
							</td>
							<td className='icon-column'>
								<span className='icon'>
									<img src="/assets/icon-points.svg" alt="three points" />
								</span>
							</td>
						</tr>
						))}
					</tbody>
				</table>
			</div>
      	</>
    )
  };

export default Customers;

	// const fetchEncounters = async (clientId: string) => {
	// 	try {
	// 	  	const response = await fetch("http://localhost:3001/encounters/" + clientId + "?isCustomer=true", {
	// 			method: "GET",
	// 			headers: {
	// 			  "Content-Type": "application/json",
	// 			  "Authorization": `Bearer ${localStorage.getItem("token")}`
	// 			},
	// 		});
	// 	  	if (!response.ok) {
	// 			throw new Error(`Erreur HTTP: ${response.status}`);
	// 	  	}
	// 		const data = await response.json();
	// 		console.log(data);
	// 		setEncounters(data);
	// 	} catch (error) {
	// 	  console.error("Erreur lors de l'appel API", error);
	// 	}
	// };

	// const fetchPayements = async (clientId: string) => {
	// 	try {
	// 	  	const response = await fetch("http://localhost:3001/customers/" + clientId + "?includePaymentsHistory", {
	// 			method: "GET",
	// 			headers: {
	// 			  "Content-Type": "application/json",
	// 			  "Authorization": `Bearer ${localStorage.getItem("token")}`
	// 			},
	// 		});
	// 	  	if (!response.ok) {
	// 			throw new Error(`Erreur HTTP: ${response.status}`);
	// 	  	}
	// 		const data = await response.json();
	// 		console.log(data);
	// 		setPayments(data);
	// 	} catch (error) {
	// 	  console.error("Erreur lors de l'appel API", error);
	// 	}
	// };

	// const fetchImageCustomer = async (client: any) => {
	// 	try {
	// 		const urlpath = "http://localhost:3001/images/" + client.image;
	// 	  	const response = await fetch(urlpath, {
	// 			method: "GET",
	// 			headers: {
	// 			  "Authorization": `Bearer ${localStorage.getItem("token")}`
	// 			},
	// 		});
	// 	  	if (!response.ok) {
	// 			throw new Error(`Erreur HTTP: ${response.status}`);
	// 	  	}
	// 		const blob = await response.blob();
	// 		const imageUrl = URL.createObjectURL(blob);
	// 		setClientImg(imageUrl);
	// 	} catch (error) {
	// 	  console.error("Erreur lors de l'appel API", error);
	// 	}
	// };

	// const formatDate = (dateString: string) => {
    //     const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    //     return new Intl.DateTimeFormat('fr-FR', options).format(new Date(dateString));
    // };

{/* <div className="client-img">
					{selectedClient && (
						<img src={clientImg} alt="client" />
					)}
				</div> */}

// {selectedClient && (
// 	<ul>
// 		<li>
// 			<p className='basic-text-color'>Name: {selectedClient.name}</p>
// 		</li>
// 		<li>
// 			<p className='basic-text-color'>Birth Date: {selectedClient.birthdate}</p>
// 		</li>
// 		<li>
// 			<p className='basic-text-color'>Phone number: {selectedClient.phone}</p>
// 		</li>
// 		<li>
// 			<p className='basic-text-color'>Adress: {selectedClient.address}</p>
// 		</li>
// 		<li>
// 			<p className='basic-text-color'>Description: {selectedClient.description}</p>
// 		</li>
// 	</ul>
// 	)}

// {selectedClient && (
// 	<>
// 	<div className='info-encounters'>
// 		<h2 className='basic-text-color'>Meetings</h2>
// 		<div className="table-container">
// 			<table className='table table-customer-info'>
// 				<thead>
// 					<tr>
// 						<th>Date</th>
// 						<th>Rating</th>
// 						<th>Comment</th>
// 						<th>Method</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{encounters.map((encounter: any) => (
// 					<tr key={encounter.id}>
// 						<td>{formatDate(encounter.date)}</td>
// 						<td>{encounter.rating}</td>
// 						<td>{encounter.comment}</td>
// 						<td>{encounter.source}</td>
// 					</tr>
// 					))}
// 				</tbody>
// 			</table>
// 		</div>
// 	</div>
// 	<div className='info-payements'>
// 		<h4 className='basic-text-color'>Payments History</h4>
// 		<div className="table-container">
// 			<table className='table table-customer-info'>
// 				<thead>
// 					<tr>
// 						<th>Date</th>
// 						<th>Amount</th>
// 						<th>Comment</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{payments.paymentHistory.map((payment: any) => (
// 					<tr key={payment.id}>
// 						<td>{formatDate(payment.date)}</td>
// 						<td>{payment.amount}</td>
// 						<td>{payment.comment}</td>
// 					</tr>
// 					))}
// 				</tbody>
// 			</table>
// 		</div>
// 	</div>
// 	</>
// )}