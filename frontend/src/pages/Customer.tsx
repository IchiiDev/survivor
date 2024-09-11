import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Customer = () => {
    const { id } = useParams<{ id: string }>();
    const [customer, setCustomer] = useState<any>(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await fetch(`http://localhost:3001/customers/${id}`, {
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
                setCustomer(data);
            } catch (error) {
                console.error("Erreur lors de l'appel API", error);
            }
        };
        fetchCustomer();
    }, [id]);

    return (
        <div>
            <h1>Customer: {customer.name}</h1>
        </div>
    )
}

export default Customer;
