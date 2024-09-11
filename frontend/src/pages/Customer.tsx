import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Customer = () => {
    const { id } = useParams<{ id: string }>();
    const [customer, setCustomer] = useState<any | null>(null);
    const [clientImg, setClientImg] = useState<string>();
    const [encounters, setEncounters] = useState<any>([]);

    useEffect(() => {
        const fetchEncounters = async (clientId: string | undefined) => {
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
        const fetchPayements = async (clientId: string | undefined) => {
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
                await setCustomer(data);
                await fetchImageCustomer(data);
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
        fetchPayements(id);
        fetchEncounters(id);
    }, [id]);

    return (
        <div>
            <h1>Customer: {id}</h1>
        </div>
    )
}

export default Customer;
