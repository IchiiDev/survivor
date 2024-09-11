import { useState, useEffect } from 'react';
import './Wardrobe.scss';

const Wardrobe = () => {
	const clothes = { // Call API to get the images
		hat: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRrcaxpYyiNcvpwSzAqomvVCLImzOqtv41tw&s", "/assets/shoe.svg"],
		top: ["https://www.svgrepo.com/show/160974/t-shirt.svg", "/assets/shoe.svg"],
		bottom: ["https://icons.veryicon.com/png/o/miscellaneous/buckle/pants-5.png", "/assets/shoe.svg"],
		shoes: ["https://www.svgrepo.com/show/50532/shoes.svg", "/assets/shoe.svg", "/assets/boots.svg"]
	}
	const [clients, setClients] = useState([]);
	const [clientImg, setClientImg] = useState<string>("/assets/icon-character.svg");
	const [indices, setIndices] = useState({ hat: 0, top: 0, bottom: 0, shoes: 0 });
	const [selectedClient, setSelectedClient] = useState<any | null>(null);

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

	const changeClothe = (type: keyof typeof clothes, direction: number) => {
        setIndices(prevIndices => {
            const newIndex = prevIndices[type] + direction;
            const length = clothes[type].length;
            return {
                ...prevIndices,
                [type]: (newIndex < 0) ? length - 1 : (newIndex >= length) ? 0 : newIndex
            };
        });
    };

	const handleClientChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
		const clientId = event.target.value;
		const client = clients.find((c: any) => c.id.toString() === clientId);
		console.log(client);
		setSelectedClient(client);
		if (client)
			await fetchImageCustomer(client);
	};

	useEffect(() => {
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
		fetchCustomers();
	}, []);
    return (
    	<div>
			<div className="wardrobe-container">
				<div className="select-client-container">
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
				<div>
					<ul>
						<li>
							<img onClick={() => changeClothe('hat', -1)} className="wardrobe-arrows" src="/assets/left-arrow.svg" alt="left-arrow" />
							<img className="wardrobe-container-img" src={clothes.hat[indices.hat]} alt="clothe hat" />
							<img onClick={() => changeClothe('hat', 1)} className="wardrobe-arrows" src="/assets/right-arrow.svg" alt="right-arrow" />
						</li>
						<li>
							<img onClick={() => changeClothe('top', -1)} className="wardrobe-arrows" src="/assets/left-arrow.svg" alt="left-arrow" />
							<img className="wardrobe-container-img" src={clothes.top[indices.top]} alt="clothe top" />
							<img onClick={() => changeClothe('top', 1)} className="wardrobe-arrows" src="/assets/right-arrow.svg" alt="right-arrow" />
						</li>
						<li>
							<img onClick={() => changeClothe('bottom', -1)} className="wardrobe-arrows" src="/assets/left-arrow.svg" alt="left-arrow" />
							<img className="wardrobe-container-img" src={clothes.bottom[indices.bottom]} alt="clothe bottom" />
							<img onClick={() => changeClothe('bottom', 1)} className="wardrobe-arrows" src="/assets/right-arrow.svg" alt="right-arrow" />
						</li>
						<li>
							<img onClick={() => changeClothe('shoes', -1)} className="wardrobe-arrows" src="/assets/left-arrow.svg" alt="left-arrow" />
							<img className="wardrobe-container-img" src={clothes.shoes[indices.shoes]} alt="clothe shoes" />
							<img onClick={() => changeClothe('shoes', 1)} className="wardrobe-arrows" src="/assets/right-arrow.svg" alt="right-arrow" />
						</li>
					</ul>
				</div>
				<div className="image-container">
					<img width={200} height={200} src={clientImg} alt="Profile of Client" />
				</div>
			</div>
      	</div>
    )
  };

export default Wardrobe;
