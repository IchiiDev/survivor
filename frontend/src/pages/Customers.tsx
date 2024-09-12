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
			console.log(data);
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
					<button className='button is-light'>
						<img className='icon' src="/assets/icon-cloud-arrow.svg" alt='export' />
						<span>Export</span>
					</button>
					<button className='button is-info'>
						<img className='icon' src="/assets/icon-plus.svg" alt='add' />
					</button>
				</div>
			</div>
			<div className="table-container">
				<table className='table table-customers is-light'>
					<thead>
						<tr>
							<th colSpan={6}>
								<div className='param-tab'>
									<div className='param-tab-left'>
										<div className="select is-responsive is-info">
      	        							<select value={"default" || "delete"}>
      	        								<option value="default" disabled>Bulk Action</option>
												<option value="delete">Delete</option>
      	        							</select>
      	      							</div>
										<button className='button is-light' disabled>Apply</button>
									</div>
									<div className='param-tab-right'>
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
							<td className='payment-methods'>
								{[...new Set<string>(payments.filter((payment: { customer_id: any; }) => payment.customer_id === client.id).map((payment: any) => payment.method))].map((method, index) => (
                                    <p key={index}>
										{method === 'PayPal' ? (
											<span className='icon'>
												<img src="/assets/visa.svg" alt="paypal" />
											</span>
										) : method === 'Bank Transfer' ? (
											<span className='icon'>
												<img src="/assets/american-express.svg" alt="bank transfer" />
											</span>
										) : (
											<span className='icon'>
												<img src="/assets/mastercard.svg" alt="credit card" />
											</span>
										)}
									</p>
                                ))}
							</td>
							<td>
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
