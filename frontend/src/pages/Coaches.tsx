import { useState, useEffect } from 'react';
import './Coaches.scss';
import { Link } from "react-router-dom";

const Coaches = () => {
	const [coaches, setCoaches] = useState([]);

	const fetchCoaches = async () => {
		try {
		  	const response = await fetch("http://localhost:3001/employees", {
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
			setCoaches(data);
		} catch (error) {
		  console.error("Erreur lors de l'appel API", error);
		}
	};

	useEffect(() => {
		fetchCoaches();
	}, []);

    return (
    	<>
			<div className='title-line'>
				<div className='title-left'>
					<h1 className='title'>Coaches List</h1>
					<p className='basic-text-color'>You have total {coaches.length} coaches.</p>
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
							<th>Coach</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Number of customers</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{coaches.map((coach: any) => (
						<tr key={coach.id}>
							<td>
								<input type="checkbox" className='checkbox' />
							</td>
							<td>
								<Link to={`/customers/${coach.id}`}>
								{coach.name} {coach.surname}
								</Link>
							</td>
							<td>{coach.email}</td>
							<td>{coach.phone}</td>
							<td>
								*nombre de customers*
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

export default Coaches;
