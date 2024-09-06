import { useState } from 'react';
import './Customers.scss';

const Customers = () => {
	const clients = ["Client 1", "Client 2", "Client 3"];
	const [selectedClient, setSelectedClient] = useState<string | null>(null);
	const [clientImg, setClientImg] = useState<string>("/assets/icon-character.svg");
	const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const client = event.target.value;
		setSelectedClient(client);
		setClientImg("/assets/icon-customer-service.svg"); // selectedClient.img
	}
    return (
    	<div>
			<div className='info-client'>
        		{/* <h1 className="basic-text-color">Customers</h1> */}
				<div className='basic-info-client'>
					<div className='upper-info'>
						<div className="select is-responsive">
      	    				<select onChange={handleClientChange} value={selectedClient || ""}>
      	    					<option value="" disabled>Select client</option>
      	    					{clients.map((client, index) => (
								<option key={index} value={client}>
      	    			  			{client}
      	    					</option>
      	    					))}
      	    				</select>
      	    			</div>
					</div>
					<div className='lower-info'>
						{selectedClient && (
						<ul>
							<li>
								<p className='basic-text-color'>Client Name: {selectedClient}</p>
							</li>
							<li>
								<p className='basic-text-color'>Birth Date</p>
							</li>
							<li>
								<p className='basic-text-color'>Adress</p>
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
			<div className='info-tab'>
				<hr className='fixed-hr'/>
				{selectedClient && (
					<table>
						<thead>
							<tr>
								<th>Date</th>
								<th>Amount</th>
								<th>Comment</th>
							</tr>
						</thead>
						<tbody>
							{/* {selectedClient.payements_history.map(() => (
								<tr></tr>
      	    				))} */}
						</tbody>
					</table>
				)}
			</div>
      	</div>
    )
  };

export default Customers;
