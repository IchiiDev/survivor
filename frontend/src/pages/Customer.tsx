import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./Customer.scss";

const Customer = () => {
    const { id } = useParams<{ id: string }>();
    const [customer, setCustomer] = useState<any>(null);
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

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    };

    if (!customer) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='title-line'>
                <div className='title-left'>
                    <h1 className='title'>Customer Details</h1>
                </div>
                <div className='title-right'>
                    <Link to='/customers'>
                        <button className='button is-light'>
                            <img className='icon' src="/assets/left-arrow.svg" alt='Back' />
                            <span>Back</span>
                        </button>
                    </Link>
                </div>
            </div>
            <div className='all-info'>
                <div className='box customer-detail'>
                    <div className='customer-detail-upper'>
                        <div className='image-title-container'>
                            <img src={clientImg} alt='client' />
                            <h5 className='title is-5'>{customer.name} {customer.surname}</h5>
                        </div>
                        <div className='separator'></div>
                        <div>
                            <span className='icon'>
                                <img src="/assets/icon-envelope.svg" alt='message' />
                            </span>
                            <span className='icon'>
                                <img src="/assets/icon-bookmark.svg" alt='bookmark' />
                            </span>
                        </div>
                        <div className='separator'></div>
                        <div>
                            <p className='basic-text-color'>{encounters.length} </p>
                            <p className='basic-text-color'>Total encounters | </p>
                            <p className='basic-text-color'>{encounters.length / 2 + 3}</p>
                            <p className='basic-text-color'>Positives | </p>
                            <p className='basic-text-color'>{encounters.length / 2 - 3}</p>
                            <p className='basic-text-color'>In Progress</p>
                        </div>
                    </div>
                    <div className='customer-detail-lower'>
                        <p>SHORT DETAILS</p>
                        <ul>
                            <li>
                                <p>User ID:</p>
                                <p>{customer.id}</p>
                            </li>
                            <li>
                                <p>Email:</p>
                                <p>{customer.email}</p>
                            </li>
                            <li>
                                <p>Address:</p>
                                <p>{customer.address}</p>
                            </li>
                            <li>
                                <p>Phone number:</p>
                                <p>{customer.phone}</p>
                            </li>
                            <li>
                                <p>Coach</p>
                                {customer.coach_id !== "NULL" ? (
                                    <p>{customer.coach_id}</p>
                                ) : (
                                    <p>None</p>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='box customer-tables'>
                    <div className='info-tables'>
                        <h6 className='title is-6'>Recent Meetings</h6>
                        <div className="table-container table-containerr">
                            <table className='table table-customer'>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Rating</th>
                                        <th>Report</th>
                                        <th>Source</th>
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
                    <div className='info-tables'>
                        <h6 className='title is-6'>Recent Meetings</h6>
                        <div className="table-container table-containerr">
                            <table className='table table-customer'>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Rating</th>
                                        <th>Report</th>
                                        <th>Source</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customer.paymentHistory?.map((payment: any) => (
                                        <tr key={payment.id}>
                                            <td>{formatDate(payment.date)}</td>
                                            <td>
                                                {payment.method === 'PayPal' ? (
                                                    <span className='icon'>
                                                        <img src="/assets/visa.svg" alt="paypal" />
                                                    </span>
                                                ) : payment.method === 'Bank Transfer' ? (
                                                    <span className='icon'>
                                                        <img src="/assets/american-express.svg" alt="bank transfer" />
                                                    </span>
                                                ) : (
                                                    <span className='icon'>
                                                        <img src="/assets/mastercard.svg" alt="credit card" />
                                                    </span>
                                                )}
                                            </td>
                                            <td className='font-amount'>{payment.amount}</td>
                                            <td>{payment.comment}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Customer;
