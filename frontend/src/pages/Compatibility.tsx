import React, { useState } from 'react';
import "./Compatibility.css"

const Compatibility: React.FC = () => {
	const clients = ["Client 1", "Client 2", "Client 3", "Client 4", "Client 5", "Client 6", "Client 7", "Client 8", "Client 9"]
	const [firstSelectedClient, setFirstSelectedClient] = useState<string | null>(null);
	const [secondSelectedClient, setSecondSelectedClient] = useState<string | null>(null);
	let compatibilityValue = "68%"

	const handleFirstSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
	  setFirstSelectedClient(event.target.value);
	};

	const handleSecondSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
	  setSecondSelectedClient(event.target.value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
	  event.preventDefault();
	  if (firstSelectedClient && secondSelectedClient) {
		console.log("First selected client:", firstSelectedClient);
		console.log("Second selected client:", secondSelectedClient);
	  } else {
		console.log("Please select a client in both dropdowns.");
	  }
	};
	return (
		<>
		<form onSubmit={handleSubmit} className="is-danger">
			<div className="box">
				<div className="spacer"> </div>
				<div className="select is-responsive is-multiple selected">
					<select onChange={handleFirstSelectChange} value={firstSelectedClient || ""}>
						<option value="" disabled>Select first client</option>
        				{clients.map((client, index) => (
          					<option key={index} value={client}> {client} </option>
        				))}
      				</select>
    			</div>
			<img className="selected" src="assets/compatibility-heart.png" alt="" />
			<h1 className="temporary-percentage" >{compatibilityValue}</h1>
				<div className="select is-responsive is-multiple selected">
					<select onChange={handleSecondSelectChange} value={secondSelectedClient || ""}>
						<option value="" disabled>Select second client</option>
        				{clients.map((client, index) => (
          					<option key={index} value={client}> {client} </option>
        				))}
      				</select>
    			</div>
				<div className="spacer"> </div>
			</div>
			<div className="box">
				<div className="spacer"> </div>
				<button className="button is-danger submit" type="submit" value="Submit">Submit</button>
				<div className="spacer"> </div>
			</div>
		</form>
      	</>
    )
  };

export default Compatibility;