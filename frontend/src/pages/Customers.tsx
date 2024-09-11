import { useState, useEffect } from 'react';
import './Customers.scss';

const Customers = () => {
	const [clients, setClients] = useState([]);
	const [selectedClient, setSelectedClient] = useState<any | null>(null);
	const [clientImg, setClientImg] = useState<string>("/assets/icon-character.svg");

	const [encounters, setEncounters] = useState([]);
	const [payments, setPayments] = useState<any>({paymentHistory: []});

	const handleClientChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
		const clientId = event.target.value;
		const client = clients.find((c: any) => c.id.toString() === clientId);
		console.log(client);
        await setSelectedClient(client);
		if (client)
			await fetchEncounters(clientId);
			await fetchImageCustomer(client);
			await fetchPayements(clientId);
	}

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

	const fetchImageCustomer = async (client: any) => {
		try {
			const urlpath = "http://localhost:3001/images/" + client.image;
		  	const response = await fetch(urlpath, {
				method: "GET",
				headers: {
				  "Authorization": `Bearer ${localStorage.getItem("token")}`
				},
			});
		  	if (!response.ok) {
				throw new Error(`Erreur HTTP: ${response.status}`);
		  	}
			const blob = await response.blob();
			const imageUrl = URL.createObjectURL(blob);
			setClientImg(imageUrl);
		} catch (error) {
		  console.error("Erreur lors de l'appel API", error);
		}
	};

	const fetchEncounters = async (clientId: string) => {
		try {
		  	const response = await fetch("http://localhost:3001/encounters/" + clientId + "?isCustomer=true", {
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
			setEncounters(data);
		} catch (error) {
		  console.error("Erreur lors de l'appel API", error);
		}
	};

	const fetchPayements = async (clientId: string) => {
		try {
		  	const response = await fetch("http://localhost:3001/customers/" + clientId + "?includePaymentsHistory", {
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

	const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Intl.DateTimeFormat('fr-FR', options).format(new Date(dateString));
    };

	useEffect(() => {
		fetchCustomers();
	}, []);

    return (
    	<>
			<div className='info-client'>
				<div className='basic-info-client'>
					<div className='upper-info'>
						<div className="select is-responsive">
      	    				<select onChange={handleClientChange} value={selectedClient?.id || ""}>
      	    					<option value="" disabled>Select client</option>
      	    					{clients.map((client: any) => (
								<option key={client.id} value={client.id}>
      	    			  			{client.name} {client.surname}
      	    					</option>
      	    					))}
      	    				</select>
      	    			</div>
					</div>
					<div className='lower-info'>
						{selectedClient && (
						<ul>
							<li>
								<p className='basic-text-color'>Name: {selectedClient.name}</p>
							</li>
							<li>
								<p className='basic-text-color'>Birth Date: {selectedClient.birthdate}</p>
							</li>
							<li>
								<p className='basic-text-color'>Phone number: {selectedClient.phone}</p>
							</li>
							<li>
								<p className='basic-text-color'>Adress: {selectedClient.address}</p>
							</li>
							<li>
								<p className='basic-text-color'>Description: {selectedClient.description}</p>
							</li>
						</ul>
						)}
					</div>
				</div>
				<div className="client-img">
					{selectedClient && (
						<img src={clientImg} alt="client" />
					)}
				</div>
			</div>
			<hr className='fixed-hr'/>
			<div className='info-tab'>
				{selectedClient && (
					<>
					<div className='info-encounters'>
						<h2 className='basic-text-color'>Meetings</h2>
						<div className="table-container">
							<table className='table table-customer-info'>
								<thead>
									<tr>
										<th>Date</th>
										<th>Rating</th>
										<th>Comment</th>
										<th>Method</th>
									</tr>
								</thead>
								<tbody>
									{encounters.map((encounter: any) => (
									<tr key={encounter.id}>
										<td>{formatDate(encounter.date)}</td>
										<td>{encounter.rating}</td>
										<td>{encounter.comment}</td>
										<td>{encounter.source}</td>
									</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					<div className='info-payements'>
						<h4 className='basic-text-color'>Payments History</h4>
						<div className="table-container">
							<table className='table table-customer-info'>
								<thead>
									<tr>
										<th>Date</th>
										<th>Amount</th>
										<th>Comment</th>
									</tr>
								</thead>
								<tbody>
									{payments.paymentHistory.map((payment: any) => (
									<tr key={payment.id}>
										<td>{formatDate(payment.date)}</td>
										<td>{payment.amount}</td>
										<td>{payment.comment}</td>
									</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					</>
				)}
			</div>
      	</>
    )
  };

export default Customers;
