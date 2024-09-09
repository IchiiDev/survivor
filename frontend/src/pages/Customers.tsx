import { useState, useEffect } from 'react';
import './Customers.scss';
import Titlebox from "../components/Titlebox";

const Customers = () => {
	const [clients, setClients] = useState([]);
	const [selectedClient, setSelectedClient] = useState<any | null>(null);
	const [clientImg, setClientImg] = useState<string>("/assets/icon-character.svg");

	const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const clientId = event.target.value;
		const client = clients.find((c: any) => c.id.toString() === clientId);
		console.log(client);
        setSelectedClient(client);
		// if (client)
			// fetchImageCustomer(clientId);
	}

	const fetchImageCustomer = async (clientId: string) => {
		try {
			const urlpath = "http://localhost:3001/customers/" + clientId + "/image";
		  	const response = await fetch(urlpath, {
				method: "GET",
				headers: {
				  "Content-Type": "application/json",
				  "Authorization": `Bearer ${localStorage.getItem("token")}`
				},
			});
			console.log(clientId);
		  	if (!response.ok) {
				throw new Error(`Erreur HTTP: ${response.status}`);
		  	}
			const data = await response.json();
			console.log(data);
			setClientImg(data);
		} catch (error) {
		  console.error("Erreur lors de l'appel API", error);
		}
	};

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
			console.log(data);
			setClients(data);
		} catch (error) {
		  console.error("Erreur lors de l'appel API", error);
		}
	};

	useEffect(() => {
		fetchCustomers();
	}, []);

    return (
    	<>
			<Titlebox title="Customers"></Titlebox>
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
					<div className='info-meetings'>
						<div className="table-container">
							<table className='table'>
								<thead>
									<tr>
										<th>Date</th>
										<th>Rating</th>
										<th>Comment</th>
										<th>Method</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
					</div>
					<div className='info-payements'>
						<div className="table-container">
							<table className='table'>
								<thead>
									<tr>
										<th>Date</th>
										<th>Amount</th>
										<th>Comment</th>
									</tr>
								</thead>
								<tbody>
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
