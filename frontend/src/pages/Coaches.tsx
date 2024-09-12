import { useState, useEffect } from 'react';
import './Coaches.scss';
import { Link } from "react-router-dom";

const Coaches = () => {
	const [showPopup, setShowPopup] = useState(false);
	const [dropdownVisible, setDropdownVisible] = useState<{ [key: string]: boolean }>({});
	const [coaches, setCoaches] = useState([]);
    const [customers, setCustomers] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [gender, setGender] = useState("");
	const [work, setWork] = useState("");

	useEffect(() => {
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
				setCustomers(data);
			} catch (error) {
				console.error("Erreur lors de l'appel API", error);
			}
		};
		fetchCustomers();
		fetchCoaches();
	}, []);

	const handleNewCoach = () => {
		setShowPopup(true);
  	};

	const sendCoaches = async () => {
		try {
			const requestBody = {
				email: email,
				password: password,
				name: name,
				surname: surname,
				gender: gender,
				work: work
			};
			const jsonBody = JSON.stringify(requestBody);
			console.log(jsonBody);
			const response = await fetch("http://localhost:3001/employees", {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				  "Authorization": `Bearer ${localStorage.getItem("token")}`
				},
				body: jsonBody
			});
			if (!response.ok) {
				throw new Error(`Erreur HTTP: ${response.status}`);
			}
			if (response.status === 422) {
				alert("Need minimum 8 characters, 1 upcase, 1 lowcase, 1 number and 1 special");
				return;
			}
			if (response.status === 400) {
				alert("Coach already exists")
			}
			const data = await response.json();
			setCoaches(data);
		} catch (error) {
		  console.error("Erreur lors de l'appel API", error);
		}
	};

    const getCustomersByCoaches = (customers: any, coachId: number) => {
        let result = 0;
        customers.forEach((customer: any) => {
            if (customer.coach_id == coachId)
                result++;
        })
        return result;
    }

  const handleSubmitPopup = (event: React.MouseEvent<HTMLButtonElement>) => {
	  	if (email && password && name && surname && gender && work) {
		  	console.log("New infos : ", email, password, name, surname, gender, work);
			sendCoaches();
	  	} else {
			alert("Infos missing")
	  	}
	  	setShowPopup(false);
  	};

  	const handleClosePopup = (event: React.MouseEvent<HTMLButtonElement>) => {
		setShowPopup(false);
  	}

  	const toggleDropdown = (coachId: string) => {
		setDropdownVisible((prev) => ({
	  		...prev,
	  		[coachId]: !prev[coachId],
		}));
	};

	const handleCustomerSelect = async (customerId: any, coachId: any) => {
		try {
			console.log(customerId, coachId);
		  	const requestBody = {
				coach_id: coachId,
		  	};
		  	const jsonBody = JSON.stringify(requestBody);
		  	const response = await fetch(`http://localhost:3001/customers/${customerId}`, {
				method: "PUT",
				headers: {
			  		"Content-Type": "application/json",
			  		"Authorization": `Bearer ${localStorage.getItem("token")}`,
				},
				body: jsonBody,
		  	});
			console.log(response);
		  	if (!response.ok) {
				throw new Error(`Erreur HTTP: ${response.status}`);
		  	}
		} catch (error) {
			console.error("Erreur lors de l'appel API", error);
		}
	};

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
						<img className='icon' onClick={handleNewCoach} src="/assets/icon-plus.svg" alt='add' />
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
							<td>{getCustomersByCoaches(customers, coach.id)}</td>
							<td>
              					<button onClick={() => toggleDropdown(coach.id)} className="character-dropdown">
                					<img className="Link-icon" src="/assets/icon-points.svg" alt="three points" />
              					</button>
              					{dropdownVisible[coach.id] && (
                				<div className="dropdown">
                  					<ul>
                    					{customers.map((customer: any) => (
                      					<li key={customer.id} onClick={() => handleCustomerSelect(customer.id, coach.id)}>
                        					{customer.name} {customer.surname}
                        					{customer.coach_id === coach.id && (
                          					<span style={{ marginLeft: '8px', color: 'green' }}>✔</span>
                        					)}
                      					</li>
                    					))}
                  					</ul>
                				</div>
              					)}
            				</td>
						</tr>
						))}
					</tbody>
				</table>
			</div>
			{showPopup && (
    		<div className="popup">
      			<div className="popup-inner">
        			<h2>New coach:</h2>
        			<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        			<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        			<input type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        			<input type="surname" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Surname" />
        			<input type="birthdate" id="birthday-input" placeholder="Birthdate" />
        			<input type="gender" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Male/Female/Other" />
        			<input type="work" value={work} onChange={(e) => setWork(e.target.value)} placeholder="Coach/Other" />
        			<div className="popup-button">
          				<button onClick={handleClosePopup} style={{color: "red"}}>Cancel</button>
          				<button onClick={handleSubmitPopup} style={{color: "green"}}>Submit</button>
        			</div>
      			</div>
    		</div>
  	)}
      	</>
    )
};

export default Coaches;
