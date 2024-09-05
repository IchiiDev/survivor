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
        	<h1 className="basic-text-color">Customers</h1>
			<div className='info-client'>
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
				<div>
					{selectedClient && (
					<img className="client-img" src={clientImg} alt="client" />
					)}
				</div>
			</div>
			<hr className='fixed-hr'/>
			<div className='info-tab'>
				{selectedClient && (
					<p>Tabs info</p>
				)}
			</div>
      	</div>
    )
  };

export default Customers;
